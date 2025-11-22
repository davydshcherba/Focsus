from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from src.database import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False)
    points = Column(Integer, default=0)

    # Relationship → Weight
    weights = relationship("Weight", back_populates="user", cascade="all, delete")
