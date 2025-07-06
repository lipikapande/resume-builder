from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS so React can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] if you want stricter control
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/uploadfile")
async def upload_file(myFile: UploadFile = File(...)):
    contents = await myFile.read()
    # For now, just print the first 100 bytes to confirm it worked
    print(contents[:100])

    # You could save to disk like this:
    # with open(f"uploaded_{myFile.filename}", "wb") as f:
    #     f.write(contents)

    return {"filename": myFile.filename, "message": "File received successfully"}
