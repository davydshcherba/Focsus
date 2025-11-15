from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import engine, get_db, Base  # Remove the dot
from .auth.models import User  # Remove the dot

Base.metadata.create_all(bind=engine)

app = FastAPI()

