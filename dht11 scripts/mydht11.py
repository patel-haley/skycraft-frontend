import adafruit_dht
import time
from adafruit_blinka.microcontroller.bcm283x import pin  # For Raspberry Pi GPIO pins

DHT_PIN = pin.D4

# Initialize the DHT11 sensor on the specified GPIO pin
dht_sensor = adafruit_dht.DHT11(DHT_PIN)

while True:
    try:
        # Get readings
        temperature = dht_sensor.temperature
        humidity = dht_sensor.humidity
        print(f"Temp: {temperature:.1f}°C   Humidity: {humidity:.1f}%")
    except RuntimeError as error:
        # occasional errors 
        print(f"Sensor error: {error.args[0]}")
    except Exception as e:
        print(f"Unexpected error: {e}")
        break  # Break loop if unexpected error
    time.sleep(2)  # 2 seconds between readings 
