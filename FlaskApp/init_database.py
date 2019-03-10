import mysql.connector

class Database:
    def __init__(self, host, user, password, database_name):
        self.host           = host
        self.user           = user
        self.password       = password
        self.database_name  = database_name

        self.conn = mysql.connector.connect(
            host = self.host,
            user = self.user,
            password = self.password,
            auth_plugin = "mysql_native_password",
            database    = self.database_name
        )

        self.cursor = self.conn.cursor()

    def create_table(self):
        self.cursor.execute("CREATE TABLE user (name VARCHAR(32) PRIMARY KEY, password VARCHAR(32))")


    def show_database(self):
        self.cursor.execute("SHOW DATABASES")
        for x in self.cursor:
            print(x)

    def show_table(self):
        self.cursor.execute("SHOW TABLES")
        for x in self.cursor:
            print(x)

    def close_database(self):
        self.conn.close()

def main():

    host          = "127.0.0.1"
    user          = "root"
    password      = "root"
    database_name = "party_db"

    create_database(host, user, password, database_name)

    database = Database(host, user, password, database_name)

    database.create_table()

    database.close_database()

def create_database(host, user, password, database_name):
    conn = mysql.connector.connect(
        host = host,
        user = user,
        password = password,
        auth_plugin = "mysql_native_password",
    )
    cursor = conn.cursor()
    cursor.execute("DROP DATABASE IF EXISTS party_db")
    cursor.execute("CREATE DATABASE party_db")
    conn.close()

if __name__ == "__main__":
    main()
