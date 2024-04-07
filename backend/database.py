import psycopg2
import os
def get_database_connection():
    try:
        conn = psycopg2.connect(
            host=os.environ["POSTGRES_HOST"],
            dbname=os.environ["POSTGRES_DATABASE"],
            user=os.environ["POSTGRES_USER"],
            password=os.environ["POSTGRES_PASSWORD"],
            options='endpoint=ep-tight-scene-a41oofva-pooler'
        )
        print("Database Connected!")
        return conn
    except Exception as e:
        print("Database Connection Error:", e)
        return None