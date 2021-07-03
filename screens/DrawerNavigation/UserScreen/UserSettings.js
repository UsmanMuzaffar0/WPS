import React, { useState,useContext } from 'react';
import {ImageBackground, StatusBar,SafeAreaView, TextInput,TouchableOpacity, ScrollView, StyleSheet, Text, View, Alert} from 'react-native'
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';
import { ip } from '../../../config/url';
import * as yup from 'yup'
import { Formik } from 'formik'
import { StoreContext } from '../../../store/store';

function UserSettings(props) {
  const store = useContext(StoreContext)

  const Separator = () => {
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
            <Text style={{fontSize: 18, color: colors.white}}>Settings</Text>
          </Body>
          <Right style={{flex: 1}}></Right>
        </Header>
        <StatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
        <ImageBackground
          source={require('../../../assets/comSuggest.jpg')}
          style={{flex: 1, width: '100%', height: '100%'}}>
          <SafeAreaView style={styles.container}>
            <View style={{marginTop: 35}}>
              <Formik
                initialValues={{
                  name: '',
                  phoneNumber: '',
                  // email:'',
                  password: '',
                }}
                onSubmit={(values,actions) => {
                  fetch(ip + ':9090/usersUpdated', {
                    method: 'PUT',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: values.name,
                      phoneNumber: values.phoneNumber,
                      email: store.email,
                      password: values.password,
                    }),
                  })
                    .then(responseData => {
                      return responseData.json();
                    })
                    .done();
                  actions.resetForm();
                  Alert.alert("Account Updated Successfully!")
                  console.log('Account Updated!!');
                }}
                validationSchema={yup.object().shape({
                  name: yup.string().required('Name is required Field'),
                  // email: yup
                  //   .string()
                  //   .email("Email must be valid")
                  //   .required("Email is a required field"),
                  phoneNumber: yup
                    .string()
                    .min(11, 'Cell No must contain 11 Characters')
                    .max(14, 'Cell no should no exceed 14 Characters')
                    .required('Phone Number is a required field'),
                  password: yup.string().required('Password is required Field'),
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
                    <Text style={styles.text}>Name: </Text>
                    <TextInput
                      style={styles.textinput}
                      keyboardType="name-phone-pad"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={() => setFieldTouched('name')}
                    />
                    { touched.name && errors.name && 
                    <Text style={styles.error}>{errors.name}</Text> 
                    }

                    <Separator />

                    <Text style={styles.text}>Ph-Number: </Text>
                    <TextInput
                      style={styles.textinput}
                      keyboardType="phone-pad"
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={() => setFieldTouched('phoneNumber')}
                    />
                    { touched.phoneNumber && errors.phoneNumber && 
                    <Text style={styles.error}>{errors.phoneNumber}</Text> 
                    }
                    {/* <Separator />

                    <Text style={styles.text}>Email: </Text>
                    <TextInput
                      style={styles.textinput}
                      keyboardType="email-address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                    />
                    { touched.email && errors.email && 
                    <Text style={styles.error}>{errors.email}</Text> 
                    } */}
                    <Separator />

                    <Text style={styles.text}>Password: </Text>
                    <TextInput
                      style={styles.textinput}
                      keyboardType="visible-password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                    />
                    { touched.password && errors.password && 
                      <Text style={styles.error}>{errors.password}</Text> 
                    }

                    <View style={{alignSelf: 'center'}}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Update Account</Text>
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
      color: colors.white
  },
  text:{
      fontWeight: "bold",
      marginTop:5,
      fontSize:18,
      color:"#ffffff"
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
  width:250,
  paddingVertical:12,
  marginTop:35
},
error:{
  fontSize: 12, 
  color: '#FF0D10',
  marginBottom:10
 },
});

export default UserSettings;