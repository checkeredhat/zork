// tests/parser.test.js

const assert = require('assert');
// We need to adjust the path to import from the parent `js` directory
const Parser = require('../js/parser.js');

// --- Mock Data ---

const mockVocabulary = {
    verbs: {
        "take": ["get"],
        "put": ["place"],
        "look": ["l", "examine"],
        "attack": ["hit"],
        "go": [],
        "inven": ["i", "inventory"]
    },
    directions: {
        "north": ["n"],
        "south": ["s"]
    },
    prepositions: ["in", "on", "with", "at"],
    buzzwords: ["the", "a", "an"]
};

const mockObjects = {
    lantern: { id: 'LAMP', names: ['lantern'], adjectives: ['brass'] },
    sword: { id: 'SWORD', names: ['sword'], adjectives: ['elvish'] },
    rug: { id: 'RUG', names: ['rug', 'carpet'], adjectives: ['oriental'] },
    mailbox: { id: 'MAILB', names: ['mailbox'], adjectives: ['small'] },
    leaflet: { id: 'ADVER', names: ['leaflet'], adjectives: [] }
};

const mockContext = {
    roomObjects: [mockObjects.lantern, mockObjects.rug, mockObjects.mailbox],
    inventoryObjects: [mockObjects.sword, mockObjects.leaflet]
};

// --- Test Suite ---

function runTest(description, testFunction) {
    try {
        testFunction();
        console.log(`✔ PASSED: ${description}`);
    } catch (error) {
        console.error(`✖ FAILED: ${description}`);
        console.error(error);
        process.exit(1); // Exit with error code if any test fails
    }
}

const parser = new Parser(mockVocabulary);

// --- Test Cases ---

runTest("should parse a simple verb-object command", () => {
    const result = parser.parse("take lantern", mockContext);
    assert.strictEqual(result.verb, 'take');
    assert.deepStrictEqual(result.directObject, mockObjects.lantern);
    assert.strictEqual(result.indirectObject, null);
});

runTest("should handle synonyms for verbs", () => {
    const result = parser.parse("get lantern", mockContext);
    assert.strictEqual(result.verb, 'take');
    assert.deepStrictEqual(result.directObject, mockObjects.lantern);
});

runTest("should parse commands with adjectives", () => {
    const result = parser.parse("take brass lantern", mockContext);
    assert.strictEqual(result.verb, 'take');
    assert.deepStrictEqual(result.directObject, mockObjects.lantern);
});

runTest("should handle multi-word object names", () => {
    const result = parser.parse("look at oriental carpet", mockContext);
    assert.strictEqual(result.verb, 'look');
    assert.deepStrictEqual(result.directObject, mockObjects.rug);
});

runTest("should parse commands with prepositions and indirect objects", () => {
    const result = parser.parse("put leaflet in mailbox", mockContext);
    assert.strictEqual(result.verb, 'put');
    assert.deepStrictEqual(result.directObject, mockObjects.leaflet);
    assert.deepStrictEqual(result.indirectObject, mockObjects.mailbox);
});

runTest("should parse directional commands", () => {
    const result = parser.parse("n", mockContext);
    assert.strictEqual(result.verb, 'go');
    assert.strictEqual(result.directObject, 'north');
});

runTest("should parse 'go' with a direction", () => {
    const result = parser.parse("go south", mockContext);
    assert.strictEqual(result.verb, 'go');
    assert.strictEqual(result.directObject, 'south');
});

runTest("should return an error for an unknown verb", () => {
    const result = parser.parse("fly to the moon", mockContext);
    assert.ok(result.error);
    assert.strictEqual(result.error, "I don't understand that sentence.");
});

runTest("should return an error for a missing direct object", () => {
    const result = parser.parse("take the shiny object", mockContext);
    assert.ok(result.error);
    assert.strictEqual(result.error, "I can't see a \"shiny object\" here.");
});

runTest("should handle single-word commands like 'inventory'", () => {
    const result = parser.parse("inventory", mockContext);
    assert.strictEqual(result.verb, 'inven'); // Should return the canonical verb
    assert.strictEqual(result.directObject, null);
});

runTest("should handle single-word command 'i' for inventory", () => {
    const result = parser.parse("i", mockContext);
    assert.strictEqual(result.verb, 'inven'); // Should return the canonical verb
});


runTest("should strip buzzwords", () => {
    const result = parser.parse("take the lantern", mockContext);
    assert.strictEqual(result.verb, 'take');
    assert.deepStrictEqual(result.directObject, mockObjects.lantern);
});

console.log("\nAll parser tests completed successfully!");
