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

    result = extract_text_from_pdf(pdf_bytes)

    return {
        "filename": file.filename,
        "name": result["name"],
        "skills": result["skills"],
        "email": result["email"],
        "phone": result["phone"],
        "linkedin": result["linkedin"],
        "github": result["github"],
        "pages": result["pages"],
        "characters": result["characters"],
        "preview": result["text"][:150]
    }