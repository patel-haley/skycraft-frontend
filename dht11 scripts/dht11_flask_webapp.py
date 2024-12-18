import adafruit_dht
import time
from adafruit_blinka.microcontroller.bcm283x import pin
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from threading import Thread

# Sensor Setup
DHT_PIN = pin.D4
dht_sensor = adafruit_dht.DHT11(DHT_PIN)

# Database Setup  
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sensor_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class SensorData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=db.func.now())
    temperature = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)

# Initialize database
with app.app_context():
    db.create_all()

# Read/store data into JSON
def read_and_store_data():
    while True:
        try:
            # Read data from the DHT11 sensor
            temperature = dht_sensor.temperature
            humidity = dht_sensor.humidity
            
            if temperature and humidity:
                print(f"Temp: {temperature:.1f}°C, Humidity: {humidity:.1f}%")
                
                # Store data 
                new_data = SensorData(temperature=temperature, humidity=humidity)
                with app.app_context():
                    db.session.add(new_data)
                    db.session.commit()
            else:
                print("Sensor failure. Retrying...")

        except Exception as e:
            print(f"Error reading sensor: {e}")
        time.sleep(2) 

@app.route("/")
def index():
    # Fetch data from the database
    data = SensorData.query.order_by(SensorData.timestamp.desc()).limit(20).all()
    return render_template("index.html", data=data)

if __name__ == "__main__":
    sensor_thread = Thread(target=read_and_store_data)
    sensor_thread.daemon = True
    sensor_thread.start()
    
    # Start flask web server
    app.run(host="0.0.0.0", port=5000, debug=True)
