import re


def match_resume_to_jd(resume_skills, job_description):

    jd_words = set(
        re.findall(
            r"[A-Za-z\+\#\.]+",
            job_description
        )
    )

    matched_skills = []
    missing_skills = []

    for skill in resume_skills:

        if skill.lower() in job_description.lower():
            matched_skills.append(skill)

    for word in jd_words:

        if (
            len(word) > 2
            and word.lower()
            not in [s.lower() for s in resume_skills]
        ):
            missing_skills.append(word)

    total_required = (
        len(matched_skills)
        + len(missing_skills)
    )

    if total_required == 0:
        match_score = 0
    else:
        match_score = round(
            len(matched_skills)
            / total_required
            * 100
        )

    return {
        "match_score": match_score,
        "matched_skills": matched_skills,
        "missing_skills": sorted(
            list(set(missing_skills))
        )[:15]
    }