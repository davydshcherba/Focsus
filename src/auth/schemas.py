from pydantic import BaseModel

class UserLoginSchema(BaseModel):
    username: str
    password: str
