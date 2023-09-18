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
const char* pass = "dudu308424";
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
  if(udp.listen(localUdpPort)) {
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
        Serial.println(message);
        packetData.remove(firstPipe + 1, lastPipe);

        fields[count] = message;
        count++;
      }

      if (fields[0] == "command") {
        if (fields[3] == "fins") {
          if (finsPosition == 0) {
            for (finsPosition = 0; finsPosition <= 180; finsPosition += 1) {
              servo.write(finsPosition);
              delay(15);
            }
          } else {
            for (finsPosition = 180; finsPosition >= 0; finsPosition -= 1) {
              servo.write(finsPosition);
              delay(15);
            }
          }
          packet.printf(finsPosition == 180?"1":"0");
        } else {
          digitalWrite(fields[1].toInt(), fields[2].toInt());
          bool curState = digitalRead(fields[1].toInt());
          const char* parsedCurState = curState?"1":"0";
          packet.printf(parsedCurState);
        }
      } else if (fields[0] == "connect") {
        packet.printf("connect");
      } else {
        dhtRead();
        mq135Read();
        mq131Read();
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
    while(1) {
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
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("°C"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("°C"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("°C"));
  Serial.println(F("------------------------------------"));

  dht.humidity().getSensor(&sensor);
  Serial.println(F("Humidity Sensor"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("%"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("%"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("%"));
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

void dhtRead() {
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  }
  else {
    Serial.print(F("Temperature: "));
    Serial.print(event.temperature);
    Serial.println(F("°C"));
  }
  
  dht.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
  }
  else {
    Serial.print(F("Humidity: "));
    Serial.print(event.relative_humidity);
    Serial.println(F("%"));
  }
}

void mq135Read() {
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
}

void mq131Read() {
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
}