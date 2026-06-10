from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.health import router as health_router
from backend.routers.upload import router as upload_router
from backend.routers.match import router as match_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ai-resume-intelligence-platform-ecru.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "AI Resume Intelligence Platform"
    }

app.include_router(health_router)
app.include_router(upload_router)
app.include_router(match_router)