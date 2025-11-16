from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..database import get_db, engine
from ..auth.models import User
from ..auth.schemas import UserLoginSchema
from ..config import *
auth_router = APIRouter()

@auth_router.post("/login")
def login(credentials: UserLoginSchema, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.username == credentials.username, # type: ignore
        User.password == credentials.password # type: ignore
    ).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = security.create_access_token(uid=str(user.id))
    response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
    return {"access": token}

@auth_router.post("/register")
def register(user: UserLoginSchema, db: Session = Depends(get_db)):
    # Перевірка чи користувач вже існує
    existing_user = db.query(User).filter(User.username == user.username).first() # type: ignore
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit() 
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@auth_router.get("/users")
def get_users(
    db: Session = Depends(get_db),
    admin_user = Depends(security.access_token_required)

):
    users = db.query(User).all()
    return users