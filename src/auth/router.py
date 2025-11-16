from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from sqlmodel import SQLModel
from ..database import get_db, engine
from ..auth.models import User
from ..auth.schemas import UserLoginSchema
from ..config import *

auth_router = APIRouter()
# Code above omitted 👆


SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session




@auth_router.post("/login")
def login(credentials: UserLoginSchema, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == credentials.username, # type: ignore
                                User.password == credentials.password).first() # type: ignore
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = security.create_access_token(uid=str(user.id))
    response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
    return {"access": token}

@auth_router.post("/register")
def reguster(user: UserLoginSchema, db: Session = Depends(get_db)):
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)  # type: ignore
    db.commit() 
    db.refresh(new_user)
    return {"message": "User registered successfully"}

