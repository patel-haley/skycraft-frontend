from flask import Flask, jsonify, request
import csv

app = Flask(__name__)

FILENAME = "sensor_data.csv"

def detect_spikes(threshold=2):
    spikes = []
    previous_temp = None

    with open(FILENAME, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            current_temp = float(row["Temperature"])
            if previous_temp is not None and abs(current_temp - previous_temp) >= threshold:
                spikes.append({
                    "timestamp": row["Timestamp"],
                    "temperature": current_temp,
                })
            previous_temp = current_temp

    return spikes

@app.route("/data", methods=["GET"])
def get_data():
    with open(FILENAME, "r") as file:
        data = list(csv.DictReader(file))
    return jsonify(data)

@app.route("/spikes", methods=["GET"])
def get_spikes():
    threshold = float(request.args.get("threshold", 2))
    spikes = detect_spikes(threshold)
    return jsonify(spikes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
