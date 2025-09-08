class Game {
    constructor(ui) {
        this.ui = ui;
        this.player = null;
        this.rooms = {};
        this.objects = {};
        this.vocabulary = {};
        this.parser = null;
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

        if (currentRoom.isSeen) {
            this.ui.display(currentRoom.shortDescription);
        } else {
            this.ui.display(currentRoom.longDescription);
            currentRoom.isSeen = true;
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

    processTurn(command) {
        if (!command) return;
        this.ui.display(`> ${command}`);

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
            default:
                this.ui.display("I don't know how to do that yet.");
        }
    }
}
