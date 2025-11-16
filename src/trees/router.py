from fastapi import APIRouter, Depends
from .models import Tree
from sqlalchemy.orm import Session
from ..database import get_db
from ..config import *

tree_router = APIRouter()

@tree_router.get("/trees")
def get_users(
    db: Session = Depends(get_db)
):
    trees = db.query(Tree).all()
    return trees