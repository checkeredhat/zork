import json

def convert_json_format():
    """
    Converts data/objects.json from a list of objects to a dictionary
    keyed by the object's 'id' field.
    """
    try:
        with open('data/objects.json', 'r') as f:
            data = json.load(f)

        if isinstance(data, list):
            new_data = {obj['id']: obj for obj in data}
            with open('data/objects.json', 'w') as f:
                json.dump(new_data, f, indent=4)
            print("Successfully converted data/objects.json from a list to a dictionary.")
        elif isinstance(data, dict):
            print("data/objects.json is already in the correct dictionary format.")
        else:
            print("Unknown format for data/objects.json")

    except FileNotFoundError:
        print("Error: data/objects.json not found.")
    except json.JSONDecodeError:
        print("Error: Could not decode JSON from data/objects.json.")
    except KeyError:
        print("Error: An object in the list is missing the 'id' field.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    convert_json_format()
