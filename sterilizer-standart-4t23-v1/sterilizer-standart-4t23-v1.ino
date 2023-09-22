#include "WiFi.h"
#include "AsyncUDP.h"
#include "DHT.h"
#include "DHT_U.h"
#include "MQ135.h"
#include "MQ131.h"
#include "ESP32_Servo.h"

// RELE
#define PINPOWER 15
#define PINLIGHT 16
#define PINFAN 17
#define PINHUMIDIFIER 19

// SERVO
#define PINFINS 18

#define PINDHT22 21
#define DHTTYPE DHT22
#define PINMQ135 34
#define PINMQ131ANALOG 35
#define PINMQ131DIG 32

const char* ssid = "motorola one action_2604";
const char* pass = "senhasupersecreta";
const int localUdpPort = 1234;
int finsPosition = 0;

AsyncUDP udp;
String packetData = "";
String fields[4];
DHT_Unified dht(PINDHT22, DHTTYPE);
MQ135 mq135(PINMQ135);
Servo servo;

void setup() {
  Serial.begin(115200);
  servo.attach(PINFINS);
  connectSetup();
  dhtSetup();
  mq131Setup();
  pinSetup();
}

void loop() {
  if (udp.listen(localUdpPort)) {
    udp.onPacket([](AsyncUDPPacket packet) {
      uint8_t* data = packet.data();
      int size = packet.length();
      int count = 0;

      while (count < size) {
        packetData += (char)data[count];
        count++;
      }

      count = 0;

      while (count < 4) {
        int firstPipe = packetData.indexOf("|");
        int lastPipe = packetData.indexOf("|", firstPipe + 1);
        String message = packetData.substring(firstPipe + 1, lastPipe);
        // Serial.println(message);
        packetData.remove(firstPipe + 1, lastPipe);

        fields[count] = message;
        count++;
      }

      if (fields[0] == "command") {
        if (fields[3] == "fins") {
          if (finsPosition == 0) {
            for (finsPosition = 0; finsPosition < 180; finsPosition += 1) {
              servo.write(finsPosition);
              delay(15);
            }
          } else {
            for (finsPosition = 180; finsPosition > 0; finsPosition -= 1) {
              servo.write(finsPosition);
              delay(15);
            }
          }

          String response = "|";
          response.concat(fields[3]);
          response.concat("|");
          response.concat(finsPosition == 180 ? "1" : "0");
          response.concat("|");

          char array[20];
          response.toCharArray(array, response.length() + 1);
          packet.printf(array);
        } else {
          digitalWrite(fields[1].toInt(), fields[2].toInt());
          bool curState = digitalRead(fields[1].toInt());
          Serial.println(curState);
          String response = "|";
          response.concat(fields[3]);
          response.concat("|");
          response.concat(curState ? "1" : "0");
          response.concat("|");

          char array[20];
          response.toCharArray(array, response.length() + 1);
          packet.printf(array);
        }
      } else {
        float temperature = readTemperature();
        float humidity = readHumidity();
        float mq135CorrectedPPM = mq135Read();
        // float mq131O3PPM = mq131Read();

        String response = "";
        response.concat(temperature);
        response.concat("|");
        response.concat(humidity);
        response.concat("|");
        response.concat(mq135CorrectedPPM);
        // response.concat("|");
        // response.concat(mq131O3PPM);

        char array[20];
        response.toCharArray(array, response.length() + 1);
        packet.printf(array);

        // sprintf(array, "%f", mq135CorrectedPPM);
      }

      packetData = "";
    });
  }
}

void connectSetup() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("WiFi Failed");
    while (1) {
      delay(1000);
    }
  }
  Serial.print("UDP Listening on IP: ");
  Serial.println(WiFi.localIP());
}

