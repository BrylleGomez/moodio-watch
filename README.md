# Mood.io - IoT-Based Smart Home Solution with Mood Detection (Smart Watch component)
Mood.io is an IoT-based smart home solution developed by myself, Danayal Khan, Mohamed Mansour, and Karam Ahfid. It detects the mood of its tenant/s and modifies home conditions according to the mood detected. Mood detection involved the use of facial recognition (deep learning) and heart rate measurement (Samsung Gear S3 Frontier smart watch), whereas home conditions modified include light levels, ambient scent, and music. The system frontend was designed using HTML, JavaScript, and CSS for the web interface and HTML, JavaScript, and Tizen for smart watch interface. The backend was designed using Node.js and CouchDB with MQTT for communication.

## Demo Video

[![MOOD.IO DEMO VIDEO](http://img.youtube.com/vi/lnXVw-Ndilk/0.jpg)](http://www.youtube.com/watch?v=lnXVw-Ndilk)

## Components

### 1. Camera - Facial Recognition (Mood Detector 1)
Facial recognition is done on a computer using a webcam and a deep learning [library](https://github.com/omar178/Emotion-recognition) by omar178. Within the design, the webcam is tasked to take a snapshot of the user's face and use this image to calculate a predicted mood for the user (angry, sad, or happy).

### 2. Samsung Gear S3 Frontier Smart Watch - Watch UI (Frontend) and Heart Rate Monitor (HRM) (Mood Detector 2)
The smart watch serves two functions: (1) as a wearable user interface of the system which allows the user to view the currently detected mood, read an inspirational quote (based on the mood), start a mood detection reading (using HRM), and control the music playing at home, and (2) as a mood detector via its heart rate monitor (measuring heart rate variability or HRV). The smart watch user interface is written in JavaScript using the Tizen Web Application framework. 

![Mood.io Smart Watch UI Map](https://github.com/BrylleGomez/moodio_watch/blob/working/watch_uimap.png)

### 3. Web Interface (Frontend)
The web interface (as seen in the demo video, code in a separate repository) serves as the main interface of the Mood.io system. As demonstrated in the attached video, it enables the user to view current mood, weather, and inspirational quote, as well as control music and light level. Within the architecture, it serves as the main "frontend" to a Node.js backend server.

### 4. Node.js (Backend)
The Node.js server serves as the primary backend to the IoT system. It sends and receives data from the served webpages as well as with the hardware (via MQTT) to carry out its main tasks of (1) altering house conditions (light level, music, and fragrance) via hardware actuators (LED, computer, and servo motor) by (2) using information from detected user mood via mood sensors (webcam and watch HRM) and also (3) displaying this information to the user via interfaces (web interface and smart watch interface).

### 5. Arduino (Hardware Controller)
An Arduino UNO is used to control LED and servo motors to change house conditions based on mood information it receives from the Node.js server by subscribing to an MQTT channel. 

For more information, please refer to the in-depth [code description](../master/FILENAME.docx).
