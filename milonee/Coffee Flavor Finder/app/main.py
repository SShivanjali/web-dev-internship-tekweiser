from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json

app = FastAPI()
templates = Jinja2Templates(directory="app/templates")
app.mount("/static", StaticFiles(directory="app/static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_form(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/recommend", response_class=HTMLResponse)
async def recommend(
    request: Request,
    roast: str = Form(...),
    taste: str = Form(...),
    strength: str = Form(...),
    origin: str = Form(...)
):
    with open("app/coffee_data.json", "r") as file:
        coffee_data = json.load(file)

    match = next(
        (c for c in coffee_data if c["roast"] == roast and c["taste"] == taste and c["strength"] == strength and c["origin"] == origin),
        None
    )

    if not match:
        match = next(
            (c for c in coffee_data if c["roast"] == roast and c["taste"] == taste and c["strength"] == strength),
            None
        )

    return templates.TemplateResponse("result.html", {
        "request": request,
        "coffee": match,
        "message": "☹️ No exact match found!" if not match else None
    })
