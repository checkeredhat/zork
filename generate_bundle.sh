#!/bin/bash

# Re-create the file from scratch to ensure it's correct.

# 1. Start with the data.
objects_json=$(cat data/objects.json)
rooms_json=$(cat data/rooms.json)
vocabulary_json=$(cat data/vocabulary.json)
death_messages_json=$(cat data/death_messages.json)

# 2. Create the initial file content with the data.
cat <<EOF > dist/game.js
const objectsData = ${objects_json};
const roomsData = ${rooms_json};
const vocabularyData = ${vocabulary_json};
const deathMessagesData = ${death_messages_json};
EOF

# 3. Append the JS files, cleaning them up properly.

# js/flags.js
# Remove the entire export block.
sed '/^export {/,/};/d' js/flags.js >> dist/game.js

# js/models.js
# Remove import and the export block.
sed -e '/^import/d' -e '/^export {/,/};/d' js/models.js >> dist/game.js

# js/parser.js
# Remove the export block.
sed '/^export {/,/};/d' js/parser.js >> dist/game.js

# js/actions.js
# Remove the multi-line import and the export block.
sed -e '/^import/,/from/d' -e '/^export {/,/};/d' js/actions.js >> dist/game.js

# js/game.js
# Remove import and the export block.
sed -e '/^import/d' -e '/^export {/,/};/d' js/game.js >> dist/game.js

# js/main.js (already modified and restored, so I'll read from original)
# Create a temporary modified version of main.js
# I will use a temporary file to avoid issues with sed and pipes
temp_main=$(mktemp)
# The search pattern needs to be very specific to avoid accidentally replacing other code
# The original main.js has been restored, so I can work from it.
original_main_content=$(cat js/main.js)
modified_main_content=$(echo "${original_main_content}" |
    sed '/^import/d' | # Remove import
    sed '/const data = {};/d' | # Remove old data object
    sed '/\/\/ Load all necessary data files/,/data.deathMessages = deathMessages;/d' | # Remove fetch and data assignment
    sed '/\/\/ The above line is commented out/,/if needed./d' # Remove the comment about test runner
)
echo "${modified_main_content}" >> dist/game.js
