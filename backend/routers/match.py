from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.jd_match_service import match_resume_to_jd

router = APIRouter()


class MatchRequest(BaseModel):
    resume_skills: list[str]
    job_description: str


@router.post("/match")
def match_resume(request: MatchRequest):

    result = match_resume_to_jd(
        request.resume_skills,
        request.job_description
    )

    return result