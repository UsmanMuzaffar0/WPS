import React ,{useEffect,useState,useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import database from '@react-native-firebase/database';
import { Observer } from 'mobx-react-lite';
import { StoreContext } from '../../../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage'


function Home(props) {

  const store = useContext(StoreContext)
  const [visible,setVisible]=useState(true)

  const dataArr = [2,30,40,50]

  const logout = async () =>{
    AsyncStorage.removeItem('@user_id').then(
      res=>{
  
        console.log('User Id Remove Successfully', res)
        store.setId(null)
        // Toast.show({
        //   text: 'Logout Succesfully',
        //   type: "success",
        //   style:{opacity:0.9},
        //   textStyle:{color:colors.white,textAlign:'center'}
        // })
  
      }
    ).catch(
      e=>{
        console.log('Error While Removig Id from Local Storage'+e)
      }
    )
  
  } 
  //console.log("user",store.Id)


  useEffect(()=>{

    const Sensor = setInterval(()=>{

      database()
        .ref('/PH')
        .on('value', snapshot => {
          store.setPh(snapshot.val())
        console.log('Ph: ', snapshot.val());
      });

      database()
        .ref('/Temp')
        .on('value', snapshot => {
          store.setTemp(snapshot.val())
        console.log('Temp: ', snapshot.val());
      });
      database()
        .ref('/TB')
        .on('value', snapshot => {
          store.setTb(snapshot.val())
        console.log('TB: ', snapshot.val());
      });

    },5000)

    return () => clearInterval(Sensor);

    
  },[]);


    return (
      <Observer>
      {
        ()=>
      <>
      
        <Header style={{backgroundColor: colors.darkBlue}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={()=> props.navigation.openDrawer() }> 
              <Icon name='menu' style={{color: colors.white}} />
            </Button>

          </Left>
          <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize:18, color: colors.white}}>Home</Text>
          </Body>
          <Right style={{flex:1,alignItems:"center",flexDirection:"row"}}>
            
                <Ionicons size={22} onPress={()=>props.navigation.navigate("Notification")} name='notifications-outline' style={{color: colors.white}} />
                <AntDesign onPress={()=>logout()} name='poweroff' size={20} style={{color: colors.white,paddingLeft:15}} />
          
          </Right>
        </Header>
        <StatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
        
        <ScrollView style={{flex: 1,backgroundColor:colors.white}}>
        <Text style={[styles.header,{fontWeight:'bold', fontSize: 25}]} >Live Sensors Data</Text>
             <Card 
              style={{ marginTop:20,
              borderRadius: 16,
              marginBottom: 10,
              borderRadius: 5,
              elevation: 3,
              marginLeft: 10,
              marginRight: 10,
              shadowColor:'#000000',
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                  height: 1,
                  width: 1
            }}}>
              <>
              
            <Text style={[styles.header,{fontWeight:'bold'}]} >PH-Sensor Data {store.ph[store.ph.length -1]}</Text>

         <LineChart
        
           data={{
             datasets: [
               {
                 data: store.ph,
                 strokeWidth: 2,
               },
             ],
           }}
           width={Dimensions.get('window').width - 16}
           height={220}
           chartConfig={{
             backgroundColor: colors.white,
             backgroundGradientFrom: colors.white,
             backgroundGradientTo: colors.white,
             decimalPlaces: 2,
             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
           }}
           style={{
          marginTop:40
          }}
         />
         </>
       </Card>
       <Card 
              style={{ marginTop:20,
              borderRadius: 16,
              marginBottom: 10,
              borderRadius: 5,
              elevation: 3,
              marginLeft: 10,
              marginRight: 10,
              shadowColor:'#000000',
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                  height: 1,
                  width: 1
            }}}>
              <>
              <Text style={[styles.header,{fontWeight:'bold'}]} >Temperature-Sensor Data {store.temp[store.temp.length - 1]}</Text>
         <LineChart
           data={{
             datasets: [
               {
                 data: store.temp,
                 strokeWidth: 2,
               },
             ],
           }}
           width={Dimensions.get('window').width - 16}
           height={220}
           chartConfig={{
             backgroundColor: colors.white,
             backgroundGradientFrom: colors.white,
             backgroundGradientTo: colors.white,
             decimalPlaces: 2,
             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
           }}
           style={{
          marginTop:40
          }}
         />
         </>
       </Card>
       <Card 
              style={{ marginTop:20,
              borderRadius: 16,
              marginBottom: 10,
              borderRadius: 5,
              elevation: 3,
              marginLeft: 10,
              marginRight: 10,
              shadowColor:'#000000',
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                  height: 1,
                  width: 1
            }}}>
              <>
              <Text style={[styles.header,{fontWeight:'bold'}]} >Turbidity-Sensor Data {store.tb[store.tb.length - 1]}</Text>
         <LineChart
           data={{
             datasets: [
               {
                 data: store.tb,
                 strokeWidth: 2,
               },
             ],
           }}
           width={Dimensions.get('window').width - 16}
           height={220}
           chartConfig={{
             backgroundColor: colors.white,
             backgroundGradientFrom: colors.white,
             backgroundGradientTo: colors.white,
             decimalPlaces: 2,
             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
           }}
           style={{
          marginTop:40
          }}
         />
         </>
       </Card>
      </ScrollView>
        </>
}
</Observer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});

export default Home;