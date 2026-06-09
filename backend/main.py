from fastapi import FastAPI

from backend.routers.health import router as health_router
from backend.routers.upload import router as upload_router
from backend.routers.match import router as match_router

app = FastAPI()


@app.get("/")
def home():
    return {"message": "AI Resume Intelligence Platform"}


app.include_router(health_router)
app.include_router(upload_router)
app.include_router(match_router)