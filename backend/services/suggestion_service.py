def generate_suggestions(missing_skills):

    suggestions = []

    for skill in missing_skills:

        suggestions.append(
            f"Consider learning {skill} to improve job compatibility."
        )

    if len(missing_skills) == 0:

        suggestions.append(
            "Great match! Your resume already covers all required skills."
        )

    return suggestions