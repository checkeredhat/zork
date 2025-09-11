#!/bin/bash

# This script bundles the game's JavaScript files and data into a single file,
# dist/game.js. It's a simple concatenation and cleanup process, not a full
# build with a bundler like esbuild or webpack.

# Re-create the file from scratch to ensure it's correct.
echo "" > dist/game.js

# 1. Start with the data.
echo "/* Zork Data */" >> dist/game.js
objects_json=$(cat data/objects.json)
rooms_json=$(cat data/rooms.json)
vocabulary_json=$(cat data/vocabulary.json)
death_messages_json=$(cat data/death_messages.json)

cat <<EOF >> dist/game.js
const objectsData = ${objects_json};
const roomsData = ${rooms_json};
const vocabularyData = ${vocabulary_json};
const deathMessagesData = ${death_messages_json};
EOF

# 2. Append the JS files in the correct order, cleaning them up properly.
echo "/* Zork Game Code */" >> dist/game.js

# The order of concatenation is important to satisfy dependencies.
# Files are ordered from least dependent to most dependent.

# js/flags.js (no dependencies)
sed '/^export {/,/};/d' js/flags.js >> dist/game.js

# js/models.js (depends on flags.js)
sed -e '/^import/d' -e '/^export {/,/};/d' js/models.js >> dist/game.js

# js/parser.js (no dependencies)
sed '/^export {/,/};/d' js/parser.js >> dist/game.js

# js/exit.js (no dependencies)
sed '/^export {/,/};/d' js/exit.js >> dist/game.js

# js/ui.js (no dependencies)
cat js/ui.js >> dist/game.js

# js/actions.js (depends on models.js, flags.js)
sed -e '/^import/,/from/d' -e '/^export {/,/};/d' js/actions.js >> dist/game.js

# js/game.js (depends on most other files)
sed -e '/^import/d' -e '/^export {/,/};/d' js/game.js >> dist/game.js

# js/main.js (depends on game.js)
# The sed commands here are to remove the module loading logic that is
# not needed in the bundled version.
original_main_content=$(cat js/main.js)
modified_main_content=$(echo "${original_main_content}" |
    sed '/^import/d' |
    sed '/const data = {};/d' |
    sed '/\/\/ Load all necessary data files/,/data.deathMessages = deathMessages;/d' |
    sed '/\/\/ The above line is commented out/,/if needed./d'
)
echo "${modified_main_content}" >> dist/game.js
