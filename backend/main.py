import os
from urllib import response
from fastapi import FastAPI, HTTPException
from httpx import request
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from database import get_database_connection

app = FastAPI()
conn = get_database_connection()
cur = conn.cursor()

# Allow all origins (not recommended for production, you can restrict it to specific origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This will allow all origins, you can specify your frontend URL instead
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class Admin(BaseModel):
    username: str
    password: str

class customer_query(BaseModel):
    name: str
    email: EmailStr
    contact_no: str
    query: str

def update_org_db():
    try:
        response = requests.get("http://192.168.182.191/get-message/", timeout=5).json() #timeout of 5 seconds
    except:
        raise HTTPException(status_code=42, detail="Connection timed with beans")
    else:
        print(response)
        if(response["isFilled"]):
            cur.execute("""
                UPDATE public.organisation
                SET filled_dry_bins=1
                WHERE id=1;
            """)
        else:
            cur.execute("""
                UPDATE public.organisation
                SET filled_dry_bins=0
                WHERE id=1;
            """)
        conn.commit()
        
@app.post("/admin")
async def admin(admin: Admin):
    if admin.username == os.getenv("ADMIN_USERNAME") and admin.password == os.getenv("ADMIN_PASSWORD"):
        return {"message": "Admin logged in Successfully"}
    raise HTTPException(status_code=403, detail="Wrong Username or Password")

@app.get("/status")
async def status():
    try:
        update_org_db()
    except:
        raise HTTPException(status_code=400, detail="Connection timedout with Bins") 
    else:
        cur.execute("""
            SELECT * FROM organisation
            ORDER BY id ASC;
        """)
        data = list()
        for row in cur.fetchall():
            org_detail = {}
            org_detail["org_name"] = row[1]
            org_detail["filled_dry_bins"] = row[2]
            org_detail["tot_dry_bins"] = row[3]
            org_detail["filled_wet_bins"] = row[4]
            org_detail["tot_wet_bins"] = row[5]
            org_detail["zone"] = row[6]
            org_contact_no = row[7]
            org_contact_no = org_contact_no.strip()
            # print(type(org_contact_no))
            cur.execute(f"""
                SELECT name, email from org_representative
                WHERE contact_no = '{org_contact_no}';
            """)
            org_detail["org_repr_detail"] = {}
            for repr_row in cur.fetchall():
                org_detail["org_repr_detail"]["name"] = repr_row[0]
                org_detail["org_repr_detail"]["email"] = repr_row[1]
                org_detail["org_repr_detail"]["contact_no"] = org_contact_no
            data.append(org_detail)
        if(len(data) == 0):
            raise HTTPException(status_code=400, detail="Data not found")
        return data


@app.post("/get_customer_query")
def get(data: customer_query):
    try:
        cur.execute(f"""
            INSERT INTO public.contacts_about_us(
            name, email, contact_no, quries)
            VALUES ('{data.name}', '{data.email}', '{data.contact_no}', '{data.query}');
        """)
    except:
        raise HTTPException(status_code=400, detail="Quries not inserted!")
    conn.commit()
    return {"detail":"Querie added succesfully"}

@app.get("/leaderboard")
def leaderboard():
    try :
        cur.execute("""
            SELECT organisation.org_name, score_card.score
            FROM score_card INNER JOIN organisation
            ON score_card.org_pk = organisation.id
            ORDER BY score DESC;
        """)
    except :
        raise HTTPException(status_code = 400 , detail = "database connection lost")
    data = cur.fetchall()
    print(data)
    if(len(data) == 0):
        raise HTTPException(status_code=400, detail="Not sufficient data")
    data_list = list()
    for row in data:
        temp = {}
        temp["org_name"] = row[0]
        temp["score"] = row[1]
        data_list.append(temp)
    return data_list

@app.get("/visualizetion")
def visualization():
    try:
        cur.execute("""
            SELECT * FROM public.waste_data
            where week = 1;
        """)
    except:
        raise HTTPException(status_code = 400 , detail = "database connection lost")
    data = cur.fetchall()
    print(data)
    if(len(data) == 0):
        return HTTPException(status_code=400, detail="Not sufficient data")
    data_list = list()

    for row in data:
        temp = {}
        temp["type"] = row[0]
        temp["disposed_tonned"] = row[1]
        temp["recycled_tonned"] = row[2]
        temp["generated_tonned"] = row[3]
        temp["recyc_rate"] = row[4]
        temp["week"] = row[5]
        temp["image_url"] = row[6]
        
        data_list.append(temp)
    return data_list