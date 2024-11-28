import Adafruit_DHT
import datetime
import time

# Sensor and GPIO setup
SENSOR = Adafruit_DHT.DHT11
PIN = 4  # GPIO pin number

# File to log data
FILENAME = "sensor_data.csv"

def log_data():
    with open(FILENAME, "a") as file:
        # Write header if the file is empty
        if file.tell() == 0:
            file.write("Timestamp,Temperature,Humidity\n")
        
        while True:
            humidity, temperature = Adafruit_DHT.read_retry(SENSOR, PIN)
            if humidity is not None and temperature is not None:
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                file.write(f"{timestamp},{temperature},{humidity}\n")
                print(f"{timestamp} - Temp: {temperature}C, Humidity: {humidity}%")
            else:
                print("Failed to get reading. Retrying...")
            time.sleep(60)  # Log every minute

if __name__ == "__main__":
    log_data()
