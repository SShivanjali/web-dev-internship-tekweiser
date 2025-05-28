# backend/schemas.py
from typing import List, Optional
from pydantic import BaseModel

class ReviewBase(BaseModel):
    reviewer_name: str
    comment: str

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: int
    book_id: int

    class Config:
        orm_mode = True

class BookBase(BaseModel):
    title: str
    author: str

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: int
    reviews: List[Review] = []

    class Config:
        orm_mode = True
