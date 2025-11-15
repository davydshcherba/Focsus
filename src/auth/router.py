from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.models import User
from ..auth.schemas import UserCreateSchema, UserLoginSchema
from ..config import *

auth_router = APIRouter()


@auth_router.post("/login")
def login(credentials: UserLoginSchema, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == credentials.username).first()
    if not user or user.password != credentials.password: # type: ignore
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = security.create_access_token(uid=str(user.id))
    response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
    return {"access": token}

