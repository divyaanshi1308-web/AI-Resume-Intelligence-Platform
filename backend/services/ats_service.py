import re


def calculate_ats_score(result):

    score = 0

    # Contact Information (20)
    if result["email"] != "Not Found":
        score += 10

    if result["phone"] != "Not Found":
        score += 10

    # Professional Links (10)
    if result["linkedin"] != "Not Found":
        score += 5

    if result["github"] != "Not Found":
        score += 5

    # Skills (20)
    skill_count = len(result["skills"])

    if skill_count >= 10:
        score += 20
    elif skill_count >= 7:
        score += 15
    elif skill_count >= 4:
        score += 10
    elif skill_count > 0:
        score += 5

    # Education (15)
    if result["education"]["degree"]:
        score += 10

    if result["education"]["university"]:
        score += 5

    # Experience (15)
    experience_count = len(result["experience"])

    if experience_count >= 3:
        score += 15
    elif experience_count >= 1:
        score += 10

    # Projects (15)
    project_count = len(result["projects"])

    if project_count >= 4:
        score += 15
    elif project_count >= 2:
        score += 10
    elif project_count >= 1:
        score += 5

    # Resume Length (5)
    chars = result["characters"]

    if 1000 <= chars <= 5000:
        score += 5

    return min(score, 100)