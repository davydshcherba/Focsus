from pydantic import BaseModel

class WeightCreateSchema(BaseModel):
    weight: float
    height: float
