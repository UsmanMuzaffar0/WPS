import React, {useEffect, useState,useContext} from 'react';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,} from 'react-native'
import axios from 'axios';
import {StoreContext} from '../../../store/store';
import {Observer} from 'mobx-react-lite';
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ip } from '../../../config/url';

function Notification(props) {

  const store = useContext(StoreContext);
  const [didMount, setDidMount] = useState(false);
  const [notification, setNotification] = useState([]);
  const [loader, setLoader] = useState(true);
  const [expanded, setExpanded] = useState([]);

  let notificationArray = [];

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    expanded[index] = !expanded[index];

    setExpanded([...expanded]);

  };
  const getNotifications = ()=> {
    setLoader(true)
    try{

    fetch(ip+':9090/GetNotification',{
      method:'GET'
  }).then((responseData) => {
      return responseData.json();
  }).then((jsonData) => {
      console.log(jsonData);
      setNotification(jsonData)
      notificationArray = jsonData
      setLoader(false)

  }).done();
}catch(e){
  console.log("get Notification data Error",e)
}
  }

  useEffect(() => {
    setDidMount(true);

    getNotifications();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    return () => setDidMount(false);
  }, []);


    return (
      <Observer>
      {() => (
      <>
        <Header style={{backgroundColor: colors.darkBlue}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={()=> props.navigation.openDrawer() }> 
              <Icon name='menu' style={{color: colors.white}} />
            </Button>

          </Left>
          <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize:18, color: colors.white}}>Notification</Text>
          </Body>
          <Right style={{flex:1}}>
           
          </Right>
        </Header>
        <StatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
        {
          loader ? 
          <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={colors.red} size="large" />
        </View>
        :
        <ScrollView style={{marginTop: 10}}>
             {notification.map((data,index)=>(
              <Card key={index} style={styles.cardContainer}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => {
                      toggleExpand(index);
                    }}>
                    <Text
                      style={styles.title}>
                      {data.title}
                    </Text>
                    <MaterialIcons
                      name={
                        expanded[index]
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={30}
                      color={colors.black}
                    />
                  </TouchableOpacity>
                  <View style={styles.parentHr} />
                  {expanded[index] && (
                    <View style={styles.child}>
                      <Text>
                        {data.description}
                      </Text>
                     
                    </View>
                  )}
                </Card>
            
             ))}
                
            </ScrollView>
}
      </>
         )}
         </Observer>
    );
}

export default Notification;


const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    width: '80%',
  },
  cardContainer: {
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingLeft: 25,
    paddingRight: 18,
    paddingVertical: 10,
    alignItems: 'center',
  },
  parentHr: {
    height: 1,
    color: colors.white,
    width: '100%',
  },
  child: {
    backgroundColor: colors.offWhite,
    padding: 16,
  },
});
