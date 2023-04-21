# Hands On

### Project topic

The mobile application that connects busy people with reliable helpers in their local area. Say goodbye to mundane tasks and hello to more time with Hands On.


### Features

* **Requestors**: 
Users can post requests for errands or small tasks to be completed, and accept the Helper based on Helper’s ratings and reviews.
* **Helpers**: Users can browse and accept requests to complete errands or small tasks, and accept the Requestor based on Requestor’s ratings and reviews.

---
### App Interface


![](https://github.com/zhipengwu90/Hands_On_app/blob/main/gitImg/ui1.png)
![](https://github.com/zhipengwu90/Hands_On_app/blob/main/gitImg/ui2.png)

### Technical Details

This application is built using React Native and Expo. The database is powered by Firebase.

Expo is used to run/test application on Android and iOS during the development. 


### How to Install and Run the Project

* clone this repo to your local machine
* cd to the folder
* in the util folder, replace those files with your own files:
	- firebaseConfig.js (create a firestore project, then set up as web app)
	- apiKey.js (with your own firestore API key)
	- mapKey.js (set up your google map API key for googel Place Autocomplete) 


* npm install
    - To install all the dependencies
* npm start
    - if you have ios simulator in your Macbook, use the command: npm run ios
    - if you have android simulator, use the command: npm run android
* Android device push notification 
	- create following files:
	- google-services.json (set up android app in firestore, then download the google-services.json and put it in the root folder, this is for andoriod device push notificaiton)
	- create a admin folder inside of Server, download service account keys (projectName.json) to the folder (follow the tutorial [Create and delete service account keys](https://cloud.google.com/iam/docs/keys-create-delete), this is for andoriod device push notificaiton)
	- cd to Service folder, run npm install, then npm start to start the notification server

---



### Author
* Zhipeng Wu


Thank you for using our Hands On application application! We hope you find it useful and convenient.