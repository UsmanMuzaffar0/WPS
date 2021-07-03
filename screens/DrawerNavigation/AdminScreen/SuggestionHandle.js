import React,{useState} from 'react';
import {Text,TextInput,StatusBar,ScrollView,TouchableOpacity,StyleSheet,ImageBackground,SafeAreaView, View, Alert} from 'react-native'
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';
import { ip } from '../../../config/url';

function SuggestionHandle(props) {

  const [id, setId] = useState('')
  const [ApiData, setApiData] = useState('')

  const DeleteSuggestion = () =>{
    fetch(ip+':9090/userSuggestionDel/' + id,{
      method: 'DELETE'
  }).then((res)=> {
      console.log("in then",res.rows)
  }).done();
      setId(null)
 Alert.alert("Suggestion Deleted!")
  console.log("Suggestion Deleted!!!")
}


const ViewSuggestion = () =>{
   fetch(ip+':9090/UserSuggestion',{
       method:'GET'
   }).then((responseData) => {
       return responseData.json();
   }).then((jsonData) => {
       console.log(jsonData);
       setApiData(jsonData)
       console.log(ApiData)
   }).done();
   setId(null)  
}

const data = [...ApiData];
let dataDisplay = data.map(function(jsonData){
    return(
        <View key={jsonData.id}>
            <View style={{backgroundColor:'#546e7a',padding:10,margin:10, opacity:0.8}}>
                <Text style={{color:'#ffffff', fontWeight:'bold',}}>id: {jsonData.id}</Text>
                <Text style={{color:'#ffffff', fontWeight:'bold',}}>User Name: {jsonData.name}</Text>
                <Text style={{color:'#ffffff'}}>Ph-Number: {jsonData.phoneNumber}</Text>
                <Text style={{color:'#ffffff'}}>FeedBack: {jsonData.feedback}</Text>
  
            </View>
        </View>
    )
});

    return (
      <>
        <Header style={{backgroundColor: colors.darkBlue}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={()=> props.navigation.openDrawer() }> 
              <Icon name='menu' style={{color: colors.white}} />
            </Button>

          </Left>
          <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize:13, color: colors.white}}>Suggestion Handle</Text>
          </Body>
          <Right style={{flex:1}}>
           
          </Right>
        </Header>
        <StatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
        <ImageBackground
          source={require('../../../assets/comSuggest.jpg')}
          style={{flex: 1, width: '100%', height: '100%'}}>
          <SafeAreaView style={styles.container}>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginTop: 5,
                  fontSize: 18,
                  color: 'white',
                }}>
                Enter ID:{' '}
              </Text>

              <TextInput
                style={styles.textinput}
                placeholder="Enter Id of Suggestion"
                placeholderTextColor={colors.seagreen}
                keyboardType="phone-pad"
                onChangeText={id => setId(id)}
              />

              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={DeleteSuggestion}>
                  <Text style={styles.buttonText}>Delete Suggestion</Text>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ViewSuggestion}>
                  <Text style={styles.buttonText}>View Suggestions</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>{dataDisplay}</ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    marginHorizontal: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
 
  textinput:{
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 10,
      borderRadius:20,
      marginBottom:5,
      color:colors.white
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
    marginVertical:10,
    width:300,
    paddingVertical:12,
}
});

export default SuggestionHandle;