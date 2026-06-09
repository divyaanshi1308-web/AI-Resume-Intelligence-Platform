from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.pdf_service import extract_text_from_pdf
from backend.services.jd_match_service import match_resume_to_jd

router = APIRouter()


class MatchRequest(BaseModel):
    job_description: str

@router.post("/match")
def match_resume(request: MatchRequest):

    try:

        with open("latest_resume.pdf", "rb") as f:
            pdf_bytes = f.read()

        resume_data = extract_text_from_pdf(pdf_bytes)

        result = match_resume_to_jd(
            resume_data["skills"],
            request.job_description
        )

        return result

    except Exception as e:

        return {
            "error": str(e)
        }