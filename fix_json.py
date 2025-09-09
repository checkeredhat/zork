import json

with open('data/objects.json', 'r') as f:
    data = json.load(f)

changes = {
    "ADVER": {"description": "leaflet"},
    "AXE": {"description": "bloody axe"},
    "BOTTL": {"initialDescription": "A clear glass bottle is here."},
    "BRICK": {"description": "brick", "value": 0},
    "CROWN": {"initialDescription": "Lord Dimwit's crown is here."},
    "FOOD": {"description": ".lunch"},
    "JADE": {"description": "jade figurine"},
    "LAMP": {"initialDescription": "There is a brass lantern (battery-powered) here."},
    "MAILB": {"description": "mailbox"},
    "ROPE": {"initialDescription": "There is a large coil of rope here.", "size": 10},
    "SBAG": {"initialDescription": "A sandwich bag is here."},
    "STICK": {"initialDescription": "There is a broken sharp stick here."},
    "STILL": {"description": "stilletto"},
    "SWORD": {"value": 0},
    "TOMB": {"initialDescription": "There is a tomb here, made of the finest marble, and large enough for four headless corpses. On one end is the cryptic inscription:\n\t\t    \n\t\t      \"Feel Free.\""}
}

for obj_id, props in changes.items():
    if obj_id in data:
        for prop, value in props.items():
            data[obj_id][prop] = value

with open('data/objects.json', 'w') as f:
    json.dump(data, f, indent=4)
