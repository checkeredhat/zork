// A script to parse the Zork MDL data file and generate JSON.

const fs = require('fs');

/**
 * Tokenizes the MDL data.
 * @param {string} mdlData - The content of the MDL file.
 * @returns {Array<{type: string, value: string}>} - An array of tokens.
 */
function tokenize(mdlData) {
    console.log('Tokenizing MDL data...');
    const tokens = [];
    let current = 0;

    const tokenSpecs = [
        { type: 'COMMENT', regex: /^;.*/ },
        { type: 'WHITESPACE', regex: /^\s+/ },
        { type: 'STRING', regex: /^"([^"\\]|\\.)*"/ },
        { type: 'ATOM', regex: /^[a-zA-Z\-!][a-zA-Z0-9\->!'?]*/ },
        { type: 'NUMBER', regex: /^[0-9]+/ },
        { type: 'SPECIAL', regex: /^[()\[\]{}#%,'./\\=<>\?+]/ },
    ];

    while (current < mdlData.length) {
        let matched = false;
        for (const spec of tokenSpecs) {
            const match = mdlData.slice(current).match(spec.regex);
            if (match) {
                if (spec.type !== 'WHITESPACE' && spec.type !== 'COMMENT') {
                    tokens.push({ type: spec.type, value: match[0] });
                }
                current += match[0].length;
                matched = true;
                break;
            }
        }
        if (!matched) {
             if (current < mdlData.length && mdlData[current] !== '\0' && mdlData.slice(current).trim() !== "") {
                throw new Error(`I dont know what this is: '${mdlData.slice(current, current+20)}'`);
            }
            break;
        }
    }

    return tokens;
}

let tokens;
let current;

function parse(_tokens) {
    tokens = _tokens;
    current = 0;
    const ast = [];
    while (current < tokens.length) {
        const node = walk();
        if (node) {
            ast.push(node);
        }
    }
    return ast;
}

function walk() {
    let token = tokens[current];

    if (!token) {
        return null;
    }

    if (token.type === 'NUMBER' || token.type === 'STRING' || token.type === 'ATOM') {
        current++;
        return token;
    }

    if (token.type === 'SPECIAL' && token.value === '%') {
        current++; // consume '%'
        return walk(); // For our purpose, we just return the expression inside the macro
    }

    if (token.type === 'SPECIAL' && token.value === '#') {
        const nextToken = tokens[current + 1];
        if (nextToken && nextToken.type === 'ATOM') {
            current += 2; // Consume '#' and ATOM
            const node = {
                type: 'SpecialForm',
                name: nextToken.value,
                arguments: []
            };

            if (tokens[current] && tokens[current].value === '{') {
                current++;
                while (tokens[current] && tokens[current].value !== '}') {
                    node.arguments.push(walk());
                }
                current++; // Consume '}'
            } else {
                node.arguments.push(walk());
            }
            return node;
        }
    }

    if (token.type === 'SPECIAL' && (token.value === '(' || token.value === '<' || token.value === '[' || token.value === '{')) {
        const terminator = { '(': ')', '<': '>', '[': ']', '{': '}' }[token.value];
        current++;
        const list = [];
        while (tokens[current] && tokens[current].value !== terminator) {
            list.push(walk());
        }
        current++; // consume the terminator
        return list;
    }

    current++;
    return token;
}

function extractRoomData(node) {
    if (node.name !== 'ROOM') return null;

    const room = {
        id: '',
        shortDesc: '',
        longDesc: '',
        exits: {},
        objects: [],
        properties: []
    };

    const args = node.arguments;
    let argIndex = 0;

    if (args[argIndex] && (args[argIndex].type === 'STRING' || args[argIndex].type === 'ATOM')) {
        room.id = args[argIndex++].value.replace(/"/g, '');
    }

    if (args[argIndex] && args[argIndex].type === 'STRING') {
        room.longDesc = args[argIndex++].value.replace(/"/g, '').replace(/\\n/g, '\n');
    } else if (args[argIndex] && args[argIndex].type === 'ATOM' && args[argIndex].value === 'T') {
        room.properties.push('LIT');
        argIndex++;
    } else if (args[argIndex] && Array.isArray(args[argIndex])) {
        const longDescNode = args[argIndex][0];
        if(longDescNode && longDescNode.type === 'STRING') {
            room.longDesc = longDescNode.value.replace(/"/g, '').replace(/\\n/g, '\n');
        }
        argIndex++;
    }

    if (args[argIndex] && args[argIndex].type === 'STRING') {
        room.shortDesc = args[argIndex++].value.replace(/"/g, '');
    }

    for (; argIndex < args.length; argIndex++) {
        const arg = args[argIndex];
        if (!arg) continue;
        if (arg.type === 'ATOM' && arg.value === 'T') {
            room.properties.push('LIT');
        } else if (arg.type === 'SpecialForm') {
            switch(arg.name) {
                case 'EXIT':
                    for (let i = 0; i < arg.arguments.length; i += 2) {
                        if (!arg.arguments[i] || !arg.arguments[i+1]) continue;
                        const dir = arg.arguments[i].value.replace(/"/g, '');
                        const dest = arg.arguments[i+1];
                        if (dest.type === 'STRING' || dest.type === 'ATOM') {
                            room.exits[dir] = dest.value.replace(/"/g, '');
                        } else if (dest.type === 'SpecialForm' && dest.name === 'NEXIT') {
                            if(dest.arguments[0])
                                room.exits[dir] = { blocked: dest.arguments[0].value.replace(/"/g, '') };
                        } else if (dest.type === 'SpecialForm' && dest.name === 'CEXIT') {
                            room.exits[dir] = {
                                condition: dest.arguments[0].value,
                                destination: dest.arguments[1].value.replace(/"/g, ''),
                                message: dest.arguments.length > 2 && dest.arguments[2].type === 'STRING' ? dest.arguments[2].value.replace(/"/g, '') : `You can't go that way.`
                            };
                        }
                    }
                    break;
                case 'FIND-OBJ':
                    if (arg.arguments[0])
                        room.objects.push(arg.arguments[0].value.replace(/"/g, ''));
                    break;
            }
        } else if (Array.isArray(arg)) {
            for(const subArg of arg) {
                if (subArg && subArg.type === 'SpecialForm' && subArg.name === 'FIND-OBJ') {
                     if (subArg.arguments[0])
                        room.objects.push(subArg.arguments[0].value.replace(/"/g, ''));
                }
            }
        }
    }
    return room;
}

function extractObjectData(node) {
    if (node.name !== 'OBJECT') return null;

    const object = {
        id: '',
        name: '',
        description: '',
        initialDescription: '',
        properties: {},
        synonyms: [],
        adjectives: []
    };

    const args = node.arguments;
    let argIndex = 0;

    if (args[argIndex] && (args[argIndex].type === 'STRING' || args[argIndex].type === 'ATOM')) {
        object.id = args[argIndex++].value.replace(/"/g, '');
    }
    if (args[argIndex] && args[argIndex].type === 'STRING') {
        object.description = args[argIndex++].value.replace(/"/g, '').replace(/\\n/g, '\n');
    }
    if (args[argIndex] && args[argIndex].type === 'STRING') {
        object.name = args[argIndex++].value.replace(/"/g, '');
    }
    if (args[argIndex] && args[argIndex].type === 'STRING') {
        object.initialDescription = args[argIndex++].value.replace(/"/g, '').replace(/\\n/g, '\n');
    }

    for (; argIndex < args.length; argIndex++) {
        const arg = args[argIndex];
        if (!arg) continue;
        if (arg.type === 'ATOM') {
            object.properties.function = arg.value;
        } else if (Array.isArray(arg)) {
             let isStringList = true;
            for(const item of arg) {
                if (item.type !== 'STRING') {
                    isStringList = false;
                    break;
                }
            }
            if(isStringList) {
                object.synonyms = arg.map(t => t.value.replace(/"/g, ''));
            }
        }
    }

    return object;
}

/**
 * The main function to run the MDL parsing.
 */
function main() {
    console.log('Starting MDL parsing...');
    const mdlData = fs.readFileSync('zork/dung.56', 'utf8');

    const tokens = tokenize(mdlData);
    console.log('Tokenizing finished.');
    const ast = parse(tokens);
    console.log('Parsing finished.');

    const rooms = {};
    const objects = {};

    function findAndExtract(nodes) {
        if(!nodes) return;
        for (const node of nodes) {
            if(!node) continue;
            if (node.type === 'SpecialForm') {
                if (node.name === 'ROOM') {
                    const room = extractRoomData(node);
                    if (room && room.id) {
                        rooms[room.id] = room;
                    }
                } else if (node.name === 'OBJECT') {
                    const obj = extractObjectData(node);
                    if (obj && obj.id) {
                        objects[obj.id] = obj;
                    }
                }
                findAndExtract(node.arguments);
            } else if (Array.isArray(node)) {
                findAndExtract(node);
            }
        }
    }

    findAndExtract(ast);

    fs.writeFileSync('data/rooms.json.new', JSON.stringify(rooms, null, 4));
    console.log(`Extracted ${Object.keys(rooms).length} rooms.`);

    fs.writeFileSync('data/objects.json.new', JSON.stringify(objects, null, 4));
    console.log(`Extracted ${Object.keys(objects).length} objects.`);

    console.log('MDL parsing finished. New json files created.');
}

main();
