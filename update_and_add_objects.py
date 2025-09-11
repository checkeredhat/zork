import json
import re

def parse_user_objects(filename="user_objects.txt"):
    with open(filename, 'r') as f:
        content = f.read()

    objects = []
    # Split content into individual object blocks
    object_blocks = content.strip().split("Object: ")[1:]

    for block in object_blocks:
        obj = {}
        # OID
        oid_match = re.search(r'OID: "([^"]+)"', block)
        if not oid_match:
            continue
        obj_id = oid_match.group(1)
        obj['id'] = obj_id

        # Name from the "Object:" line
        name_match = re.search(r'"([^"]+)"', block.split('\n')[0])
        if name_match:
            obj['name'] = name_match.group(1).strip()

        # Attributes
        onames_match = re.search(r'ONAMES: (\[[^\]]+\]|"[^"]+")', block)
        if onames_match:
            names_str = onames_match.group(1)
            if names_str.startswith('['):
                obj['synonyms'] = [s.strip().replace('"', '') for s in names_str.strip('[]').split(',')]
            else:
                obj['synonyms'] = [names_str.strip('"')]

        odesc1_match = re.search(r'ODESC1: "([^"]*)"', block)
        if odesc1_match and odesc1_match.group(1) != "(Empty)":
            obj['initialDescription'] = odesc1_match.group(1).strip()

        odesc2_match = re.search(r'ODESC2: "([^"]*)"', block)
        if odesc2_match and odesc2_match.group(1) != "(Empty)":
            obj['description'] = odesc2_match.group(1).strip()

        odesco_match = re.search(r'ODESCO: "([^"]*)"', block)
        if odesco_match and odesco_match.group(1) != "(Not specified)":
            obj['longDescription'] = odesco_match.group(1).strip()

        oaction_match = re.search(r'OACTION: ([^\s\n]+)', block)
        if oaction_match and "(Not specified)" not in oaction_match.group(1) and "behavior" not in oaction_match.group(1):
             obj['action'] = oaction_match.group(1).strip()

        ocontents_match = re.search(r'OCONTENTS: \(([^)]*)\)', block)
        if ocontents_match:
            contents_str = ocontents_match.group(1)
            if "FIND-OBJ" in contents_str:
                obj['contents'] = [c.strip() for c in re.findall(r'{"([^"}]+)"}', contents_str)]

        ocan_match = re.search(r'OCAN: #FIND-OBJ {"([^"}]+)"}', block)
        if ocan_match:
            obj['canBeContainedBy'] = ocan_match.group(1).strip()

        olight_match = re.search(r'OLIGHT\?: (-?\d+)', block)
        if olight_match:
            obj['light'] = int(olight_match.group(1))

        ofval_match = re.search(r'OFVAL: (\d+)', block)
        if ofval_match:
            obj['value'] = int(ofval_match.group(1))

        otval_match = re.search(r'OTVAL: (\d+)', block)
        if otval_match:
            obj['trophyValue'] = int(otval_match.group(1))

        osize_match = re.search(r'OSIZE: (\d+)', block)
        if osize_match:
            obj['size'] = int(osize_match.group(1))

        ocapac_match = re.search(r'OCAPAC: (\d+)', block)
        if ocapac_match:
            obj['capacity'] = int(ocapac_match.group(1))

        oadjs_match = re.search(r'OADJS: (\[[^\]]+\])', block)
        if oadjs_match:
            adjs_str = oadjs_match.group(1)
            obj['adjectives'] = [s.strip().replace('"', '') for s in adjs_str.strip('[]').split(',')]

        oread_match = re.search(r'OREAD: \(Contains text: "([^"]+)"\)', block)
        if oread_match:
            obj['text'] = oread_match.group(1).strip()

        # Flags
        flags_str_match = re.search(r'Flags:\n((?:\s+\w+ \(\w+\)\n?)+)', block)
        if flags_str_match:
            flags_str = flags_str_match.group(1)
            flags_match = re.findall(r'(\w+ ?\w+) \([\w\?]+\)', flags_str)
            if flags_match:
                flags = {}
                for flag in flags_match:
                    flag = flag.strip()
                    # A simple mapping from the user's flag names to the JSON flag names
                    flag_map = {
                        "Visible": "isVisible", "Takeable": "isTakeable", "Container": "isContainer",
                        "Flammable": "isFlammable", "Edible": "isEdible", "Try Take Bit": "isTryTakeable",
                        "Burnable": "isBurnable", "Transparent": "isTransparent", "Drinkable": "isDrinkable",
                        "Tieable": "isTieable", "Weapon": "isWeapon", "Not Describable": "isNotDescribed",
                        "Victim": "isVictim", "Villain": "isVillain", "Tool": "isTool",
                        "Sacred": "isSacred", "On Fire": "isLight", "Readable": "isReadable",
                        "Vehicle": "isVehicle", "Open": "isOpen", "Searchable": "isSearchable",
                        "Actor": "isActor"
                    }
                    if flag in flag_map:
                        flags[flag_map[flag]] = True
                obj['flags'] = flags

        objects.append(obj)

    return objects

def update_and_add_objects():
    new_objects = parse_user_objects()

    try:
        with open('data/objects.json', 'r') as f:
            existing_objects = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_objects = {}

    for new_obj in new_objects:
        obj_id = new_obj['id']
        # If object exists, remove it first to avoid merging issues with lists
        if obj_id in existing_objects:
            del existing_objects[obj_id]

        existing_objects[obj_id] = new_obj

    # Sort by ID
    sorted_objects = dict(sorted(existing_objects.items()))

    with open('data/objects.json', 'w') as f:
        json.dump(sorted_objects, f, indent=4)

    print(f"Updated and added {len(new_objects)} objects to data/objects.json")

if __name__ == "__main__":
    update_and_add_objects()
