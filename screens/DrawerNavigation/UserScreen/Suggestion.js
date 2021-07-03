import React, {useState} from 'react';
import { 
  View, 
  Text ,
  StyleSheet,
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';
import * as yup from 'yup'
import { Formik } from 'formik'
import { ip } from '../../../config/url';

function Suggestion(props) {

    return (
      <>
        <Header style={{backgroundColor: colors.darkBlue}}>
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
        <StatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
        <ImageBackground
          source={require('../../../assets/comSuggest.jpg')}
          style={{flex: 1, width: '100%', height: '100%'}}>
          <SafeAreaView style={styles.container}>
            <View style={{marginTop: 20}}>
              <Text style={[styles.txt,{textAlign:'center'}]}>Feedback Form</Text>
              <Text style={{color: '#ffffff', fontWeight: '300', fontSize: 17}}>
                We would love to hear your thoughts, concerns or problems with
                anything so we can improve!
              </Text>

              <Formik
                initialValues={{
                  feedback: '',
                  name: '',
                  phoneNumber: '',
                }}
                onSubmit={(values,actions) => {
                  try {
                    fetch(ip + ':9090/suggestion', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        name: values.name,
                        phoneNumber: values.phoneNumber,
                        feedback: values.feedback,
                      }),
                    })
                      .then(responseData => {
                        return responseData.json();
                      })
                      .then(jsonData => {
                        console.log(jsonData);
                      })
                      .done();
                    actions.resetForm();
                    alert(
                      'Thanks for Feedback..!!'
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }}
                validationSchema={yup.object().shape({
                  name: yup.string().required('Name is required Field'),
                  phoneNumber: yup
                    .string()
                    .min(11, 'Cell No must contain 11 Characters')
                    .max(14, 'Cell no should no exceed 14 Characters')
                    .required('Phone Number is a required field'),
                  feedback: yup.string().required('Feedback is required Field'),
                })}>
                {({
                  values,
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  isValid,
                  handleSubmit,
                }) => (
                  <>
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
                      value={values.feedback}
                      style={styles.textinputlarge}
                      placeholder="Enter Feedback"
                      placeholderTextColor={colors.seagreen}
                      onChangeText={handleChange('feedback')}
                      onBlur={() => setFieldTouched('feedback')}
                    />
                    { touched.feedback && errors.feedback && 
                    <Text style={styles.error}>{errors.feedback}</Text> 
                    }
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
                      value={values.name}
                      placeholder="Enter Name"
                      style={styles.textinput}
                      onChangeText={handleChange('name')}
                      placeholderTextColor={colors.seagreen}
                      onBlur={() => setFieldTouched('name')}
                    />
                    { touched.name && errors.name && 
                    <Text style={styles.error}>{errors.name}</Text> 
                    }
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
                      value={values.phoneNumber}
                      style={styles.textinput}
                      placeholder="ex: 0300******97"
                      keyboardType="phone-pad"
                      onChangeText={handleChange('phoneNumber')}
                      placeholderTextColor={colors.seagreen}
                      onBlur={() => setFieldTouched('phoneNumber')}
                    />
                    { touched.phoneNumber && errors.phoneNumber && 
                    <Text style={styles.error}>{errors.phoneNumber}</Text> 
                    }
                    <View style={{padding: 50}}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit FeedBack</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
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
    alignSelf:'center'
    
},
buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center',
},
error:{
  fontSize: 12, 
  color: '#FF0D10',
  marginBottom:10
 },
});

export default Suggestion;