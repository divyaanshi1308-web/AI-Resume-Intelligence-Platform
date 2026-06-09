def parse_experience(lines):

    experiences = []

    current_experience = ""

    for line in lines:

        if "present" in line.lower():

            if current_experience:
                experiences.append(current_experience.strip())

            current_experience = line

        else:
            current_experience += " " + line

    if current_experience:
        experiences.append(current_experience.strip())

    return experiences