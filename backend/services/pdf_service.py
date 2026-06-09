import pdfplumber
import io
import re
from backend.data.skills import SKILLS
from backend.data.education_keywords import EDUCATION_KEYWORDS
from backend.data.section_headers import SECTION_HEADERS
from backend.services.education_service import parse_education
from backend.services.experience_service import parse_experience
from backend.services.project_service import parse_projects
from backend.services.ats_service import calculate_ats_score

def extract_name(text):

    lines = text.split("\n")

    for line in lines:

        line = line.strip()

        if len(line.split()) >= 2 and len(line) < 40:
            return line

    return "Not Found"

def extract_sections(text):

    sections = {}

    lines = text.split("\n")

    current_section = "other"

    sections[current_section] = []

    for line in lines:

        line_lower = line.strip().lower()

        found_section = None

        for section_name, headers in SECTION_HEADERS.items():

            if line_lower in [header.lower() for header in headers]:

                found_section = section_name
                break

        if found_section:

            current_section = found_section

            if current_section not in sections:
                sections[current_section] = []

        else:

            sections[current_section].append(line)

    return sections

def extract_skills(text):

    found_skills = []

    for skill in SKILLS:

        pattern = r'\b' + re.escape(skill) + r'\b'

        if re.search(pattern, text, re.IGNORECASE):
            found_skills.append(skill)

    return sorted(list(set(found_skills)))

def extract_education(text):

    education_lines = []

    lines = text.split("\n")

    education_keywords = [
        "university",
        "college",
        "school",
        "b.tech",
        "btech",
        "b.e",
        "be",
        "m.tech",
        "mtech",
        "cgpa",
        "%"
    ]

    blacklist = [
        "technical team member",
        "codechef",
        "campus chapter",
        "evaluated behavior",
        "project",
        "experience"
    ]

    for line in lines:

        line_clean = line.strip()
        line_lower = line_clean.lower()

        if any(word in line_lower for word in blacklist):
            continue

        if any(keyword in line_lower for keyword in education_keywords):
            education_lines.append(line_clean)

    return sorted(list(set(education_lines)))

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

    #Section
    sections = extract_sections(text)

    #Experience
    experience = parse_experience(
    sections.get("experience", [])
    )
    
    #Project
    projects = parse_projects(
    sections.get("projects", [])
    )
    
    # Skills
    skills_text = "\n".join(
    sections.get("skills", [])
    )
    skills = extract_skills(skills_text)
    
    #Education
    education_lines = sections.get("education", [])
    education = parse_education(education_lines)   
    
    # Email
    email_match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )
    email = email_match.group() if email_match else "Not Found"

    # Phone
    clean_text = text.replace(" ", "")
    phone_match = re.search(
        r'(\+91[\-\s]?)?[6-9]\d{9}',
        clean_text
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

    result_data = {
    "name": name,
    "email": email,
    "phone": phone,
    "linkedin": linkedin,
    "github": github,
    "skills": skills,
    "education": education,
    "experience": experience,
    "projects": projects
    }

    ats_score = calculate_ats_score(result_data)
    
    return {
        "name": name,
        "sections": sections,
        "skills": skills,
        "education": education,
        "experience": experience,
        "projects": projects,
        "ats_score": ats_score,
        "pages": total_pages,
        "characters": len(text),
        "text": text,
        "email": email,
        "phone": phone,
        "linkedin": linkedin,
        "github": github
    }