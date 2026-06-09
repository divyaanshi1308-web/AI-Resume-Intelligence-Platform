import re


def parse_education(lines):

    result = {
        "degree": None,
        "university": None,
        "school": None,
        "score": None,
        "raw": lines
    }

    for line in lines:

        line_lower = line.lower()

        if (
            "b.e" in line_lower
            or "b.tech" in line_lower
            or "btech" in line_lower
        ):
            result["degree"] = line

        elif "university" in line_lower:
            result["university"] = line

        elif "school" in line_lower:
            result["school"] = line

        score_match = re.search(
            r"\d+(\.\d+)?%",
            line
        )

        if score_match:
            result["score"] = score_match.group()

    return result