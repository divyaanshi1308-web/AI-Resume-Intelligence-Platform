def calculate_ats_score(result):

    score = 0

    if result["name"] != "Not Found":
        score += 10

    if result["email"] != "Not Found":
        score += 15

    if result["phone"] != "Not Found":
        score += 15

    if result["linkedin"] != "Not Found":
        score += 10

    if result["github"] != "Not Found":
        score += 10

    score += min(len(result["skills"]) * 3, 20)

    if result["education"]["degree"]:
        score += 10

    if len(result["projects"]) > 0:
        score += 5

    if len(result["experience"]) > 0:
        score += 5

    return min(score, 100)