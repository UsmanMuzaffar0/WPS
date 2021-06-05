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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StoreContext } from '../store/store';
import { ip } from '../config/url';
import { Toast } from 'native-base';
import colors from '../config/colors';

export default function SignInScreen({navigation}) {
  const [hidePass, setHidePass] = useState(true);
  const store = useContext(StoreContext)

  const storageData=(key)=>{
    AsyncStorage.setItem('@user_id',key)
    store.setId(key)
    console.log("Login Successfully as", key)
    }

  const login = async (email,password) => {
      // try {
      //     await auth().signInWithEmailAndPassword(email,password)
      // }catch(e){
      //     console.log("Sign in",e)
      //     Alert.alert('The password is invalid or the user does not have a password')
      // }
      fetch(ip+':9090/users',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }
        )
      }
      
      )
        .then((response) => response.json())
        .then((json) => {
          if(json.message == "User not found! please try again!"){
            Alert.alert('Ooops!!!','invalid Credentials');
          }else{
            // console.log((json.id))
            store.setId(json.id)
            storageData(json.id)
            Toast.show({
              text: 'Login Succesfully',
              type: "success",
              style:{opacity:0.9},
              textStyle:{color:colors.white,textAlign:'center'}
            })

          }
          
          

        })
        .catch((error) => {
          console.error(error);
        });

  }

  const passwordVisibilty = () => {
    setHidePass(!hidePass);
  };

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
        <Text style={styles.text_header}>Welcome!</Text>
      </Animatable.View>
      <Animatable.View style={styles.footer}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values =>{login(values.email,values.password)}}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Email must be valid")
              .required("Email is a required field"),
            password: yup
              .string()
              .min(6, 'Password must have 6 characters')
              .max(10, 'Password should not exceed 10 characters')
              .required('Password is a required field'),
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
              <Text style={styles.text_footer}>Email</Text>
              <View style={styles.action}>
                <Feather name="mail" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Email"
                  style={styles.textInput}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <Feather name="check-circle" color="green" size={20} />
              </View>
              {
                touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>
              }
              <Text style={[styles.text_footer, {marginTop: 30}]}>
                Password
              </Text>
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
              {
                touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>
              }
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.5}>
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}>
                    <Text style={[styles.textSign, {color: '#fff'}]}>
                      Sign In
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('SignUpScreen')}
                  style={[
                    styles.signIn,
                    {borderColor: '#009387', borderWidth: 1, marginTop: 15},
                  ]}>
                  <Text style={[styles.textSign, {color: '#009387'}]}>
                    Sign Up
                  </Text>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  error:{
    fontSize: 12, 
    color: '#FF0D10',
    marginBottom:10
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
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    textAlign: 'center',
    marginTop: 50,
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
