import json
import os

def clean_transcript(raw_text):
    """
    Cleans the raw transcript text by:
    - Adding a '>' prompt before lines that are commands.
    - Removing blank lines.
    - Standardizing line endings.
    """
    cleaned_lines = []
    lines = raw_text.strip().replace('\r\n', '\n').split('\n')
    for line in lines:
        stripped_line = line.strip()
        if not stripped_line:
            continue
        # This is a simple heuristic: if a line doesn't start with a known
        # non-command prefix, assume it's a command and add the prompt.
        # This logic was flawed and is being replaced by manual cleaning.
        # The new assumption is the input file is *already* cleaned.
        cleaned_lines.append(stripped_line)
    return '\n'.join(cleaned_lines)


def parse_cleaned_transcript(cleaned_text):
    """
    Parses a cleaned transcript into a structured list of command/output pairs.
    Assumes the transcript has '>' prompts before every command.
    """
    interactions = []
    current_command = None
    current_output = []

    for line in cleaned_text.split('\n'):
        line = line.strip()
        if not line:
            continue

        if line.startswith('>'):
            # If we have a pending command, save it
            if current_command is not None:
                interactions.append({
                    "command": current_command,
                    "expected_output": '\n'.join(current_output).strip()
                })

            current_command = line[1:].strip()
            current_output = []
        elif current_command is not None:
            current_output.append(line)

    # Add the last interaction
    if current_command is not None:
        interactions.append({
            "command": current_command,
            "expected_output": '\n'.join(current_output).strip()
        })

    return interactions

def main():
    """
    Main function to find raw transcripts, parse them, and save them as JSON.
    """
    transcript_dir = os.path.join(os.path.dirname(__file__), 'transcripts')
    output_dir = os.path.join(os.path.dirname(__file__), 'parsed_transcripts')

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(transcript_dir):
        if filename.endswith('.txt'):
            raw_path = os.path.join(transcript_dir, filename)

            with open(raw_path, 'r', encoding='utf-8') as f:
                raw_content = f.read()

            # The cleaning step is now just reading the pre-cleaned file
            # cleaned_content = clean_transcript(raw_content)

            parsed_data = parse_cleaned_transcript(raw_content)

            json_filename = os.path.splitext(filename)[0] + '.json'
            json_path = os.path.join(output_dir, json_filename)

            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(parsed_data, f, indent=2)

            print(f"Successfully parsed '{filename}' to '{json_filename}'")

if __name__ == '__main__':
    main()
