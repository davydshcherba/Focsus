from fastapi import FastAPI
from src.auth.router import auth_router
from src.trackers.weight.router import weight_router
from src.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(auth_router,  tags=["Auth"])
app.include_router(weight_router, tags=["Weight"])
