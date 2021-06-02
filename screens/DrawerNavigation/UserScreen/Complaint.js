import React,{useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, ImageBackground} from 'react-native'
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';

function Complaint(props) {

  const [name, setname]= useState('')
  const [phone_number, setPhone_number]= useState('')
  const [details, setDetails]= useState('')
  const [nature, setNature]= useState('')

  function Separator() {
    return <View style={styles.separator} />;
  }

const submitComplaint = () =>{

if(name==""){
  alert('Name field is empty!');
}else if(phone_number==""){
  alert('Phone number is required!');
}else if(nature==""){
  alert('Nature of Complaint cannot be empty!');
}else if(details==""){
  alert('details of the Complaint cannot be empty!')
}else{
  Alert.alert(`name ${name}`)
}
}

    return (
      <>
        <Header style={{backgroundColor: colors.seagreen}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={()=> props.navigation.openDrawer() }> 
              <Icon name='menu' style={{color: colors.white}} />
            </Button>

          </Left>
          <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize:18, color: colors.white}}>Complaints</Text>
          </Body>
          <Right style={{flex:1}}>
           
          </Right>
        </Header>
        <ImageBackground 
                source={require('../../../assets/comSuggest.jpg')}
                style={{flex:1, width:'100%', height:'100%'}}>

        <View style = {styles.container}>
          <Text style={styles.txt}>------We are here to assist you!------</Text>
          <Text style = {{textAlign:"center", color:'#ffffff'}}>Please complete the form below for your complaints</Text>
        <Separator />
        <Text style ={{fontWeight: "bold",fontSize:16,color:'#ffffff'}}>Name: </Text>
        <TextInput style={styles.textinput}
            placeholderTextColor={colors.seagreen}
            placeholder="Enter Name"
            keyboardType="name-phone-pad"
            onChangeText= {name => setname(name) }/>
        <Text style ={{fontWeight: "bold",color:'#ffffff',fontSize:16}}>Ph-Number: </Text>
        <TextInput style={styles.textinput} 
            placeholderTextColor={colors.seagreen}
            placeholder="ex: 0308******97"
            keyboardType= "phone-pad"
            onChangeText= {phone_number => setPhone_number(phone_number) }/>
        <Separator />
        <Text style ={{fontWeight: "bold",color:'#ffffff',fontSize:16}}>The nature of Complaint: </Text>
        <TextInput style={styles.textinputlarge}
            placeholderTextColor={colors.seagreen}
            placeholder="ex: Sensors"
            onChangeText= {nature => setNature(nature) } />
        <Text style ={{fontWeight: "bold",fontSize:16,color:'#ffffff'}}>The specific details of Complaint: </Text>
        <TextInput style={styles.textinputlarge} 
            placeholderTextColor={colors.seagreen}
            placeholder="Detail About your complain"
            onChangeText= {details => setDetails(details) }/>
        <View style = {{padding: 30, marginTop: 1}}>
        
        <TouchableOpacity onPress={submitComplaint} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
          </View>
        </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 6,
    marginHorizontal: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  txt:{
    textAlign: "center",
    fontWeight:"bold",
    marginBottom: 5,
    fontSize: 20,
    color:'white'
  },
  textinput:{
    height: 50,
    borderColor: 'gray',
    color:'white',
    borderWidth: 1,
    borderRadius:20,
    marginBottom:5
  },
  textinputlarge:{
    height: 80,
    marginTop:10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:20,
    marginBottom:5,
    color:"white"
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center',
},
button: {
    backgroundColor:'#607d8b',
    borderRadius: 25,
    opacity:0.9,
    marginVertical:5,
    width:300,
    paddingVertical:12,
}
});

export default Complaint;