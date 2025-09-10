import json

def transform_vocabulary():
    """
    Reads the old vocabulary and objects files, transforms the vocabulary
    to the new format (using arrays of objects with id and synonyms),
    and overwrites the vocabulary.json file.
    """
    try:
        # Load the existing objects to generate the nouns list
        with open('data/objects.json', 'r') as f:
            objects_data = json.load(f)

        # Load the old vocabulary file
        with open('data/vocabulary.json', 'r') as f:
            old_vocab = json.load(f)

        # 1. Create the new nouns array
        new_nouns = []
        for obj in objects_data:
            noun_entry = {
                "id": obj.get("id", "").upper(),
                "name": obj.get("name", obj.get("id", "")).lower(),
                "synonyms": [s.lower() for s in obj.get("synonyms", [])]
            }
            # The main name should also be a synonym
            if "name" in obj and obj["name"].lower() not in noun_entry["synonyms"]:
                noun_entry["synonyms"].insert(0, obj["name"].lower())
            new_nouns.append(noun_entry)

        # 2. Transform verbs (if necessary)
        new_verbs = old_vocab.get("verbs", [])
        if 'verbs' in old_vocab and isinstance(old_vocab['verbs'], dict):
            new_verbs = []
            for verb_id, synonyms in old_vocab['verbs'].items():
                new_verbs.append({
                    "id": verb_id.upper(),
                    "synonyms": [s.lower() for s in synonyms]
                })

        # 3. Transform directions (if necessary)
        new_directions = old_vocab.get("directions", [])
        if 'directions' in old_vocab and isinstance(old_vocab['directions'], dict):
            new_directions = []
            for dir_id, synonyms in old_vocab['directions'].items():
                new_directions.append({
                    "id": dir_id.upper(),
                    "synonyms": [s.lower() for s in synonyms]
                })

        # 4. Assemble the new vocabulary object
        new_vocab = {
            "adjectives": old_vocab.get("adjectives", []),
            "buzzwords": old_vocab.get("buzzwords", []),
            "prepositions": old_vocab.get("prepositions", []),
            "verbs": new_verbs,
            "nouns": new_nouns,
            "directions": new_directions
        }

        # 5. Overwrite the vocabulary.json file
        with open('data/vocabulary.json', 'w') as f:
            json.dump(new_vocab, f, indent=4)

        print("Successfully transformed and updated data/vocabulary.json")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    transform_vocabulary()
