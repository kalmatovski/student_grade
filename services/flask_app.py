from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from datetime import datetime
from collections import defaultdict
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

db = sqlite3.connect("students_grade.db")
cur = db.cursor()
cur.execute(
    "create table if not exists student_list(name varchar, lastname varchar, email varchar, phone integer, username varchar, password varchar)"
)
cur.execute("create table if not exists admin(password varchar)")
cur.execute(
    "create table if not exists grades(username varchar, classname varchar, grades int, date varchar)"
)
cur.execute("INSERT INTO admin VALUES('ait23')")

db.commit()


def check_user(user_id):
    res = cur.execute("SELECT * FROM student_list WHERE username=?", (user_id,))
    student = res.fetchone()
    if student:
        return True
    else:
        return False


@app.route("/send", methods=["POST"])
def post():
    try:
        data = request.json
        cur.execute(
            "INSERT INTO student_list (name, lastname, email, phone, username, password) VALUES (?, ?, ?, ?, ?, ?)",
            (
                data["name"],
                data["lastname"],
                data["email"],
                int(data["phone"]),
                data["username"],
                data["password"],
            ),
        )
        # cur.execute(f"INSERT INTO student_list VALUES('{data['name']}', '{data['lastname']}', '{data['email']}', int({data['phone']}), '{data['username']}', '{data['password']}')")
        db.commit()
        return jsonify({"message": "Data inserted successfully"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/getStudents")
def get_students():
    cur.execute("SELECT * FROM student_list")
    rows = cur.fetchall()
    if not rows:
        return jsonify([])  # Return an empty list if no students found
    students = [
        {
            "name": row[0],
            "lastname": row[1],
            "email": row[2],
            "phone": row[3],
            "username": row[4],
            "password": row[5],
        }
        for row in rows
    ]
    return jsonify(students)


@app.route("/getStudentById", methods=["GET"])
def get_st_by_id():
    username = request.args.get("username")
    if not username:
        return jsonify({"error": "Username parameter is missing"}), 400
    res = cur.execute("SELECT * FROM student_list WHERE username=?", (username,))
    student = res.fetchone()
    if student:
        student_data = [
            {
                "name": student[0],
                "lastname": student[1],
                "email": student[2],
                "phone": student[3],
                "username": student[4],
                "password": student[5],
            }
        ]
        return jsonify(student_data)
    else:
        return jsonify({"error": "Student not found"}), 404


@app.route("/deleteStudent", methods=["DELETE"])
def delete():
    try:
        username = request.args.get("username")
        cur.execute("DELETE FROM student_list WHERE username=?", (username,))

        db.commit()
        return "Success"
    except Exception as e:
        print("Error:", e)
        return "Failed to delete student data"


@app.route("/admin_verify")
def verify():
    keyword = request.args.get("password")
    cur.execute("SELECT password FROM admin WHERE password=?", (keyword,))
    admin = cur.fetchone()
    if admin:
        return jsonify({"message": "Password verified"}), 200
    else:
        return jsonify({"error": "Wrong password"}), 401


@app.route("/add_grades", methods=["POST"])
def add_grades():
    try:

        today_date = datetime.today()
        formatted_date = today_date.strftime("%d/%m/%y")

        data = request.json
        username = data["username"]
        grade = int(data["grade"])
        classname = data["classname"]

        cur.execute(
            "INSERT INTO grades (username, classname, grades, date) VALUES (?, ?, ?, ?)",
            (username, classname, grade, formatted_date),
        )

        db.commit()
        return jsonify({"message": "Grades added successfully"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/get_grades")
def get_grades():
    try:
        username = request.args.get("username")

        cur.execute("SELECT * FROM grades WHERE username=?", (username,))
        rows = cur.fetchall()

        if rows:
            grades = [
                {
                    "classname": row[
                        1
                    ],  # Assuming classname is at index 2 in the row tuple
                    "grade": row[2],  # Assuming grade is at index 3 in the row tuple
                }
                for row in rows
            ]
            return jsonify({"grades": grades}), 200
        else:
            return (
                jsonify({"message": "No grades found for the specified username"}),
                404,
            )

    except Exception as e:
        return jsonify({"error": str(e)}), 500
