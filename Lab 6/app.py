from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

students = {
    "Alice": 90,
    "Bob": 85
}

@app.route('/')
def home():
    return render_template("index.html")

# 1) Get all students
@app.route('/api/students', methods=['GET'])
def get_students():
    return jsonify([
        {"name": name, "grade": grade}
        for name, grade in students.items()
    ])

# 2) Get one student
@app.route('/api/students/<name>', methods=['GET'])
def get_student(name):
    if name in students:
        return jsonify({
            "name": name,
            "grade": students[name]
        })
    return jsonify({"error": "Not found"}), 404

# 3) Add student
@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.json
    students[data['name']] = data['grade']
    return jsonify({"message": "Student added"})

# 4) Update grade
@app.route('/api/students/<name>', methods=['PUT'])
def update_student(name):
    if name in students:
        students[name] = request.json['grade']
        return jsonify({"message": "Updated"})
    return jsonify({"error": "Not found"}), 404

# 5) Delete student
@app.route('/api/students/<name>', methods=['DELETE'])
def delete_student(name):
    if name in students:
        del students[name]
        return jsonify({"message": "Deleted"})
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)