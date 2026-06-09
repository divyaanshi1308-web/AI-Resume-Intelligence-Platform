from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services.pdf_service import extract_text_from_pdf

router = APIRouter()


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    pdf_bytes = await file.read()

    with open("latest_resume.pdf", "wb") as f:
        f.write(pdf_bytes)

    result = extract_text_from_pdf(pdf_bytes)

    return {
        "filename": file.filename,
        "name": result["name"],
        "email": result["email"],
        "phone": result["phone"],
        "linkedin": result["linkedin"],
        "github": result["github"],
        "skills": result["skills"],
        "education": result["education"],
        "experience": result["experience"],
        "projects": result["projects"],
        "ats_score": result["ats_score"],
        "pages": result["pages"],
        "characters": result["characters"],
        "preview": result["text"][:150]
    }