import json
import re

def parse_flagword(content):
    """Parses <FLAGWORD ...> definitions to get bit values."""
    flags = {}
    bit_value = 1
    # This pattern is simplified; assumes one flag per line in FLAGWORD block
    pattern = re.compile(r'<FLAGWORD\s+([\w\s<>-]+)>', re.DOTALL)
    flag_name_pattern = re.compile(r'(\w+)\s+.*')

    for block in pattern.findall(content):
        lines = block.strip().split('\n')
        for line in lines:
            line = line.strip()
            if not line:
                continue
            match = flag_name_pattern.match(line)
            if match:
                flag_name = match.group(1).strip()
                if flag_name:
                    flags[flag_name] = bit_value
                    bit_value *= 2
    return flags

def get_mdl_data(flag_map):
    """
    Reads zork/dung.56 and extracts structured data for objects and rooms.
    """
    mdl_objects = {}
    mdl_rooms = {}

    try:
        with open('zork/dung.56', 'r', encoding='latin-1') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading zork/dung.56: {e}")
        return None, None

    # Regex for objects
    obj_pattern = re.compile(r'#OBJECT\s*\{"([^"]+)"(.*?)\}', re.DOTALL)
    for match in obj_pattern.finditer(content):
        obj_id = match.group(1)
        body = match.group(2)

        props = {}
        # Descriptions
        desc_match = re.search(r'"([^"]*)"\s*"([^"]*)"\s*"([^"]*)"', body)
        if desc_match:
            props['initialDescription'] = desc_match.group(1).replace('\n', ' ').strip()
            props['description'] = desc_match.group(2).replace('\n', ' ').strip()
            # ODESCO is often not present, group(3) could be the action

        # Flags
        flags_match = re.search(r'%<([,\w\s\+]+)>', body)
        if flags_match:
            flag_str = flags_match.group(1)
            total_flag_value = 0
            for flag_name in re.split(r'[\s,]\+', flag_str):
                flag_name = flag_name.strip()
                if flag_name in flag_map:
                    total_flag_value |= flag_map[flag_name]
            props['flags_val'] = total_flag_value

        mdl_objects[obj_id] = props

    # Regex for rooms
    room_pattern = re.compile(r'#ROOM\s*\{"([^"]+)"(.*?)\}', re.DOTALL)
    for match in room_pattern.finditer(content):
        room_id = match.group(1)
        body = match.group(2)
        props = {}

        desc_match = re.search(r'"([^"]*)"\s*"([^"]*)"', body)
        if desc_match:
            props['longDescription'] = desc_match.group(1).replace('\n', ' ').strip()
            props['shortDescription'] = desc_match.group(2).replace('\n', ' ').strip()

        mdl_rooms[room_id] = props

    return mdl_objects, mdl_rooms


def map_json_flags(js_flag_obj):
    """Maps JSON boolean flags to the MDL flag names for easier comparison."""
    mapping = {
        'isVisible': 'OVISON', 'isReadable': 'READBIT', 'isTakeable': 'TAKEBIT',
        'isDoor': 'DOORBIT', 'isTransparent': 'TRANSBIT', 'isEdible': 'FOODBIT',
        'isNotDescribed': 'NDESCBIT', 'isDrinkable': 'DRINKBIT', 'isContainer': 'CONTBIT',
        'isLight': 'LIGHTBIT', 'isVictim': 'VICBIT', 'isBurnable': 'BURNBIT',
        'isOn': 'FLAMEBIT', 'isTool': 'TOOLBIT', 'isTurnable': 'TURNBIT',
        'isVehicle': 'VEHBIT', 'isFindableFromVehicle': 'FINDMEBIT', 'isAsleep': 'SLEEPBIT',
        'isSearchable': 'SEARCHBIT', 'isSacred': 'SACREDBIT', 'isTieable': 'TIEBIT',
        'isActor': 'ACTORBIT', 'isWeapon': 'WEAPONBIT', 'isFighting': 'FIGHTBIT',
        'isVillain': 'VILLAIN', 'isStaggered': 'STAGGERED'
    }
    val = 0
    for js_flag, mdl_flag in mapping.items():
        if js_flag_obj.get(js_flag, False):
            # This requires the flag_map to be available here
            # This is a simplification; a full implementation would need the map
            pass # val |= flag_map[mdl_flag]
    return val # return calculated value


def compare_data():
    try:
        with open('zork/lcf/defs.63', 'r', encoding='latin-1') as f:
            flag_map = parse_flagword(f.read())
    except Exception as e:
        print(f"Error reading or parsing defs.63: {e}")
        return

    mdl_objects, mdl_rooms = get_mdl_data(flag_map)
    if mdl_objects is None:
        return

    try:
        with open('data/objects.json', 'r') as f:
            js_objects_data = json.load(f)
        with open('data/rooms.json', 'r') as f:
            js_rooms_data = json.load(f)
    except Exception as e:
        print(f"Error reading JSON data: {e}")
        return

    print("--- Object Comparison ---")
    mdl_obj_keys = set(mdl_objects.keys())
    js_obj_keys = set(js_objects_data.keys()) - {'#####'}

    missing_in_js = sorted(list(mdl_obj_keys - js_obj_keys))
    extra_in_js = sorted(list(js_obj_keys - mdl_obj_keys))

    if missing_in_js:
        print("\n[OBJECTS] Missing from objects.json:")
        for obj in missing_in_js:
            print(f"- {obj}")

    if extra_in_js:
        print("\n[OBJECTS] Extra in objects.json (should be removed):")
        for obj in extra_in_js:
            print(f"- {obj}")

    # Simplified property comparison
    for obj_id in sorted(list(mdl_obj_keys.intersection(js_obj_keys))):
        mdl_obj = mdl_objects[obj_id]
        js_obj = js_objects_data[obj_id]

        # Compare description
        if 'description' in mdl_obj and mdl_obj['description'] != js_obj.get('description'):
             if mdl_obj['description'] and js_obj.get('description'): # Ignore empty strings
                print(f"\n[OBJECT: {obj_id}] Description mismatch:")
                print(f"  MDL: '{mdl_obj['description']}'")
                print(f"  JS:  '{js_obj.get('description')}'")

    print("\n\n--- Room Comparison ---")
    mdl_room_keys = set(mdl_rooms.keys())
    js_room_keys = set(js_rooms_data.keys())

    missing_in_js = sorted(list(mdl_room_keys - js_room_keys))
    extra_in_js = sorted(list(js_room_keys - mdl_room_keys))

    if missing_in_js:
        print("\n[ROOMS] Missing from rooms.json:")
        for room in missing_in_js:
            print(f"- {room}")

    if extra_in_js:
        print("\n[ROOMS] Extra in rooms.json (should be removed):")
        for room in extra_in_js:
            print(f"- {room}")

    for room_id in sorted(list(mdl_room_keys.intersection(js_room_keys))):
        mdl_room = mdl_rooms[room_id]
        js_room = js_rooms_data[room_id]

        if 'shortDescription' in mdl_room and mdl_room['shortDescription'] != js_room.get('shortDescription'):
            if mdl_room['shortDescription'] and js_room.get('shortDescription'):
                print(f"\n[ROOM: {room_id}] Short description mismatch:")
                print(f"  MDL: '{mdl_room['shortDescription']}'")
                print(f"  JS:  '{js_room.get('shortDescription')}'")


if __name__ == "__main__":
    compare_data()
