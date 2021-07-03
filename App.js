import React from 'react';
import Routes from './screens/Routes';
import {StoreProvider} from './store/store'
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { ip } from './config/url';


export default function App({isHeadless}) {

  
  if(isHeadless){
    console.log("App launch by ios in background, ignore it.");
    return null;

  }

            
  messaging()
  .requestPermission()
  .then(authStatus => {
    console.log('APNs Status: ', authStatus);

    if(authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus == messaging.AuthorizationStatus.PROVISIONAL){
      messaging()
      .getToken()
      .then(token => {
        console.log('messaging.getToken:', token)

      });  

      messaging()
      .onTokenRefresh(token => {
        console.log('messaging.onTokenRef: ',token)
       
      });
      
      fcmUnsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new message arrived!', remoteMessage);

        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
              [
              
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK",
                style: 'destructive',
                onPress: () => 
                {
                
                console.log( remoteMessage.notification)
               
                    
                      }
                
                }
              ]
            )
      }); 
    
    messaging().
    onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background:' , remoteMessage);
      if(remoteMessage && remoteMessage.notification){

        console.log('Notification Form',remoteMessage.notification)

          try {
            fetch(ip + ':9090/postNotification', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: remoteMessage.notification.title,
                description: remoteMessage.notification.body,
                
              }),
            })
              .then(responseData => {
                return responseData.json();
              })
              .then(jsonData => {
                console.log(jsonData);
              })
              .done();
          } catch (error) {
            console.error(error);
          }
        


       
    
    }
  });

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        console.log('Notification caused app to open from quit state:' , remoteMessage);
     
        if(remoteMessage && remoteMessage.notification){
          console.log('Remote Msg',remoteMessage.notification)
          try {
            fetch(ip + ':9090/postNotification', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: remoteMessage.notification.title,
                description: remoteMessage.notification.body,
                
              }),
            })
              .then(responseData => {
                return responseData.json();
              })
              .then(jsonData => {
                console.log(jsonData);
              })
              .done();
          } catch (error) {
            console.error(error);
          }
        
        }


    });
    

    }

  })
  .catch(err => {
    console.log('Error while getting Notifications Permissions ', err);
  });
  

  
  return (
    <StoreProvider>
         <Routes/>
    </StoreProvider>
 
  );
}
