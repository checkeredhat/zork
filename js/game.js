class Game {
    constructor(ui) {
        this.ui = ui;
        this.player = null;
        this.rooms = {};
        this.objects = {};
        this.vocabulary = {};
        this.parser = null;
        this.light_timer = 0;
        this.isGameOver = false;
        this.damWaterLevel = 'high'; // high, low
    }

    async start() {
        this.ui.display("Welcome to Zork.js!");
        await this.loadWorld();

        this.parser = new Parser(this.vocabulary);

        this.player = new Player({
            room: this.rooms['WHOUS'],
            score: 0,
            inventory: []
        });

        this.look();
    }

    async loadWorld() {
        this.ui.display("Loading game data...");

        try {
            const [vocabData, objectsData, roomsData] = await Promise.all([
                fetch('data/vocabulary.json').then(res => res.json()),
                fetch('data/objects.json').then(res => res.json()),
                fetch('data/rooms.json').then(res => res.json())
            ]);

            this.vocabulary = vocabData;

            for (const objectId in objectsData) {
                this.objects[objectId] = new GameObject(objectsData[objectId]);
            }

            for (const roomId in roomsData) {
                const roomData = roomsData[roomId];
                const objectsInRoom = roomData.objects.map(id => this.objects[id]);

                this.rooms[roomId] = new Room({
                    ...roomData,
                    objects: objectsInRoom
                });

                objectsInRoom.forEach(obj => obj.room = this.rooms[roomId]);
            }

            this.ui.display("Loading complete.");

        } catch (error) {
            this.ui.display("Error loading game data. Please check the console for details.");
            console.error("Failed to load game data:", error);
        }
    }

    look() {
        const currentRoom = this.player.room;

        // Special case for living room description
        if (currentRoom.id === 'LROOM') {
            let desc = "You are in the living room. There is a doorway to the east, a wooden door with strange gothic lettering to the west, which appears to be nailed shut, and a trophy case.";
            const rug = this.objects['RUG'];
            const door = this.objects['DOOR'];
            if (rug.flags.isMoved) {
                if (door.flags.isOpen) {
                    desc += " Lying beside the rug is an open trap door.";
                } else {
                    desc += " Lying beside the rug is a closed trap door.";
                }
            } else {
                desc += " A large oriental rug is in the center of the room.";
            }
            this.ui.display(desc);
            currentRoom.isSeen = true;
        } else {
             if (currentRoom.isSeen) {
                this.ui.display(currentRoom.shortDescription);
            } else {
                this.ui.display(currentRoom.longDescription);
                currentRoom.isSeen = true;
            }
        }

        const visibleObjects = currentRoom.objects.filter(obj => obj.flags.isVisible);
        if (visibleObjects.length > 0) {
            visibleObjects.forEach(obj => {
                const desc = !obj.isTouched && obj.initialDescription ? obj.initialDescription : obj.description;
                if (desc) {
                    this.ui.display(desc);
                }
            });
        }
    }

    go(direction) {
        const currentRoom = this.player.room;
        const exit = currentRoom.exits.find(e => e.direction.toLowerCase() === direction.toLowerCase());

        if (exit) {
            if (exit.condition) {
                if (exit.condition === 'DAM_WATER_LOW') {
                    if (this.damWaterLevel !== 'low') {
                        this.ui.display(exit.message || "You can't go that way.");
                        return;
                    }
                } else {
                    const conditionObject = this.objects[exit.condition];
                    if (!conditionObject || !conditionObject.flags.isOpen) {
                        this.ui.display(exit.message || "You can't go that way.");
                        return;
                    }
                }
            }

            if (exit.roomId) {
                this.player.room = this.rooms[exit.roomId];
                this.look();
            } else if (exit.message) {
                this.ui.display(exit.message);
            }
        } else {
            this.ui.display("You can't go that way.");
        }
    }

    take(gameObject) {
        if (!gameObject) {
            this.ui.display("I don't see that here.");
            return;
        }
        if (!gameObject.flags.isTakeable) {
            this.ui.display("You can't take that.");
            return;
        }

        const room = this.player.room;
        room.objects = room.objects.filter(obj => obj.id !== gameObject.id);
        this.player.inventory.push(gameObject);
        gameObject.room = null; // No longer in a room
        gameObject.isTouched = true;

        this.ui.display(`Taken.`);
    }

    drop(gameObject) {
        if (!gameObject) {
            this.ui.display("You don't have that.");
            return;
        }

        const room = this.player.room;
        this.player.inventory = this.player.inventory.filter(obj => obj.id !== gameObject.id);
        room.objects.push(gameObject);
        gameObject.room = room;

        this.ui.display(`Dropped.`);
    }

    inventory() {
        if (this.player.inventory.length === 0) {
            this.ui.display("You are empty-handed.");
            return;
        }

        this.ui.display("You are carrying:");
        this.player.inventory.forEach(obj => {
            this.ui.display(`- A ${obj.description}`);
        });
    }

    open(gameObject) {
        if (!gameObject) {
            this.ui.display("You can't see that here.");
            return;
        }
        if (gameObject.action) {
            return this.handleObjectAction('close', gameObject);
        }
        if (!gameObject.flags.isContainer) {
            this.ui.display("That's not a container.");
            return;
        }
        if (gameObject.flags.isOpen) {
            this.ui.display("It's already open.");
            return;
        }

        gameObject.flags.isOpen = true;
        this.ui.display(`You open the ${gameObject.names[0]}.`);

        // Reveal contents
        if (gameObject.contents && gameObject.contents.length > 0) {
            this.ui.display("Inside, you see:");
            while (gameObject.contents.length > 0) {
                const objId = gameObject.contents.shift(); // Removes from front
                const obj = this.objects[objId];
                if (obj) {
                    this.ui.display(`- A ${obj.description}`);
                    this.player.room.objects.push(obj); // Add to room
                }
            }
        }
    }

    close(gameObject) {
        if (!gameObject) {
            this.ui.display("You can't see that here.");
            return;
        }
        if (gameObject.action) {
            return this.handleObjectAction('open', gameObject);
        }
        if (!gameObject.flags.isContainer) {
            this.ui.display("That's not a container.");
            return;
        }
        if (!gameObject.flags.isOpen) {
            this.ui.display("It's already closed.");
            return;
        }

        gameObject.flags.isOpen = false;
        this.ui.display(`You close the ${gameObject.names[0]}.`);
    }

    attack(gameObject) {
        if (!gameObject) {
            this.ui.display("There is nothing here to attack.");
            return;
        }

        if (!gameObject.flags.isVillain) {
            this.ui.display(`Attacking the ${gameObject.names[0]} doesn't seem to be a productive idea.`);
            return;
        }

        // It's a villain, check for a weapon
        const weapon = this.player.inventory.find(obj => obj.flags.isWeapon);
        if (!weapon) {
            this.ui.display(`Attacking the ${gameObject.names[0]} with your bare hands is suicidal!`);
            return;
        }

        // TODO: Implement a real combat system. For now, a generic message.
        this.ui.display(`You attack the ${gameObject.names[0]} with the ${weapon.names[0]}.`);
    }

    move(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to move?");
            return;
        }
        if (gameObject.action) {
            return this.handleObjectAction('move', gameObject);
        }
        this.ui.display("You can't move that.");
    }

    read(gameObject) {
        if (!gameObject) {
            this.ui.display("There's nothing to read.");
            return;
        }
        if (!gameObject.flags.isReadable) {
            this.ui.display("That's not something you can read.");
            return;
        }
        if (gameObject.action) {
            return this.handleObjectAction('read', gameObject);
        }
        this.ui.display("There's nothing special to read on it.");
    }

    throw(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to throw?");
            return;
        }
        if (this.player.inventory.indexOf(gameObject) === -1) {
            this.ui.display("You don't have that.");
            return;
        }

        this.player.inventory = this.player.inventory.filter(obj => obj.id !== gameObject.id);
        this.player.room.objects.push(gameObject);
        gameObject.room = this.player.room;

        this.ui.display(`You threw the ${gameObject.names[0]}.`);

        if (gameObject.action) {
            this.handleObjectAction('throw', gameObject);
        }
    }

    use(directObject, indirectObject) {
        if (!directObject || !indirectObject) {
            this.ui.display("You need to specify what to use and what to use it on.");
            return;
        }

        if (indirectObject.action) {
            this.handleObjectAction('use', directObject, indirectObject);
        } else {
            this.ui.display("You can't use that here.");
        }
    }

    push(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to push?");
            return;
        }
        if (gameObject.action) {
            return this.handleObjectAction('push', gameObject);
        }
        this.ui.display("You can't push that.");
    }

    eat(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to eat?");
            return;
        }
        if (!gameObject.flags.isEdible) {
            this.ui.display("You can't eat that.");
            return;
        }
        // Remove the object from inventory or room
        this.player.inventory = this.player.inventory.filter(obj => obj.id !== gameObject.id);
        this.player.room.objects = this.player.room.objects.filter(obj => obj.id !== gameObject.id);
        this.ui.display(`You eat the ${gameObject.names[0]}. It's delicious!`);
    }

    drink(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to drink?");
            return;
        }
        if (!gameObject.flags.isDrinkable) {
            this.ui.display("You can't drink that.");
            return;
        }
        // Special case for water in the bottle
        if (gameObject.id === 'WATER' && this.objects['BOTTL'].contents.includes('WATER')) {
            this.objects['BOTTL'].contents = [];
            this.ui.display("You drink the water. It's refreshing.");
        } else {
            this.ui.display("You can't drink that.");
        }
    }

    turn(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to turn?");
            return;
        }
        if (gameObject.action) {
            return this.handleObjectAction('turn', gameObject);
        }
        this.ui.display("You can't turn that.");
    }

    tie(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to tie?");
            return;
        }
        if (gameObject.id !== 'ROPE') {
            this.ui.display("You can't tie that.");
            return;
        }
        // For now, a simple message. A real implementation would need an indirect object.
        this.ui.display("You tie the rope to a nearby railing.");
        gameObject.flags.isTied = true;
    }

    untie(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to untie?");
            return;
        }
        if (gameObject.id !== 'ROPE' || !gameObject.flags.isTied) {
            this.ui.display("You can't untie that.");
            return;
        }
        this.ui.display("You untie the rope.");
        gameObject.flags.isTied = false;
    }

    burn(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to burn?");
            return;
        }
        const lightSource = this.player.inventory.find(obj => obj.flags.isLightSource && obj.flags.isLit);
        if (!lightSource) {
            this.ui.display("You have no source of fire.");
            return;
        }
        if (!gameObject.flags.isBurnable) {
            this.ui.display("You can't burn that.");
            return;
        }
        // For now, just destroy the object
        this.player.inventory = this.player.inventory.filter(obj => obj.id !== gameObject.id);
        this.player.room.objects = this.player.room.objects.filter(obj => obj.id !== gameObject.id);
        this.ui.display(`The ${gameObject.names[0]} burns to a crisp and is gone.`);
    }

    light(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to light?");
            return;
        }
        if (!gameObject.flags.isLightSource) {
            this.ui.display("You can't light that.");
            return;
        }
        if (gameObject.flags.isLit) {
            this.ui.display("It's already lit.");
            return;
        }
        gameObject.flags.isLit = true;
        this.ui.display(`You light the ${gameObject.names[0]}.`);
    }

    knock(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to knock on?");
            return;
        }
        if (gameObject.flags.isDoor) {
            this.ui.display(`You knock on the ${gameObject.names[0]}. There is no answer.`);
        } else {
            this.ui.display("That's not something you can knock on.");
        }
    }

    yell() {
        this.ui.display("Aaaarrrrgggghhhh!");
    }

    jump() {
        this.ui.display("You jump on the spot, but nothing happens.");
    }

    rub(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to rub?");
            return;
        }
        this.ui.display(`You rub the ${gameObject.names[0]}, but nothing happens.`);
    }

    pray() {
        this.ui.display("You pray to the heavens, but there is no divine intervention.");
    }

    exorcise(gameObject) {
        if (!gameObject) {
            this.ui.display("Who or what do you want to exorcise?");
            return;
        }
        this.ui.display(`You attempt to exorcise the ${gameObject.names[0]}, but it has no effect.`);
    }

    handleObjectAction(verb, directObject, indirectObject) {
        const gameObject = indirectObject || directObject;
        switch (gameObject.action) {
            case 'DAM-BOLT':
                if ((verb === 'use' && directObject.id === 'WRENCH') || verb === 'turn') {
                    if (gameObject.flags.isLoose) {
                        this.ui.display("The bolt is already loose.");
                    } else {
                        const wrench = this.player.inventory.find(obj => obj.id === 'WRENCH');
                        if (verb === 'turn' && !wrench) {
                            this.ui.display("The bolt is too tight to turn by hand.");
                            return;
                        }
                        gameObject.flags.isLoose = true;
                        this.ui.display("You turn the bolt. The sluice gate opens, and the reservoir drains with a mighty roar.");
                        this.damWaterLevel = 'low';
                    }
                } else {
                    this.ui.display("You can't do that.");
                }
                break;
            case 'DAM-PANEL':
                if (verb === 'push') {
                    this.ui.display("You push the buttons, but nothing happens. The panel seems to be dead.");
                }
                break;
            case 'RUG':
                if (verb === 'move') {
                    if (gameObject.flags.isMoved) {
                        this.ui.display("Having moved the carpet previously, you find it impossible to move it again.");
                    } else {
                        gameObject.flags.isMoved = true;
                        const door = this.objects['DOOR'];
                        door.flags.isVisible = true;
                        this.ui.display("With a great effort, the rug is moved to one side of the room. With the rug moved, the dusty cover of a closed trap-door appears.");
                    }
                } else {
                    this.ui.display("I don't know how to do that to the rug.");
                }
                break;
            case 'TRAP-DOOR':
                if (verb === 'open') {
                    if (gameObject.flags.isOpen) {
                        this.ui.display("It's already open.");
                    } else {
                        gameObject.flags.isOpen = true;
                        this.ui.display("The door reluctantly opens to reveal a rickety staircase descending into darkness.");
                    }
                } else if (verb === 'close') {
                    if (!gameObject.flags.isOpen) {
                        this.ui.display("It's already closed.");
                    } else {
                        gameObject.flags.isOpen = false;
                        this.ui.display("The door swings shut and closes.");
                    }
                }
                break;
            default:
                this.ui.display("I don't know how to do that.");
        }
    }

    gameOver(message) {
        this.ui.display(message);
        this.ui.display("\n**** You have died ****");
        this.isGameOver = true;
        // Here you might want to disable the input as well
        this.ui.inputElement.disabled = true;
    }

    processTurn(command) {
        if (this.isGameOver) {
            return; // Don't process commands if the game is over
        }
        if (!command) return;
        this.ui.displayPrompt(`> ${command}`);

        // Light timer logic
        const lightSource = this.player.inventory.find(obj => obj.flags.isLight && obj.light > 0);
        if (lightSource) {
            lightSource.light--;
            if (lightSource.light === 10) {
                this.ui.display("Your light source is growing dim.");
            } else if (lightSource.light === 0) {
                this.ui.display("Your light source has run out.");
            }
        }

        const currentRoom = this.player.room;
        if (!currentRoom.isLight && !lightSource) {
            this.gameOver("It is pitch black. You are likely to be eaten by a grue.");
            return;
        }

        const context = {
            roomObjects: this.player.room.objects,
            inventoryObjects: this.player.inventory
        };
        const action = this.parser.parse(command, context);

        if (action.error) {
            this.ui.display(action.error);
            return;
        }

        switch (action.verb) {
            case 'look':
                this.look();
                break;
            case 'go':
                this.go(action.directObject);
                break;
            case 'take':
                this.take(action.directObject);
                break;
            case 'drop':
                this.drop(action.directObject);
                break;
            case 'inventory':
                this.inventory();
                break;
            case 'open':
                this.open(action.directObject);
                break;
            case 'close':
                this.close(action.directObject);
                break;
            case 'attack':
                this.attack(action.directObject);
                break;
            case 'move':
                this.move(action.directObject);
                break;
            case 'read':
                this.read(action.directObject);
                break;
            case 'throw':
                this.throw(action.directObject);
                break;
            case 'use':
                this.use(action.directObject, action.indirectObject);
                break;
            case 'push':
                this.push(action.directObject);
                break;
            case 'eat':
                this.eat(action.directObject);
                break;
            case 'drink':
                this.drink(action.directObject);
                break;
            case 'turn':
                this.turn(action.directObject);
                break;
            case 'tie':
                this.tie(action.directObject);
                break;
            case 'untie':
                this.untie(action.directObject);
                break;
            case 'burn':
                this.burn(action.directObject);
                break;
            case 'light':
                this.light(action.directObject);
                break;
            case 'knock':
                this.knock(action.directObject);
                break;
            case 'yell':
                this.yell();
                break;
            case 'jump':
                this.jump();
                break;
            case 'rub':
                this.rub(action.directObject);
                break;
            case 'pray':
                this.pray();
                break;
            case 'exorcise':
                this.exorcise(action.directObject);
                break;
            default:
                this.ui.display("I don't know how to do that yet.");
        }
    }
}
