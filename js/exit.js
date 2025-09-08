class Exit {
    constructor({
        direction,
        roomId,
        condition = null, // Can be a flag name (string) or a function
        message = null // Message to show if exit is blocked
    }) {
        this.direction = direction;
        this.roomId = roomId;
        this.condition = condition;
        this.message = message;
    }
}
