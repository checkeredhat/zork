import json
import re

def get_mdl_objects():
    """
    Reads zork/dung.56 and extracts all object IDs,
    handling potential binary characters and the correct MDL syntax.
    """
    mdl_objects = set()
    # This pattern finds #OBJECT, skips to the first quote, and captures the ID.
    pattern = re.compile(r'#OBJECT\s*\{\s*"(\w+)"', re.M)

    try:
        # Use latin-1 encoding as it's forgiving for mixed/binary-ish files.
        with open('zork/dung.56', 'r', encoding='latin-1') as f:
            content = f.read()
            matches = pattern.findall(content)
            mdl_objects = set(matches)
    except Exception as e:
        print(f"Error reading or parsing zork/dung.56: {e}")
        return None

    return mdl_objects

def compare_objects():
    mdl_objects = get_mdl_objects()
    if mdl_objects is None:
        return

    try:
        with open('data/objects.json', 'r') as f:
            js_data = json.load(f)
            # The ################################################### is a placeholder
            # and not a real object.
            js_objects = set(js_data.keys()) - {'#####'}
    except Exception as e:
        print(f"Error reading or parsing data/objects.json: {e}")
        return

    # Perform the comparison
    missing_objects = sorted(list(mdl_objects - js_objects))
    extra_objects = sorted(list(js_objects - mdl_objects))

    if not missing_objects and not extra_objects:
        print("Success! objects.json is perfectly in sync with the MDL source.")
        return

    if missing_objects:
        print("Missing objects from objects.json:")
        for obj in missing_objects:
            print(obj)

    if extra_objects:
        print("\nExtra objects in objects.json (should be removed):")
        for obj in extra_objects:
            print(obj)

if __name__ == "__main__":
    compare_objects()
