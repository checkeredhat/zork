#!/bin/bash

# This script bundles the game's JavaScript files and data into a single file,
# dist/game.test.bundle.js, for use in Node.js tests. It excludes main.js
# and other browser-specific code.

# Re-create the file from scratch to ensure it's correct.
echo "" > dist/game.test.js

# 1. Start with the data.
echo "/* Zork Data */" >> dist/game.test.js
objects_json=$(cat data/objects.json)
rooms_json=$(cat data/rooms.json)
vocabulary_json=$(cat data/vocabulary.json)
death_messages_json=$(cat data/death_messages.json)

cat <<EOF >> dist/game.test.js
const objectsData = ${objects_json};
const roomsData = ${rooms_json};
const vocabularyData = ${vocabulary_json};
const deathMessagesData = ${death_messages_json};
EOF

# 2. Append the JS files in the correct order, cleaning them up properly.
echo "/* Zork Game Code */" >> dist/game.test.js

# js/flags.js (no dependencies)
sed '/^export {/,/};/d' js/flags.js >> dist/game.test.js

# js/models.js (depends on flags.js)
sed -e '/^import/d' -e '/^export {/,/};/d' js/models.js >> dist/game.test.js

# js/parser.js (no dependencies)
sed '/^export {/,/};/d' js/parser.js >> dist/game.test.js

# js/exit.js (no dependencies)
sed '/^export {/,/};/d' js/exit.js >> dist/game.test.js

# js/actions.js (depends on models.js, flags.js)
sed -e '/^import/,/from/d' -e '/^export {/,/};/d' js/actions.js >> dist/game.test.js

# js/game.js (depends on most other files)
sed -e '/^import/d' -e '/^export {/,/};/d' js/game.js >> dist/game.test.js

# Export the Game class for testing
echo "module.exports = { Game, OFLAGS, RBITS, hasFlag };" >> dist/game.test.js
