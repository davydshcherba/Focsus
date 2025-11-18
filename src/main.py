from fastapi import FastAPI
from sqlmodel import SQLModel, Session
from .auth.router import auth_router
from .database import engine
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


app.include_router(auth_router, tags=["auth"])
