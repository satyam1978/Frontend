from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to access

@app.route('/')
def home():
    return "Flask backend is running!"

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    print("Contact Form Data:", data)
    return jsonify({"msg": "Message received successfully!"})

@app.route('/api/study-plan', methods=['POST'])
def study_plan():
    data = request.get_json()
    print("Study Plan Data:", data)
    return jsonify({"msg": "Study Plan saved!"})

if __name__ == "__main__":
    app.run(debug=True)

