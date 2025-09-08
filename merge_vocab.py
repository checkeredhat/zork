import json

def merge_vocabularies():
    try:
        # Load the extracted verb data
        with open('new_vocab.json', 'r') as f:
            new_verbs = json.load(f)

        # Load the existing vocabulary structure
        with open('data/vocabulary.json', 'r') as f:
            old_vocab = json.load(f)

        # The new structure will be based on the old one, but with updated verbs
        final_vocab = old_vocab

        # Overwrite the 'verbs' section with the new, more complete data
        # The new_verbs file already has the desired format { "verb": ["synonym1", ...], ... }
        final_vocab['verbs'] = new_verbs

        # The directions from the old file are good, but let's make sure
        # 'go' isn't in the verbs list, as it's handled by directions.
        if 'go' in final_vocab['verbs']:
            del final_vocab['verbs']['go']

        # Add any other categories from the old vocab that we want to keep
        # (prepositions, adjectives, buzzwords are already in final_vocab)

        # Save the final merged vocabulary
        with open('data/vocabulary.json', 'w') as f:
            json.dump(final_vocab, f, indent=4, sort_keys=True)

        print("Successfully merged vocabularies into data/vocabulary.json")

    except Exception as e:
        print(f"An error occurred during merging: {e}")

if __name__ == "__main__":
    merge_vocabularies()
