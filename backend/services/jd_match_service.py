from backend.data.skills import SKILLS
import re


def match_resume_to_jd(resume_skills, job_description):

    jd_skills = []

    for skill in SKILLS:

        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, job_description, re.IGNORECASE):
            jd_skills.append(skill)

    matched_skills = []

    for skill in resume_skills:

        if skill in jd_skills:
            matched_skills.append(skill)

    missing_skills = []

    for skill in jd_skills:

        if skill not in resume_skills:
            missing_skills.append(skill)

    if len(jd_skills) == 0:
        match_score = 0
    else:
        match_score = round(
            len(matched_skills) / len(jd_skills) * 100
        )

    return {
        "match_score": match_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }