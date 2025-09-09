import json
import re

def parse_flagword(content):
    """Parses <FLAGWORD ...> definitions to get bit values."""
    flags = {}
    bit_value = 1
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

    # Regex for objects from <ADD-OBJECT ...> and #OBJECT
    obj_pattern = re.compile(
        r'(?:<ADD-OBJECT\s+)?#OBJECT\s*\{"([^"]+)"\s*([^}]*)\}\s*(?:\[([^\]]+)\]\s*(?:\[([^\]]+)\])?)?',
        re.DOTALL
    )

    for match in obj_pattern.finditer(content):
        obj_id = match.group(1)
        body = match.group(2)
        names_str = match.group(3)
        adjs_str = match.group(4)

        props = {
            'names': [],
            'adjectives': []
        }

        if names_str:
            props['names'] = [name.strip().strip('"') for name in names_str.split()]
        if adjs_str:
            props['adjectives'] = [adj.strip().strip('"') for adj in adjs_str.split()]

        # Descriptions
        desc_match = re.search(r'"([^"]*)"\s*"([^"]*)"(?:\s*"([^"]*)")?', body)
        if desc_match:
            props['initialDescription'] = desc_match.group(1).replace('\n', ' ').strip()
            props['description'] = desc_match.group(2).replace('\n', ' ').strip()
            if desc_match.group(3):
                props['longDescription'] = desc_match.group(3).replace('\n', ' ').strip()

        # Flags
        flags_match = re.search(r'%<([,\w\s\+]+)>', body)
        if flags_match:
            props['flags_str'] = flags_match.group(1).replace(',', ' ').split()

        # Numeric properties (value, size, capacity)
        numeric_pattern = re.compile(r'>\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)')
        numeric_match = numeric_pattern.search(body)
        if numeric_match:
            props['value'] = int(numeric_match.group(2))
            props['size'] = int(numeric_match.group(4))
            # Note: MDL format has more numbers, this is a simplification

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
    js_obj_keys = set(js_objects_data.keys()) - {'#####', 'FDOOR', 'WDOOR', 'TDOOR', 'SDOOR', 'GRAT1', 'GRAT2', 'MSWIT', 'BOLT', 'EVERY', 'VALUA', 'SAILO', 'TEETH', 'WALL', 'GRUE', 'HANDS', 'LUNGS', 'AVIAT', 'RBUTT', 'YBUTT', 'BLBUT', 'BRBUT', 'BAT', 'RAINB', 'HPOLE', 'CORPS', 'BODIE', 'DAM', 'RAILI', 'BUTTO', 'BUBBL', 'LEAK'} # Ignore player and some uninteresting objects

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

    for obj_id in sorted(list(mdl_obj_keys.intersection(js_obj_keys))):
        mdl_obj = mdl_objects[obj_id]
        js_obj = js_objects_data[obj_id]
        discrepancies = []

        # Compare names
        mdl_names = set([name.lower() for name in mdl_obj.get('names', [])])
        js_names = set([name.lower() for name in js_obj.get('names', [])])
        if mdl_names and js_names and not mdl_names.issubset(js_names):
             discrepancies.append(f"Names: MDL has {mdl_names - js_names} which are not in JS.")

        # Compare descriptions
        for prop in ['description', 'initialDescription', 'longDescription']:
            mdl_desc = mdl_obj.get(prop, '').strip()
            js_desc = js_obj.get(prop, '').strip()
            if mdl_desc and js_desc and mdl_desc != js_desc:
                discrepancies.append(f"{prop}: MDL='{mdl_desc}', JS='{js_desc}'")

        # Compare numeric properties
        for prop in ['value', 'size']:
            mdl_val = mdl_obj.get(prop)
            js_val = js_obj.get(prop)
            if mdl_val is not None and js_val is not None and mdl_val != js_val:
                discrepancies.append(f"{prop}: MDL={mdl_val}, JS={js_val}")

        if discrepancies:
            print(f"\n[OBJECT: {obj_id}] Discrepancies found:")
            for d in discrepancies:
                print(f"  - {d}")

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
        discrepancies = []

        for prop in ['shortDescription', 'longDescription']:
            mdl_desc = mdl_room.get(prop, '').strip()
            js_desc = js_room.get(prop, '').strip()
            if mdl_desc and js_desc and mdl_desc != js_desc:
                discrepancies.append(f"{prop}: MDL='{mdl_desc}', JS='{js_desc}'")

        if discrepancies:
            print(f"\n[ROOM: {room_id}] Discrepancies found:")
            for d in discrepancies:
                print(f"  - {d}")


if __name__ == "__main__":
    compare_data()
