from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .schemas import WeightCreateSchema
from .models import Weight
from src.auth.router import get_current_user
from src.database import get_db

weight_router = APIRouter()

@weight_router.post("/add")
def add_weight(
    payload: WeightCreateSchema,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    try:
        new_weight = Weight(
            weight=payload.weight,
            height=payload.height,
            user_id=user["id"]
        )

        db.add(new_weight)
        db.commit()
        db.refresh(new_weight)

        return {
            "success": True,
            "message": "Weight added",
            "weight_id": new_weight.id
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
