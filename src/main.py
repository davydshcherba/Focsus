from fastapi import FastAPI
from sqlmodel import SQLModel, Session
from .auth.router import auth_router
from .database import engine
from .trees.router import tree_router
import uvicorn

app = FastAPI()


SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


app.include_router(auth_router, tags=["auth"])
app.include_router(tree_router, tags=["trees"])

