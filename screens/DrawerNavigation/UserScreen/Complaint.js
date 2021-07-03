import React,{useState} from 'react';
import {Text, View, StatusBar,StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, ImageBackground} from 'react-native'
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';
import * as yup from 'yup'
import { Formik } from 'formik'
import { ip } from '../../../config/url';

function Complaint(props) {

  function Separator() {
    return <View style={styles.separator} />;
  }

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
            <Text style={{fontSize: 18, color: colors.white}}>Complaints</Text>
          </Body>
          <Right style={{flex: 1}}></Right>
        </Header>
        <StatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
        <ImageBackground
          source={require('../../../assets/comSuggest.jpg')}
          style={{flex: 1, width: '100%', height: '100%'}}>
          <View style={styles.container}>
            <Text style={[styles.txt,{textAlign:'center'}]}>
              We are here to assist you!
            </Text>
            <Text style={{textAlign: 'center', color: '#ffffff'}}>
              Please complete the form below for your complaints
            </Text>
            <Separator />
            <Formik
              initialValues={{
                name: '',
                phoneNumber: '',
                nature: '',
                details: '',
              }}
              onSubmit={(values,actions) => {
                try {
                  fetch(ip + ':9090/complaint', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: values.name,
                      phoneNumber: values.phoneNumber,
                      nature: values.nature,
                      details: values.details,
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
                    'Thanks for complaint, We will further take action as soon as possible..!!',
                  );
                } catch (error) {
                  console.error(error);
                }
              }}
              validationSchema={yup.object().shape({
                name: yup.string().required('Name is required field'),

                phoneNumber: yup
                  .string()
                  .min(11, 'Cell No must contain 11 Characters')
                  .max(14, 'Cell no should no exceed 14 Characters')
                  .required('Phone Number is a required field'),

                nature: yup.string().required('Nature is required Field'),

                details: yup.string().required('Details is required Field'),
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
                      fontSize: 16,
                      color: '#ffffff',
                    }}>
                    Name:{' '}
                  </Text>
                  <TextInput
                    style={styles.textinput}
                    value={values.name}
                    onBlur={() => setFieldTouched('name')}
                    placeholderTextColor={colors.seagreen}
                    placeholder= "Enter Name"
                    keyboardType="name-phone-pad"
                    onChangeText={handleChange('name')}
                  />
                  { touched.name && errors.name && 
                    <Text style={styles.error}>{errors.name}</Text> 
                    }
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#ffffff',
                      fontSize: 16,
                    }}>
                    Ph-Number:{' '}
                  </Text>
                  <TextInput
                    style={styles.textinput}
                    value={values.phoneNumber}
                    placeholderTextColor={colors.seagreen}
                    placeholder="ex: 0308******97"
                    keyboardType="phone-pad"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={() => setFieldTouched('phoneNumber')}
                  />
                  { touched.phoneNumber && errors.phoneNumber && 
                    <Text style={styles.error}>{errors.phoneNumber}</Text> 
                    }
                  <Separator />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#ffffff',
                      fontSize: 16,
                    }}>
                    The nature of Complaint:{' '}
                  </Text>
                  <TextInput
                    style={styles.textinputlarge}
                    value={values.nature}
                    placeholderTextColor={colors.seagreen}
                    placeholder="ex: Sensors"
                    onChangeText={handleChange('nature')}
                    onBlur={() => setFieldTouched('nature')}
                  />
                  { touched.nature && errors.nature && 
                    <Text style={styles.error}>{errors.nature}</Text> 
                    }
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: '#ffffff',
                    }}>
                    The specific details of Complaint:{' '}
                  </Text>
                  <TextInput
                    style={styles.textinputlarge}
                    value={values.details}
                    placeholderTextColor={colors.seagreen}
                    placeholder="Detail About your complain"
                    onChangeText={handleChange('details')}
                    onBlur={() => setFieldTouched('details')}
                  />
                  { touched.details && errors.details && 
                    <Text style={styles.error}>{errors.details}</Text> 
                    }
                  <View style={{padding: 30, marginTop: 1}}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.button}>
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
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
    alignSelf:'center'
},
error:{
  fontSize: 12, 
  color: '#FF0D10',
  marginBottom:10
 },
});

export default Complaint;
