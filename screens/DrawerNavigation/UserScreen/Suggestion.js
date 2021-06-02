import React, {useState} from 'react';
import { 
  View, 
  Text ,
  StyleSheet,
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';

function Suggestion(props) {

  const [name, setName] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [feedback, setFeedback] = useState('');

  const submitFeedback = () =>{

    if(feedback==""){
      alert('Description of Feedback cannot be empty!');
    }else if(name==""){
      alert('Name field is empty!');
    }else if(phone_number==""){
      alert('Phone Number cannot be empty!');
    }else{
      
    }
  }

    return (
      <>
        <Header style={{backgroundColor: colors.seagreen}}>
          <Left style={{flex: 1}}>
            <Button transparent onPress={() => props.navigation.openDrawer()}>
              <Icon name="menu" style={{color: colors.white}} />
            </Button>
          </Left>
          <Body
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: colors.white}}>Suggestions</Text>
          </Body>
          <Right style={{flex: 1}}></Right>
        </Header>

        <ImageBackground
          source={require('../../../assets/comSuggest.jpg')}
          style={{flex: 1, width: '100%', height: '100%'}}>
          <SafeAreaView style={styles.container}>
            <View style={{marginTop: 20}}>
              <Text style={styles.txt}>Feedback Form</Text>
              <Text style={{color: '#ffffff', fontWeight: '300', fontSize: 17}}>
                We would love to hear your thoughts, concerns or problems with
                anything so we can improve!
              </Text>

              <Text
                style={{
                  fontWeight: 'bold',
                  marginTop: 18,
                  fontSize: 17,
                  color: 'white',
                }}>
                Describe Feedback: *{' '}
              </Text>
              <TextInput
              value={feedback}
                style={styles.textinputlarge}
                placeholder="Enter Feedback"
                placeholderTextColor={colors.seagreen}
                onChangeText={feedback => setFeedback(feedback)}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#ffffff',
                  marginTop: 18,
                }}>
                {' '}
                Name: *{' '}
              </Text>
              <TextInput
              value={name}
              placeholder="Enter Name"
                style={styles.textinput}
                onChangeText={name => setName(name)}
                placeholderTextColor={colors.seagreen}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  marginTop: 18,
                  fontSize: 17,
                  color: '#ffffff',
                }}>
                Ph-Number: *{' '}
              </Text>
              <TextInput
              value={phone_number}
                style={styles.textinput}
                placeholder="ex: 0300******97"
                keyboardType="phone-pad"
                onChangeText={phone_number => setPhone_number(phone_number)}
                placeholderTextColor={colors.seagreen}
              />

              <View style={{padding: 50}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={submitFeedback}>
                  <Text style={styles.buttonText}>Submit FeedBack</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  
  txt:{
    fontWeight:"bold",
    marginBottom: 5,
    fontSize: 25,
    color:'white'
  },
  textinput:{
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:20,
    marginBottom:5,
    color: 'white',
  },
  textinputlarge:{
    height: 80,
    marginTop:10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:20,
    marginBottom:5  ,
    color: 'white',
  },
  button: {
    backgroundColor:'#607d8b',
    borderRadius: 25,
    opacity:0.9,
    width:300,
    paddingVertical:12,
},
buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center',
},
});

export default Suggestion;