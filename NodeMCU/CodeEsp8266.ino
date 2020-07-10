#include <SocketIOClient.h>
#include <ESP8266WiFi.h>

SocketIOClient client;
const byte L298N_A_pin = D1; // GPI05
const byte L298N_A_In1_pin = D2; //GPI04
const byte L298N_A_In2_pin = D3; //GPI0

const byte L298N_B_In3_pin = D4; // GPI02
const byte L298N_B_In4_pin = D5; // GPIO14
const byte L298N_B_pin = D6; //GPI12
//const char* ssid = "yeuanhko";
//const char* password = "bietemnoico";
const char* ssid = "dateptrai";
const char* password = "emyeuanh";
//const char* ssid = "Maus";
//const char* password = "12345677";
//const char* ssid = "UIT-GUEST";
//const char* password = "Uit05012017";
//const char* ssid = "Iphone";
//const char* password = "tungthan131198";
char host[] = "192.168.137.88";
int port = 4001;
extern String RID;
extern String Rfull;


unsigned long previousMilis = 0;
long interval = 2000;
void motorSpeed(int prmA, byte prmA1, byte prmA2, int prmB, byte prmB1, byte prmB2)
{
  analogWrite(L298N_A_pin,prmA);
  analogWrite(L298N_B_pin,prmB);
  
  digitalWrite(L298N_A_In1_pin,prmA1);
  digitalWrite(L298N_A_In2_pin,prmA2);
  digitalWrite(L298N_B_In3_pin,prmB1);
  digitalWrite(L298N_B_In4_pin,prmB2);

}
void setup()
{
  Serial.begin(115200);
  delay(10);

  Serial.print("Ket noi vao mang");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while(WiFi.status() !=WL_CONNECTED){
    delay(500);
    Serial.print('.');
  }
  Serial.println();
  Serial.println(F("Da ket noi WiFi"));
  Serial.println(F("Dia chi IP cua ESP8266 (Socket Client ESP8266): "));
  Serial.println(WiFi.localIP());
  if (!client.connect(host, port))
  {
    Serial.println(F("Ket noi den socket server that bai!"));
    return;
  }
  if(client.connected()){
    Serial.print("Da ket toi server");
  }
    pinMode(L298N_A_In1_pin,OUTPUT);
    pinMode(L298N_A_In2_pin,OUTPUT);
    pinMode(L298N_B_In3_pin,OUTPUT);
    pinMode(L298N_B_In4_pin,OUTPUT);
    pinMode(L298N_A_pin,OUTPUT);
  
  digitalWrite(L298N_A_In1_pin,LOW);
  digitalWrite(L298N_A_In2_pin,LOW);
  digitalWrite(L298N_B_In3_pin,LOW);
  digitalWrite(L298N_B_In4_pin,LOW);
  
}
void loop()
{
//  if(millis()-previousMilis>interval){
//    previousMilis = millis();
//    client.send("atime","message","Time please?");
//  }
  //// ------------ CONTROL ------------
  if(client.monitor()){
   if(RID == "up_left") {
      motorSpeed(1023,LOW,LOW,1023,HIGH,LOW); 
      Serial.println(RID);
   }
   else if(RID == "up"){
      motorSpeed(1023,HIGH,LOW,1023,HIGH,LOW); 
      Serial.println(RID);
   }
   else if(RID == "up_right") {
     motorSpeed(1023,HIGH,LOW,1023,LOW,LOW); 
     Serial.println(RID);
   }
   else if(RID == "stop") {
     motorSpeed(0,LOW,LOW,0,LOW,LOW); 
     Serial.println(RID);
   }
   else if(RID == "down_left") {
     motorSpeed(1023,LOW,LOW,1023,LOW,HIGH); 
     Serial.println(RID);
   } 
   else if(RID == "down") {
     motorSpeed(1023,LOW,HIGH,1023,LOW,HIGH);
     Serial.println(RID);
   }   
   else if(RID == "down_right"){
     motorSpeed(1023,LOW,HIGH,1023,LOW,LOW);  
     Serial.println(RID);   
   }
  }
  if(!client.connected()){
    client.reconnect(host, port);
    Serial.println("Ket noi lai !!!!");
  }
}