void dhtSetup() {
  dht.begin();
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  Serial.println(F("------------------------------------"));
  Serial.println(F("Temperature Sensor"));
  Serial.print(F("Sensor Type: "));
  Serial.println(sensor.name);
  Serial.print(F("Driver Ver:  "));
  Serial.println(sensor.version);
  Serial.print(F("Unique ID:   "));
  Serial.println(sensor.sensor_id);
  Serial.print(F("Max Value:   "));
  Serial.print(sensor.max_value);
  Serial.println(F("°C"));
  Serial.print(F("Min Value:   "));
  Serial.print(sensor.min_value);
  Serial.println(F("°C"));
  Serial.print(F("Resolution:  "));
  Serial.print(sensor.resolution);
  Serial.println(F("°C"));
  Serial.println(F("------------------------------------"));

  dht.humidity().getSensor(&sensor);
  Serial.println(F("Humidity Sensor"));
  Serial.print(F("Sensor Type: "));
  Serial.println(sensor.name);
  Serial.print(F("Driver Ver:  "));
  Serial.println(sensor.version);
  Serial.print(F("Unique ID:   "));
  Serial.println(sensor.sensor_id);
  Serial.print(F("Max Value:   "));
  Serial.print(sensor.max_value);
  Serial.println(F("%"));
  Serial.print(F("Min Value:   "));
  Serial.print(sensor.min_value);
  Serial.println(F("%"));
  Serial.print(F("Resolution:  "));
  Serial.print(sensor.resolution);
  Serial.println(F("%"));
  Serial.println(F("------------------------------------"));
}

void mq131Setup() {
  MQ131.begin(PINMQ131DIG, PINMQ131ANALOG, LOW_CONCENTRATION, 1000000);

  Serial.println("Calibration parameters");
  Serial.print("R0 = ");
  Serial.print(MQ131.getR0());
  Serial.println(" Ohms");
  Serial.print("Time to heat = ");
  Serial.print(MQ131.getTimeToRead());
  Serial.println(" s");
}

void pinSetup() {
  pinMode(PINPOWER, OUTPUT);
  pinMode(PINLIGHT, OUTPUT);
  pinMode(PINFAN, OUTPUT);
  pinMode(PINFINS, OUTPUT);
  pinMode(PINHUMIDIFIER, OUTPUT);
}

float readTemperature() {
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  float temperature = event.temperature;
  if (isnan(temperature)) {
    Serial.println(F("Error reading temperature!"));
    return 0.0;
  }

  Serial.print(F("Temperature: "));
  Serial.print(temperature);
  Serial.println(F("°C"));
  return temperature;
}

float readHumidity() {
  sensors_event_t event;
  dht.humidity().getEvent(&event);
  float humidity = event.relative_humidity;
  if (isnan(humidity)) {
    Serial.println(F("Error reading humidity!"));
    return 0.0;
  }

  Serial.print(F("Humidity: "));
  Serial.print(humidity);
  Serial.println(F("%"));
  return humidity;
}

float mq135Read() {
  sensors_event_t event;
  dht.temperature().getEvent(&event);

  float rzero = mq135.getRZero();
  float correctedRZero = mq135.getCorrectedRZero(event.temperature, event.relative_humidity);
  float resistance = mq135.getResistance();
  float ppm = mq135.getPPM();
  float correctedPPM = mq135.getCorrectedPPM(event.temperature, event.relative_humidity);

  Serial.print("MQ135 RZero: ");
  Serial.print(rzero);
  Serial.print("\t Corrected RZero: ");
  Serial.print(correctedRZero);
  Serial.print("\t Resistance: ");
  Serial.print(resistance);
  Serial.print("\t PPM: ");
  Serial.print(ppm);
  Serial.print("\t Corrected PPM: ");
  Serial.print(correctedPPM);
  Serial.println("ppm");

  return correctedPPM;
}

float mq131Read() {
  Serial.println("Sampling...");
  MQ131.sample();
  Serial.print("Concentration O3 : ");
  Serial.print(MQ131.getO3(PPM));
  Serial.println(" ppm");
  Serial.print("Concentration O3 : ");
  Serial.print(MQ131.getO3(PPB));
  Serial.println(" ppb");
  Serial.print("Concentration O3 : ");
  Serial.print(MQ131.getO3(MG_M3));
  Serial.println(" mg/m3");
  Serial.print("Concentration O3 : ");
  Serial.print(MQ131.getO3(UG_M3));
  Serial.println(" ug/m3");

  delay(1000);
  return MQ131.getO3(PPM);
}
