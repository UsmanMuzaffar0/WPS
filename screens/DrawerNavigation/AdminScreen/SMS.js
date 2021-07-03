import React,{useState} from 'react';
import { StyleSheet, Text,TextInput, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import SendSMS from 'react-native-sms'
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'


function SMS(props) {

    const [phoneNumber, setPhoneNumber] = useState('')

  const someFunction= ()=> {
    SendSMS.send({
        //Message body
        body: '',
        //Recipients Number
        recipients: [phoneNumber],
        //An array of types that would trigger a "completed" response when using android
        successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
        if(completed){
          console.log('SMS Sent Completed');
        }else if(cancelled){
          console.log('SMS Sent Cancelled');
        }else if(error){
          console.log('Some error occured');
        }
    });
  }
  
    return (
        <>
        <Header style={{backgroundColor: colors.darkBlue}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={()=> props.navigation.openDrawer() }> 
              <Icon name='menu' style={{color: colors.white}} />
            </Button>

          </Left>
          <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize:18, color: colors.white}}>SMS</Text>
          </Body>
          <Right style={{flex:1,alignItems:"center",flexDirection:"row"}}>
            
                
          
          </Right>
        </Header>
      <ImageBackground 
                source={require('../../../assets/message.jpg')}
                style={{flex:1, width:'100%', height:'100%'}}>
      <View style={{width:'90%',alignSelf:'center'}} >
          <TextInput style={styles.textinput}
            keyboardType="phone-pad"

            placeholder ="Type Your Phone Number"
            placeholderTextColor={colors.white}
            onChangeText= {phone_number => setPhoneNumber(phone_number) }/>
        <TouchableOpacity onPress={()=>someFunction()}>
        <View>
          <Text style={styles.text}>Send SMS</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ImageBackground>
      </>
    );
  
}

export default SMS

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: 'white',
    textAlign:'center',
    fontSize: 25,
    marginTop:16,
    fontWeight:"bold"
  },
  textinput:{
    height: 60,
    marginHorizontal:"1%",
    padding:"2%",
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 50,
    borderRadius:20,
    marginBottom:5,
    color:colors.white,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
  },
});
