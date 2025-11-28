from pydantic import BaseModel

class UserLoginSchema(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    is_admin: bool
    points: int

    class Config:
        from_attributes = True
