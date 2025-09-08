import json

# List of objects to remove, from the output of the comparison script
extra_objects = [
    "ATABL", "AVIAT", "BAT", "BLBUT", "BODIE", "BOLT", "BRBUT", "BUBBL",
    "BUTTO", "CORPS", "DAM", "DOOR", "ENGRA", "ETCH1", "ETCH2", "EVERY",
    "FDOOR", "GRAT1", "GRAT2", "HANDS", "HPOLE", "LEAK", "LUNGS", "MSWIT",
    "POSTS", "PRAYE", "RAILI", "RAINB", "RBUTT", "RNBUT", "SAILO", "SDOOR",
    "SQBUT", "TDOOR", "TEETH", "TRBUT", "VALUA", "WALL", "WDOOR", "WIND1",
    "WIND2", "YBUTT"
]

# Definition for the new ADVER object
adver_obj = {
    "id": "ADVER",
    "names": ["leaflet", "pamphlet", "booklet"],
    "description": "small leaflet",
    "initialDescription": "There is a small leaflet here.",
    "flags": {
        "isBurnable": True,
        "isReadable": True,
        "isTakeable": True,
        "isVisible": True
    },
    "size": 2,
    "canContain": "MAILB"
}

try:
    # Read the existing objects
    with open('data/objects.json', 'r') as f:
        objects = json.load(f)

    # Add the new object
    objects["ADVER"] = adver_obj

    # Remove all the extra objects
    for obj_id in extra_objects:
        if obj_id in objects:
            del objects[obj_id]

    # Sort the objects by ID for consistency
    sorted_objects = dict(sorted(objects.items()))

    # Write the updated objects back to the file
    with open('data/objects.json', 'w') as f:
        json.dump(sorted_objects, f, indent=4)

    print("objects.json has been updated successfully.")
    print(f"Added: ADVER")
    print(f"Removed: {len(extra_objects)} objects.")

except Exception as e:
    print(f"An error occurred: {e}")
