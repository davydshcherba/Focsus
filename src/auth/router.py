from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..database import get_db
from .models import User
from .schemas import UserLoginSchema
from .utils import hash_password, verify_password
from ..config import security, config

auth_router = APIRouter()

@auth_router.post("/register")
def register(user: UserLoginSchema, db: Session = Depends(get_db)):
    try:
        existing_user = db.query(User).filter(User.username == user.username).first() # type: ignore
        
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")
        
        
        hashed_password = hash_password(user.password)
        
        new_user = User(username=user.username, password=hashed_password)
        db.add(new_user)
        db.commit() 
        db.refresh(new_user)
        
        return {
            "success": True,
            "message": "User registered successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"Error during registration: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")


@auth_router.post("/login")
def login(credentials: UserLoginSchema, response: Response, db: Session = Depends(get_db)):
    print(f"=== LOGIN ATTEMPT ===")
    print(f"Username: {credentials.username}")
    
    try:
        user = db.query(User).filter(User.username == credentials.username).first() # type: ignore
        
        if not user:
            print("User not found!")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        print(f"User found: {user.username}")
        
        if not verify_password(credentials.password, user.password):
            print("Password verification failed!")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        print("Password verified successfully")
        
        token = security.create_access_token(uid=str(user.id))
        print(f"Token created: {token[:20]}...")
        
        response.set_cookie(
            key=config.JWT_ACCESS_COOKIE_NAME,
            value=token,
            httponly=True,
            max_age=3600,  
            samesite="lax",
            secure=False  
        )
        
        print("Cookie set successfully")
        print("Login successful!")
        
        
        return {
            "success": True,
            "message": "Login successful",
            "access_token": token,
            "token_type": "bearer"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during login: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")


@auth_router.get("/users")
def get_users(
    db: Session = Depends(get_db),
    admin_user = Depends(security.access_token_required)
):
    users = db.query(User).all()
    return users


@auth_router.get("/me")
def get_current_user(
    token_payload = Depends(security.access_token_required),
    db: Session = Depends(get_db)
):

    user_id = int(token_payload.sub)  
    
    user = db.query(User).filter(User.id == user_id).first()  # type: ignore
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "success": True,
        "user": {
            "id": user.id,
            "username": user.username,
            "is_admin": user.is_admin,
            "points": user.points,
        }
    }
    
@auth_router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key=config.JWT_ACCESS_COOKIE_NAME)
    return {
        "success": True,
        "message": "Logged out successfully"
    }
