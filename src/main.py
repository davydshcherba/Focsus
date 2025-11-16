from fastapi import APIRouter, FastAPI
from src.auth.router import auth_router
from sqlmodel import SQLModel, Session
from src.database import engine
from src.trees.router import tree_router

app = FastAPI()


SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


app.include_router(auth_router, tags=["auth"])

app.include_router(tree_router, tags=["trees"])