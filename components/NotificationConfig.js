import { Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        
    }),
});


function NotificationConfig(props){
  // const [pushToken, setPushToken] = useState();

  //permissions
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.'
        );
        return;
      }
    
      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      // console.log(pushTokenData);
      // setPushToken(pushTokenData.data);
 


      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  return pushTokenData;



 
};

export default NotificationConfig; 