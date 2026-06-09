def calculate_ats_score(result):

    score = 0

    # Contact Information
    if result["email"] != "Not Found":
        score += 10

    if result["phone"] != "Not Found":
        score += 10

    # Professional Links
    if result["linkedin"] != "Not Found":
        score += 5

    if result["github"] != "Not Found":
        score += 5

    # Skills
    skill_count = len(result["skills"])

    if skill_count >= 10:
        score += 20
    elif skill_count >= 7:
        score += 15
    elif skill_count >= 4:
        score += 10
    elif skill_count > 0:
        score += 5

    # Education
    if result["education"].get("degree"):
        score += 10

    if result["education"].get("university"):
        score += 5

    # Experience
    experience_count = len(result["experience"])

    if experience_count >= 3:
        score += 15
    elif experience_count >= 1:
        score += 10

    # Projects
    project_count = len(result["projects"])

    if project_count >= 4:
        score += 15
    elif project_count >= 2:
        score += 10
    elif project_count >= 1:
        score += 5

    # Resume Length
    chars = result.get("characters", 0)

    if 1000 <= chars <= 5000:
        score += 5

    return min(score, 100)