import pdfplumber
import io
import re
from backend.data.skills import SKILLS

def extract_name(text):

    lines = text.split("\n")

    for line in lines:

        line = line.strip()

        if len(line.split()) >= 2 and len(line) < 40:
            return line

    return "Not Found"

def extract_skills(text):

    found_skills = []

    text_lower = text.lower()

    for skill in SKILLS:

        if skill.lower() in text_lower:
            found_skills.append(skill)

    return sorted(list(set(found_skills)))

def extract_text_from_pdf(pdf_bytes):

    text = ""

    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:

        total_pages = len(pdf.pages)

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    # Name
    name = extract_name(text)

    # Skills
    skills = extract_skills(text)
        
    # Email
    email_match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    email = email_match.group() if email_match else "Not Found"

    # Phone
    phone_match = re.search(
        r'(\+91[\-\s]?)?[6-9]\d{9}',
        text
    )

    phone = phone_match.group() if phone_match else "Not Found"

    # LinkedIn
    linkedin_match = re.search(
        r'linkedin\.com/in/[A-Za-z0-9\-]+',
        text,
        re.IGNORECASE
    )

    linkedin = linkedin_match.group() if linkedin_match else "Not Found"

    # GitHub
    github_match = re.search(
        r'github\.com/[A-Za-z0-9\-_]+',
        text,
        re.IGNORECASE
    )

    github = github_match.group() if github_match else "Not Found"

    return {
        "name": name,
        "skills": skills,
        "pages": total_pages,
        "characters": len(text),
        "text": text,
        "email": email,
        "phone": phone,
        "linkedin": linkedin,
        "github": github
    }