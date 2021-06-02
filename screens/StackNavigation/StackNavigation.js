import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../SignInScreen';
import SignUpScreen from '../SignUpScren';
import SplashScreen from '../SplashScreen';
import DrawerNavigation from '../DrawerNavigation/DrawerNavigation';

function StackNavigation(props) {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator headerMode={null}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      </Stack.Navigator>
    );
}

export default StackNavigation;