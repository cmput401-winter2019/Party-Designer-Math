from flask import Flask, render_template, redirect, url_for, request
import mysql.connector


app = Flask(__name__)


host        = "127.0.0.1"
user        = "root"
password    = "root"
db_name     = "party_db"

conn = mysql.connector.connect(
    host = host,
    user = user,
    password = password,
    auth_plugin = "mysql_native_password",
    database    = db_name
)

cursor = conn.cursor()

@app.route("/", methods=["GET", "POST"])
def main():
    error = None
    if request.method == 'POST':
        if request.form['username'] == 'admin' or request.form['password'] == 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:

            sql = "INSERT INTO user (name, password) VALUES (%s, %s)"
            val = (request.form['username'], request.form['password'])

            cursor.execute(sql, val)
            conn.commit()

            return redirect(url_for('home'))

    return render_template('index.html', error=error)

@app.route("/home/log")
def home():
    return "SignUp Successful!"

if __name__ == "__main__":
    app.run(debug=True)
