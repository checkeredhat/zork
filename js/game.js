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
        this.glacierMelted = false;
        this.playerSize = 'normal'; // normal, small, large
        this.poisonGasTimer = 0;
        this.robot = {
            room: null,
            inventory: []
        };
        this.thief = {
            room: null, // Current room object
            inventory: [],
            timer: 0, // Countdown for next action
            patrolRoute: [], // Array of room IDs
            patrolIndex: 0, // Current position in the patrol route
            isHidden: true, // Whether the thief is 'hiding' in a room
            isAngry: false // Fight flag
        };
        this.isCarouselSpinning = true;
        this.isBasketAtTop = true;
        this.deflateFlag = true;
        this.isSafeOpen = false;
        this.isMirrorBroken = false;
        this.cyclopsIsThirsty = false;
        this.cyclopsIsGone = false;
        this.isEchoFixed = false;
        this.timers = [];
        this.deathMessages = {};
        this.ghostTimer = 0;
        this.trollDefeated = false;
        this.offendedMessages = [
            "Such language in a high-class establishment like this!",
            "You ought to be ashamed of yourself.",
            "It's not so bad. You could have been killed already.",
            "Tough shit, asshole.",
            "Oh, dear. Such language from a supposed winning adventurer!"
        ];
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

        this.robot.room = this.rooms['ROBOT-ROOM'];

        this.look();
    }

    async loadWorld() {
        this.ui.display("Loading game data...");

        try {
            const [vocabData, objectsData, roomsData, deathMessagesData] = await Promise.all([
                fetch('data/vocabulary.json').then(res => res.json()),
                fetch('data/objects.json').then(res => res.json()),
                fetch('data/rooms.json').then(res => res.json()),
                fetch('data/death_messages.json').then(res => res.json())
            ]);

            this.vocabulary = vocabData;
            this.deathMessages = deathMessagesData;

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
                this.thief.patrolRoute.push(roomId);
            }
            this.thief.room = this.rooms[this.thief.patrolRoute[0]];

            this.ui.display("Loading complete.");

        } catch (error) {
            this.ui.display("Error loading game data. Please check the console for details.");
            console.error("Failed to load game data:", error);
        }
    }

    thiefUpdate() {
        const thiefObject = this.objects['THIEF'];
        const playerRoom = this.player.room;
        const thiefRoom = this.thief.room;

        // If player is in the Treasure Room, the thief always appears and attacks.
        if (playerRoom.id === 'TREAS' && thiefRoom.id !== 'TREAS') {
            this.moveThiefTo(this.rooms['TREAS']);
            this.thief.isHidden = false;
            this.thief.isAngry = true;
            this.ui.display("You hear a scream of anguish as you violate the robber's hideaway. Using passages unknown to you, he rushes to its defense.");
            return;
        }

        // If the player is in the same room as the thief...
        if (playerRoom === thiefRoom) {
            if (this.thief.isHidden) {
                // 30% chance to reveal himself
                if (Math.random() < 0.3) {
                    this.thief.isHidden = false;
                    this.ui.display("Someone carrying a large bag is casually leaning against one of the walls here. He does not speak, but it is clear from his aspect that the bag will be taken only over his dead body.");
                }
            } else {
                // If revealed, he might act.
                // 30% chance to steal everything and leave
                if (Math.random() < 0.3) {
                    const stolenFromPlayer = this.robAdventurer(this.player, this.thief.inventory);
                    const stolenFromRoom = this.robRoom(playerRoom, this.thief.inventory, 100); // 100% chance

                    if (stolenFromPlayer.length > 0 || stolenFromRoom.length > 0) {
                         this.ui.display("The other occupant just left, still carrying his large bag. You may not have noticed that he robbed you blind first.");
                    } else {
                        this.ui.display("The other occupant (he of the large bag), finding nothing of value, left disgusted.");
                    }
                    this.moveThiefToNextRoom();
                    this.thief.isHidden = true;

                } else if (Math.random() < 0.3) { // Another 30% chance to just leave
                    this.ui.display("The holder of the large bag just left, looking disgusted. Fortunately, he took nothing.");
                    this.moveThiefToNextRoom();
                    this.thief.isHidden = true;
                }
            }
        } else {
             // Thief is not in the same room. He moves along his patrol route.
             this.moveThiefToNextRoom();
             // 75% chance to rob the new room if it's been seen by the player
             if (this.thief.room.isSeen && Math.random() < 0.75) {
                 this.robRoom(this.thief.room, this.thief.inventory, 75);
             }
        }

        // 30% chance to drop a non-valuable item
        if (thiefRoom.id !== 'TREAS' && this.thief.inventory.length > 0 && Math.random() < 0.3) {
            const worthlessItems = this.thief.inventory.filter(obj => obj.value === 0);
            if (worthlessItems.length > 0) {
                const droppedItem = worthlessItems[0];
                this.thief.inventory = this.thief.inventory.filter(obj => obj.id !== droppedItem.id);
                thiefRoom.objects.push(droppedItem);
                if (thiefRoom === playerRoom && !this.thief.isHidden) {
                    this.ui.display(`The robber, rummaging through his bag, dropped a few items he found valueless.`);
                }
            }
        }
    }

    moveThiefToNextRoom() {
        const currentThiefRoom = this.thief.room;
        if (currentThiefRoom) {
            currentThiefRoom.objects = currentThiefRoom.objects.filter(obj => obj.id !== 'THIEF');
        }

        this.thief.patrolIndex = (this.thief.patrolIndex + 1) % this.thief.patrolRoute.length;
        const nextRoomId = this.thief.patrolRoute[this.thief.patrolIndex];
        const nextRoom = this.rooms[nextRoomId];

        // Skip sacred rooms
        if (nextRoom.flags.isSacred) {
            this.thief.patrolIndex = (this.thief.patrolIndex + 1) % this.thief.patrolRoute.length;
            const nextNextRoomId = this.thief.patrolRoute[this.thief.patrolIndex];
            this.thief.room = this.rooms[nextNextRoomId];
        } else {
             this.thief.room = nextRoom;
        }

        this.thief.room.objects.push(this.objects['THIEF']);
    }

    moveThiefTo(room) {
        const currentThiefRoom = this.thief.room;
        if (currentThiefRoom) {
            currentThiefRoom.objects = currentThiefRoom.objects.filter(obj => obj.id !== 'THIEF');
        }
        this.thief.room = room;
        room.objects.push(this.objects['THIEF']);
        // Update patrol index to match
        this.thief.patrolIndex = this.thief.patrolRoute.indexOf(room.id);
    }

    robAdventurer(player, thiefInventory) {
        const stolenItems = [];
        player.inventory.forEach(obj => {
            if (obj.value > 0 && !obj.flags.isSacred) {
                stolenItems.push(obj);
            }
        });
        stolenItems.forEach(obj => {
            player.inventory = player.inventory.filter(item => item.id !== obj.id);
            thiefInventory.push(obj);
        });
        return stolenItems;
    }

    robRoom(room, thiefInventory, probability) {
        const stolenItems = [];
        room.objects.forEach(obj => {
            if (obj.value > 0 && !obj.flags.isSacred && obj.flags.isVisible && (Math.random() * 100) < probability) {
                 stolenItems.push(obj);
            }
        });
         stolenItems.forEach(obj => {
            room.objects = room.objects.filter(item => item.id !== obj.id);
            thiefInventory.push(obj);
        });
        return stolenItems;
    }

    look() {
        const currentRoom = this.player.room;

        if (currentRoom.isSeen) {
            this.ui.display(currentRoom.shortDescription);
        } else {
            this.ui.display(currentRoom.longDescription);
            currentRoom.isSeen = true;
        }

        // Check for sword glow
        const sword = this.objects['SWORD'];
        if (sword && (this.player.inventory.includes(sword) || currentRoom.objects.includes(sword))) {
            if (window.gameActions && window.gameActions[sword.action]) {
                window.gameActions[sword.action](this);
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
        let exit = currentRoom.exits.find(e => e.direction.toLowerCase() === direction.toLowerCase());

        if (currentRoom.id === 'CAROUSEL-ROOM' && this.isCarouselSpinning) {
            const exits = currentRoom.exits;
            exit = exits[Math.floor(Math.random() * exits.length)];
            this.ui.display("The room spins, and you stumble out a random exit.");
        }

        if (exit) {
            if (exit.condition) {
                if (exit.condition === 'DAM_WATER_LOW') {
                    if (this.damWaterLevel !== 'low') {
                        this.ui.display(exit.message || "You can't go that way.");
                        return;
                    }
                } else if (exit.condition === 'GLACIER_MELTED') {
                    if (!this.glacierMelted) {
                        this.ui.display(exit.message || "You can't go that way.");
                        return;
                    }
                } else if (exit.condition === 'PLAYER_SMALL') {
                    if (this.playerSize !== 'small') {
                        this.ui.display(exit.message || "You can't go that way.");
                        return;
                    }
                } else if (exit.condition === 'trollDefeated') {
                    if (!this.trollDefeated) {
                        this.ui.display(exit.message || "You can't go that way.");
                        return;
                    }
                } else if (exit.condition === 'CYCLOPS_GONE') {
                    if (!this.cyclopsIsGone) {
                        this.ui.display(exit.message || "You can't go that way.");
                        return;
                    }
                } else if (exit.condition === 'CYCLOPS_ASLEEP') {
                    const cyclops = this.objects['CYCLO'];
                    if (cyclops.flags.isVillain) {
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
                if (this.player.room.action && window.gameActions && window.gameActions[this.player.room.action]) {
                    window.gameActions[this.player.room.action](this, 'walk-in');
                }
                if (exit.roomId === 'CAGE') {
                    this.poisonGasTimer = 5; // 5 turns to solve the puzzle
                }
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

        if (gameObject.action) {
            if (this.handleObjectAction('take', gameObject)) {
                return;
            }
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
        if (!gameObject || !gameObject.flags.isVillain) {
            this.ui.display("There is nothing here to attack.");
            return;
        }

        const weapon = this.player.inventory.find(obj => obj.flags.isWeapon);
        if (!weapon) {
            this.ui.display(`Attacking the ${gameObject.names[0]} with your bare hands is suicidal!`);
            return;
        }

        this.handleCombatRound(this.player, gameObject, weapon);
    }

    handleCombatRound(attacker, defender, weapon) {
        // Attacker's turn
        let hitChance = (attacker.strength || 0) + (weapon.accuracy || 75);
        let attackRoll = Math.random() * 100;

        if (attackRoll < hitChance) {
            let damage = weapon.damage + Math.floor(Math.random() * 5); // Add some randomness
            defender.health -= damage;
            this.ui.display(`You strike the ${defender.names[0]} with the ${weapon.names[0]}, dealing ${damage} damage.`);

            if (defender.health <= 0) {
                this.ui.display(`You have defeated the ${defender.names[0]}!`);
                defender.flags.isVillain = false; // No longer a threat
                defender.description = `The slain ${defender.names[0]} lies on the ground.`;
                if (defender.id === 'TROLL') {
                    this.trollDefeated = true;
                }
                if (defender.id === 'THIEF') {
                    this.handleObjectAction('dead', defender);
                }
                return;
            }
        } else {
            this.ui.display(`You swing at the ${defender.names[0]} but miss.`);
        }

        // Defender's turn
        hitChance = (defender.strength || 0) + (defender.accuracy || 75);
        attackRoll = Math.random() * 100;

        if (attackRoll < hitChance) {
            let damage = defender.damage + Math.floor(Math.random() * 3);
            this.player.health -= damage;
            this.ui.display(`The ${defender.names[0]} strikes back, dealing ${damage} damage to you. Your health is now ${this.player.health}.`);

            if (this.player.health <= 0) {
                this.gameOver(defender.id);
            }
        } else {
            this.ui.display(`The ${defender.names[0]} attacks you but misses.`);
        }
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

    throw(directObject, indirectObject) {
        if (!directObject) {
            this.ui.display("What do you want to throw?");
            return;
        }
        if (this.player.inventory.indexOf(directObject) === -1) {
            this.ui.display("You don't have that.");
            return;
        }

        this.player.inventory = this.player.inventory.filter(obj => obj.id !== directObject.id);
        this.player.room.objects.push(directObject);
        directObject.room = this.player.room;

        this.ui.display(`You threw the ${directObject.names[0]}.`);

        if (indirectObject && indirectObject.action) {
            this.handleObjectAction('throw', directObject, indirectObject);
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

    put(directObject, indirectObject) {
        if (!directObject || !indirectObject) {
            this.ui.display("What do you want to put where?");
            return;
        }

        if (this.player.inventory.indexOf(directObject) === -1) {
            this.ui.display("You don't have that.");
            return;
        }

        // Special case for fuse and brick
        if (directObject.id === 'FUSE' && indirectObject.id === 'BRICK') {
            this.player.inventory = this.player.inventory.filter(obj => obj.id !== 'FUSE');
            indirectObject.contents.push('FUSE');
            this.ui.display(`You put the fuse in the brick.`);
            return;
        }

        if (!indirectObject.flags.isContainer) {
            this.ui.display("You can't put things in that.");
            return;
        }

        if (!indirectObject.flags.isOpen) {
            this.ui.display("It's closed.");
            return;
        }

        // Basic container logic
        this.player.inventory = this.player.inventory.filter(obj => obj.id !== directObject.id);
        indirectObject.contents.push(directObject.id);
        this.ui.display(`You put the ${directObject.names[0]} in the ${indirectObject.names[0]}.`);
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

        if (gameObject.action === 'EAT-CAKE-SMALL') {
            this.ui.display("You eat the small cake. You suddenly feel yourself shrinking!");
            this.playerSize = 'small';
            this.player.inventory = this.player.inventory.filter(obj => obj.id !== gameObject.id);
            return;
        }

        if (gameObject.action === 'EAT-CAKE-LARGE') {
            this.ui.display("You eat the large cake. You suddenly feel yourself growing!");
            this.playerSize = 'large';
            this.player.inventory = this.player.inventory.filter(obj => obj.id !== gameObject.id);
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

    turn(gameObject, state) { // state can be 'on' or 'off'
        if (!gameObject) {
            this.ui.display("What do you want to turn?");
            return;
        }
        if (gameObject.action) {
            // Pass the state to the action handler
            if (state === 'on') {
                return this.handleObjectAction('turn on', gameObject);
            } else if (state === 'off') {
                return this.handleObjectAction('turn off', gameObject);
            }
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

    board(gameObject) {
        if (!gameObject || !gameObject.flags.isVehicle) {
            this.ui.display("You can't board that.");
            return;
        }
        if (this.player.vehicle) {
            this.ui.display("You are already in a vehicle.");
            return;
        }
        if (gameObject.action) {
            if (this.handleObjectAction('board', gameObject)) {
                return;
            }
        }
        this.player.vehicle = gameObject;
        this.ui.display(`You board the ${gameObject.names[0]}.`);
    }

    disembark(gameObject) {
        if (!this.player.vehicle) {
            this.ui.display("You are not in a vehicle.");
            return;
        }
        if (this.player.vehicle.action) {
            if (this.handleObjectAction('disembark', this.player.vehicle)) {
                return;
            }
        }
        this.ui.display(`You disembark from the ${this.player.vehicle.names[0]}.`);
        this.player.vehicle = null;
    }

    burn(gameObject) {
        if (!gameObject) {
            this.ui.display("What do you want to burn?");
            return;
        }

        let hasFire = this.player.inventory.find(obj => obj.flags.isLightSource && obj.flags.isLit);
        const matches = this.objects['MATCH'];

        if (!hasFire && matches && this.player.inventory.includes(matches) && matches.light > 0) {
            this.ui.display("(using a match)");
            this.handleObjectAction('light', matches); // Use a match
            hasFire = true; // Now we have fire
        }

        if (!hasFire) {
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
        // Delegate to action system if available
        if (gameObject.action && this.handleObjectAction('light', gameObject)) {
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
        // Generic fallback
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

    commandRobot(command) {
        // A very simple robot command parser
        const tokens = command.toLowerCase().split(' ');
        const verb = tokens[0];
        const directObject = tokens.length > 1 ? tokens.slice(1).join(' ') : null;

        const robotObject = this.objects['ROBOT'];
        if (robotObject.room !== this.player.room) {
            this.ui.display("The robot is not here.");
            return;
        }

        switch (verb) {
            case 'go':
                const direction = directObject;
                const robotRoom = this.robot.room;
                const exit = robotRoom.exits.find(e => e.direction.toLowerCase() === direction.toLowerCase());
                if (exit) {
                    this.robot.room = this.rooms[exit.roomId];
                    this.ui.display("The robot whirs and moves to the " + direction);
                } else {
                    this.ui.display("The robot cannot go that way.");
                }
                break;
            case 'take':
                const objToTake = this.robot.room.objects.find(o => o.names.includes(directObject));
                if (objToTake && objToTake.flags.isTakeable) {
                    this.robot.room.objects = this.robot.room.objects.filter(o => o.id !== objToTake.id);
                    this.robot.inventory.push(objToTake);
                    this.ui.display(`The robot takes the ${objToTake.names[0]}.`);
                } else {
                    this.ui.display("The robot cannot take that.");
                }
                break;
            default:
                this.ui.display("The robot does not understand that command.");
        }
    }

    ghostEvent() {
        this.ui.display("A ghost appears in the room and is appalled at your having desecrated the remains of a fellow adventurer. He casts a curse on all of your valuables and orders them banished to the Land of the Living Dead. The ghost leaves, muttering obscenities.");
        const lld = this.rooms['LLD2'];
        const valuables = this.player.inventory.filter(obj => obj.value > 0);
        valuables.forEach(obj => {
            obj.flags.isCursed = true;
            this.player.inventory = this.player.inventory.filter(o => o.id !== obj.id);
            lld.objects.push(obj);
        });

        const ghost = this.objects['GHOST'];
        ghost.room = this.player.room;
        this.player.room.objects.push(ghost);
        this.ghostTimer = 5;
    }

    handleObjectAction(verb, directObject, indirectObject) {
        const gameObject = indirectObject || directObject;
        if (gameObject.action && window.gameActions && window.gameActions[gameObject.action]) {
            const handled = window.gameActions[gameObject.action](this, verb, directObject, indirectObject);
            if (handled) {
                return true;
            }
        }
        return false;
    }

    gameOver(cause = 'DEFAULT') {
        const message = this.deathMessages[cause] || this.deathMessages['DEFAULT'];
        this.ui.display(message);
        this.ui.display("\n**** You have died ****");
        this.isGameOver = true;
        // Here you might want to disable the input as well
        this.ui.inputElement.disabled = true;
    }

    tickTimers() {
        if (this.timers.length === 0) return;

        for (let i = this.timers.length - 1; i >= 0; i--) {
            const timer = this.timers[i];
            timer.turns--;

            if (timer.turns <= 0) {
                const targetObject = this.objects[timer.targetId];
                if (targetObject && targetObject.action && window.gameActions[targetObject.action]) {
                    window.gameActions[targetObject.action](this, timer.action, targetObject);
                }
                this.timers.splice(i, 1);
            }
        }
    }

    processTurn(command) {
        this.tickTimers();
        if (this.isGameOver) {
            return; // Don't process commands if the game is over
        }

        this.thiefUpdate();

        if (!command) return;

        // Handle robot command separately
        if (command.toLowerCase().startsWith('robot,')) {
            const robotCommand = command.substring(7).trim();
            this.commandRobot(robotCommand);
            return;
        }

        // The command is now displayed by the UI class
        // this.ui.displayPrompt(`> ${command}`);

        // Ghost timer
        if (this.ghostTimer > 0) {
            this.ghostTimer--;
            if (this.ghostTimer === 0) {
                const ghost = this.objects['GHOST'];
                if (ghost && ghost.room === this.player.room) {
                    this.ui.display("The ghost fades away.");
                    this.player.room.objects = this.player.room.objects.filter(obj => obj.id !== 'GHOST');
                    ghost.room = null;
                }
            }
        }

        // Poison gas timer
        if (this.poisonGasTimer > 0) {
            this.poisonGasTimer--;
            if (this.poisonGasTimer > 0) {
                this.ui.display(`The hissing sound grows louder. You have ${this.poisonGasTimer} turns left.`);
            } else {
                this.gameOver('GAS');
                return;
            }
        }

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
            this.gameOver('GRUE');
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

        // Room-specific action handling
        if (currentRoom.action && window.gameActions && window.gameActions[currentRoom.action]) {
            const handled = window.gameActions[currentRoom.action](this, action.verb, action.directObject, action.indirectObject, command);
            if (handled) {
                return;
            }
        }

        // Object-specific action handling
        if (action.directObject && action.directObject.action) {
            if (this.handleObjectAction(action.verb, action.directObject, action.indirectObject)) {
                return;
            }
        }
        if (action.indirectObject && action.indirectObject.action) {
            if (this.handleObjectAction(action.verb, action.directObject, action.indirectObject)) {
                return;
            }
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
                this.throw(action.directObject, action.indirectObject);
                break;
            case 'use':
                this.use(action.directObject, action.indirectObject);
                break;
            case 'push':
                this.push(action.directObject);
                break;
            case 'put':
                this.put(action.directObject, action.indirectObject);
                break;
            case 'eat':
                this.eat(action.directObject);
                break;
            case 'drink':
                this.drink(action.directObject);
                break;
            case 'turn':
                this.turn(action.directObject, action.indirectObject);
                break;
            case 'tie':
                this.tie(action.directObject);
                break;
            case 'untie':
                this.untie(action.directObject);
                break;
            case 'board':
                this.board(action.directObject);
                break;
            case 'disembark':
                this.disembark(action.directObject);
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
            case 'robot':
                this.commandRobot(action.directObject);
                break;
            case 'frobozz':
                this.ui.display("The FROBOZZ Corporation created, owns, and operates this dungeon.");
                break;
            case 'hello':
                this.ui.display("Hello.");
                break;
            case 'curses':
                this.ui.display(this.offendedMessages[Math.floor(Math.random() * this.offendedMessages.length)]);
                break;
            case 'odysseus':
            case 'sinbad':
                if (this.player.room.id === 'CYCLO' && !this.cyclopsIsGone) {
                    this.ui.display("The cyclops, hearing the name of his deadly nemesis, flees the room by knocking down the wall on the north of the room.");
                    this.cyclopsIsGone = true;
                    this.objects['CYCLO'].flags.isVisible = false;
                    // This should reveal a new exit. For now, we'll just remove the cyclops.
                    // A more complete implementation would modify the room's exits.
                } else {
                    this.ui.display("Wasn't he a sailor?");
                }
                break;
            default:
                this.ui.display("I don't know how to do that yet.");
        }
    }
}
