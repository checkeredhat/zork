import json

def convert_json_format():
    """
    Converts data/rooms.json from a list of objects to a dictionary
    keyed by the room's 'id' field.
    """
    try:
        with open('data/rooms.json', 'r') as f:
            data = json.load(f)

        if isinstance(data, list):
            new_data = {room['id']: room for room in data}
            with open('data/rooms.json', 'w') as f:
                json.dump(new_data, f, indent=4)
            print("Successfully converted data/rooms.json from a list to a dictionary.")
        elif isinstance(data, dict):
            print("data/rooms.json is already in the correct dictionary format.")
        else:
            print("Unknown format for data/rooms.json")

    except FileNotFoundError:
        print("Error: data/rooms.json not found.")
    except json.JSONDecodeError:
        print("Error: Could not decode JSON from data/rooms.json.")
    except KeyError:
        print("Error: A room in the list is missing the 'id' field.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    convert_json_format()
