import React, {useContext, useState} from 'react';
import {
    Alert,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StoreContext } from '../store/store';
import { ip } from '../config/url';
import { Toast } from 'native-base';
import colors from '../config/colors';


export default function SignUpScreen({navigation}) {
  const [hidePass, setHidePass] = useState(true);
  const store = useContext(StoreContext)

  const passwordVisibilty = () => {
    setHidePass(!hidePass);
  };
  const storageData=(key)=>{
    AsyncStorage.setItem('@user_id',key)
    store.setId(key)
    console.log("Login Successfully as", key)
    }
    
  const showPassword=()=>{
    setHidePassword(!hidePassword)
  }

  function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


  const register = (email,password,name,phoneNumber)=>{
    var uuid= create_UUID()
    storageData(uuid)

    try{
      fetch(ip+':9090/register-user',{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: uuid,
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          password: password
        })
      }).then((response)=> response.json())
      .then((json)=>{
        Toast.show({
          text: 'SignUp Succesfully',
          type: "success",
          style:{opacity:0.9},
          textStyle:{color:colors.white,textAlign:'center'}
        })
        
      })
      .catch((error)=> {
        console.log("api",error)
      })
    } catch(error) {
      console.log("Try catch",error.message)
    }

    // auth().createUserWithEmailAndPassword(email,password).then(res=>{
    //   console.log('SignUp Response',res.user.uid)
    //   // store.setId(res.user.uid)
    //   database().ref(res.user.uid).child('User').set({
    //    name:name,
    //    phoneNumber:phoneNumber,
    //    email: email
    //   })
    // }).catch(e=>{

    //   console.log("Sign up",e)
    //   Alert.alert(e.Error)
    // })
       
  
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={styles.home}>
        <FontAwesome
          name="home"
          color="#fff"
          size={30}
          onPress={() => navigation.navigate('SplashScreen')}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
      <Formik
          initialValues={{ 
       
            fullName: '', 
            phoneNumber: '',
            email:'',
            password: '' 
          }}  
          onSubmit={values =>(
            register(values.email,values.password,values.fullName,values.phoneNumber)
          )    
                } 
        validationSchema={yup.object().shape({
            fullName: yup.
            string().
            required('User Name is required field'),
            email: yup
              .string()
              .email("Email must be valid")
              .required("Email is a required field"),
            phoneNumber: yup
                .string()
                .min(11,'Cell No must contain 11 Characters')
                .max(14,'Cell no should no exceed 14 Characters')
                .required('Phone Number is a required field'),
            password: yup
                .string()
                .min(6,'Password must have 6 characters')
                .max(10,'Password should not exceed 10 characters')
                .required('Password is a required field'),
            })}
            >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
    
        <>
      <Text style={styles.text_footer}>Full Name</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            value={values.fullName}
            placeholder="Full Name"
            onChangeText={handleChange('fullName')}
            style={styles.textInput}
            autoCapitalize="none"
            onBlur={() => setFieldTouched('fullName')}
          />
          <Feather name="check-circle" color="green" size={20} />
        </View>
        {touched.fullName && errors.fullName &&
                <Text style={styles.error}>{errors.fullName}</Text>
            }
         <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Feather name="mail" color="#05375a" size={20} />
          <TextInput
            value={values.email}
            placeholder="Your Email"
            onChangeText={handleChange('email')}
            style={styles.textInput}
            autoCapitalize="none"
            onBlur={() => setFieldTouched('email')}
          />
          <Feather name="check-circle" color="green" size={20} />
        </View>
        {touched.email && errors.email &&
                <Text style={styles.error}>{errors.email}</Text>
            }
        <Text style={styles.text_footer}>Phone Number</Text>
        <View style={styles.action}>
          <Feather name="phone" color="#05375a" size={20} />
          <TextInput
           value={values.phoneNumber}
            placeholder="Your Phone Number"
            onChangeText={handleChange('phoneNumber')}
            style={styles.textInput}
            autoCapitalize="none"
            onBlur={() => setFieldTouched('phoneNumber')}
          />
          <Feather name="check-circle" color="green" size={20} />
        </View>
        {touched.phoneNumber && errors.phoneNumber &&
                <Text style={styles.error}>{errors.phoneNumber}</Text>
            }
        <Text style={[styles.text_footer, {marginTop: 10}]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
           value={values.password}
           onChangeText={handleChange('password')}
            placeholder="Your Password"
            secureTextEntry={hidePass}
            style={styles.textInput}
            autoCapitalize="none"
            onBlur={() => setFieldTouched('password')}
          />
          <Feather
            name={hidePass ? 'eye-off' : 'eye'}
            color="grey"
            size={20}
            onPress={() => passwordVisibilty()}
          />
        </View>
        {touched.password && errors.password &&
                <Text style={styles.error}>{errors.password}</Text>
            }
        
        <View style={styles.button}>
          <TouchableOpacity 
            onPress={handleSubmit}
            activeOpacity={0.5}>
            
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('SignInScreen')}
            style={[
              styles.signIn,
              {borderColor: '#009387', borderWidth: 1, marginTop: 15},
            ]}>
            <Text style={[styles.textSign, {color: '#009387'}]}>Sign In</Text>
          </TouchableOpacity>
        </View>
        </>
            )}
        </Formik>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  home: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  header: {
    flex: 1,
    justifyContent:"center",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    flex: 7,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text_footer: {
    fontSize: 18,
    color: '#05375a',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginBottom:10
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    textAlign: 'center',
    marginTop: 10,
  },
  error:{
    fontSize: 12, 
    color: '#FF0D10',
    marginBottom:10
   },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
