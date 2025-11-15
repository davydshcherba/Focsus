from fastapi import FastAPI, Depends, HTTPException
from authx import AuthX, AuthXConfig, RequestToken
from pydantic import BaseModel
from fastapi.responses import Response

app = FastAPI()

config = AuthXConfig()
config.JWT_SECRET_KEY = "your_secret_key"
config.JWT_ACCESS_COOKIE_NAME = "access_token"
config.JWT_TOKEN_LOCATION = ["cookies"]

security = AuthX(config=config)

class UserLoginSchema(BaseModel):
    id: int
    username: str
    password: str

@app.post('/login')
def login(credentials: UserLoginSchema,response:Response):
    if credentials.username == "admin" and credentials.password == "admin":
        token = security.create_access_token(uid="123455689")
        response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
        return {"access": token}
    raise HTTPException(status_code=401, detail={"message": "Invalid credentials"})

@app.get("/protected", dependencies=[Depends(security.access_token_required)])
def protected():
    return {"message": "You are authorized to access this route"}