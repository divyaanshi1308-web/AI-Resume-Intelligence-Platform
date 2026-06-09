import pdfplumber
import io
import re


def extract_text_from_pdf(pdf_bytes):

    text = ""

    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:

        total_pages = len(pdf.pages)

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    email_match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    email = email_match.group() if email_match else "Not Found"

    phone_match = re.search(
    r'(\+91[\-\s]?)?[6-9]\d{9}',
    text
)

phone = phone_match.group() if phone_match else "Not Found"


linkedin_match = re.search(
    r'linkedin\.com/in/[A-Za-z0-9\-]+',
    text
)

linkedin = linkedin_match.group() if linkedin_match else "Not Found"


github_match = re.search(
    r'github\.com/[A-Za-z0-9\-_]+',
    text
)

github = github_match.group() if github_match else "Not Found"

    return {
    "pages": total_pages,
    "characters": len(text),
    "text": text,
    "email": email,
    "phone": phone,
    "linkedin": linkedin,
    "github": github
}