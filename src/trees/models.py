from sqlmodel import SQLModel, Field

class Tree(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    height: float
    user_id: int = Field(foreign_key="user.id")