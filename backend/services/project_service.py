def parse_projects(lines):

    projects = []

    for line in lines:

        line = line.strip()

        if not line:
            continue

        if (
            "present" in line.lower()
            or "2024" in line
            or "2025" in line
            or "2026" in line
        ):
            projects.append(line)

    return projects