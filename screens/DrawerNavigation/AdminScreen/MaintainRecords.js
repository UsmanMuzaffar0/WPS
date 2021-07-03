import React,{ useState } from 'react';
import {Text,StatusBar,TouchableOpacity,ScrollView,StyleSheet,SafeAreaView,ImageBackground, View} from 'react-native'
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';
import { ip } from '../../../config/url';

function MaintainRecords(props) {

  const [ApiData, setApiData] = useState('')

  const data = [...ApiData];
        let dataDisplay = data.filter((value) => {
          return value.id !== 'd623ee33-97c3-4594-bc6f-665b20ed6ab0'
        }).map(function(jsonData){
            return(
                <View key={jsonData.id}>
                    <View style={{backgroundColor:'#546e7a',padding:10,margin:10, opacity:0.8}}>
                        <Text style={{color:'#ffffff', fontWeight:'bold',}}>User Name: {jsonData.name}</Text>
                        <Text style={{color:'#ffffff', fontWeight:'bold'}}>Ph-Number: {jsonData.phoneNumber}</Text>
                        <Text style={{color:'#ffffff'}}>Email: {jsonData.email}</Text>
                        
                       
                    </View>
                </View>
            )
        });

        const ViewRecords = () =>{
          fetch(ip+':9090/getUserRecords',{
              method:'GET'
          }).then((responseData) => {
              return responseData.json();
          }).then((jsonData) => {
              console.log(jsonData);
              setApiData(jsonData)
              console.log(ApiData)
          }).done();
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
            <Text style={{ fontSize:18, color: colors.white}}>Records</Text>
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
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ViewRecords}>
                  <Text style={styles.buttonText}>View Records</Text>
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
      marginBottom:5
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

export default MaintainRecords;