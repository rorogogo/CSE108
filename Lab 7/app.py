from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure database (SQLite file)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Create database model
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    grade = db.Column(db.Float, nullable=False)

# Create DB tables
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template("index.html")

# 1) Get all students
@app.route('/api/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([
        {"name": s.name, "grade": s.grade}
        for s in students
    ])

# 2) Get one student
@app.route('/api/students/<name>', methods=['GET'])
def get_student(name):
    student = Student.query.filter_by(name=name).first()
    if student:
        return jsonify({
            "name": student.name,
            "grade": student.grade
        })
    return jsonify({"error": "Not found"}), 404

# 3) Add student
@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.json

    # Check if already exists
    if Student.query.filter_by(name=data['name']).first():
        return jsonify({"error": "Student already exists"}), 400

    new_student = Student(
        name=data['name'],
        grade=data['grade']
    )
    db.session.add(new_student)
    db.session.commit()

    return jsonify({"message": "Student added"})

# 4) Update grade
@app.route('/api/students/<name>', methods=['PUT'])
def update_student(name):
    student = Student.query.filter_by(name=name).first()

    if student:
        student.grade = request.json['grade']
        db.session.commit()
        return jsonify({"message": "Updated"})

    return jsonify({"error": "Not found"}), 404

# 5) Delete student
@app.route('/api/students/<name>', methods=['DELETE'])
def delete_student(name):
    student = Student.query.filter_by(name=name).first()

    if student:
        db.session.delete(student)
        db.session.commit()
        return jsonify({"message": "Deleted"})

    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)