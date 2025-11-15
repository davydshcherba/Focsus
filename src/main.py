from fastapi import APIRouter, FastAPI
from src.auth.router import auth_router

app = FastAPI()




app.include_router(auth_router)