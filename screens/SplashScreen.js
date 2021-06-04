import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="flipInY"
          duration={3000}
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        // duration={1000}
        style={styles.footer}>
        <Text style={styles.title}>stay connected with everyone !</Text>
        <Text style={styles.text}>Sign In with account</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignInScreen')}
            activeOpacity={0.5}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('screen');
const height_logo = height * 0.18;
const width_logo = width * 0.88;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logo: {
    // width: width_logo,
    // height: height_logo,
    width: 480,
    height: 270,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  text: {
    color: 'gray',
    fontSize: 12,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
});
