from supabase import create_client, Client

class SupabaseSingleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(SupabaseSingleton, cls).__new__(cls, *args, **kwargs)
            cls._instance._init()
        return cls._instance

    def _init(self):
        URL = "https://ekzhtvbisfwcjlnjbsve.supabase.co"
        KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVremh0dmJpc2Z3Y2psbmpic3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNjY4NzgsImV4cCI6MjAzMDY0Mjg3OH0.Eh5DQF_Gfsx5ZNS-M77NRhDWZ-HfPK0VjZ3R1ft1uUc"
        self.supabase: Client = create_client(URL, KEY)

    def fetch_data(self, table_name, column_name, value):
        response = self.supabase.table(table_name).select("*").eq(column_name, value).execute()
        
        return response.data

    def insert_data(self, table_name, data):
        data, count = self.supabase.table(table_name).insert(data).execute()

    def update_data(self, table_name, data):
        pass

    def upsert_data(self, table_name, data):
        pass

    def delete_data(self, table_name, data):
        pass


supabase_instance = SupabaseSingleton()