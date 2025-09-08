import re
import json

def extract_verbs_and_synonyms(content):
    """
    Extracts verbs and their synonyms from the MDL source.
    Returns a dictionary where keys are the canonical verbs and
    values are lists of synonyms.
    """
    vocab = {}

    # Pattern for ADD-ACTION variants: <[S1A]ADD-ACTION "VERB" ...>
    # Captures the main verb, e.g., "TAKE"
    action_pattern = re.compile(r'<[S1A]?ADD-ACTION\s+"([^"]+)"', re.I)

    # Pattern for VSYNONYM: <VSYNONYM "CANONICAL" "SYN1" "SYN2" ...>
    # Captures the canonical verb and all its synonyms
    synonym_pattern = re.compile(r'<VSYNONYM\s+((?:"[^"]+"\s*)+)>', re.I)

    # First, find all canonical verbs from action definitions
    actions = action_pattern.findall(content)
    for action in actions:
        key = action.lower()
        if key not in vocab:
            vocab[key] = []

    # Now, process synonyms
    synonym_blocks = synonym_pattern.findall(content)
    for block in synonym_blocks:
        # Split the block of quoted strings into individual words
        words = [word.strip('"') for word in re.findall(r'"[^"]+"', block)]
        if not words:
            continue

        canonical = words[0].lower()
        synonyms = [s.lower() for s in words[1:]]

        if canonical in vocab:
            vocab[canonical].extend(synonyms)
        else:
            # This case might happen if a synonym is defined for a verb
            # that doesn't have a simple ADD-ACTION entry (e.g. built-in).
            # We'll add it anyway.
            vocab[canonical] = synonyms

    return vocab

def main():
    try:
        with open('zork/dung.56', 'r', encoding='latin-1') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading zork/dung.56: {e}")
        return

    vocabulary = extract_verbs_and_synonyms(content)

    # Also add directions
    directions = {
        "north": ["n"],
        "south": ["s"],
        "east": ["e"],
        "west": ["w"],
        "northeast": ["ne"],
        "northwest": ["nw"],
        "southeast": ["se"],
        "southwest": ["sw"],
        "up": ["u"],
        "down": ["d"],
        "in": [],
        "out": []
    }
    vocabulary['go'] = list(directions.keys())

    # Save to a file
    try:
        with open('new_vocab.json', 'w') as f:
            json.dump(vocabulary, f, indent=4, sort_keys=True)
        print("Successfully extracted vocabulary to new_vocab.json")
    except Exception as e:
        print(f"Error writing JSON file: {e}")

if __name__ == "__main__":
    main()
