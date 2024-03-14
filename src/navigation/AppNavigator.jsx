import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './authNavigation/AuthNavigation';
import AppNavigation from './appNavigation/AppNavigation';
import Login from '../screens/authScreens/Login';
import Register from '../screens/authScreens/Register';
import SplashScreen from '../screens/splashScreen/SplashScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../Context/AuthContext/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // const [authenticated, setAuthenticated] = useState(false);
  const {authenticated, setAuthenticated} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthenticated(true);
        console.log('userAuthenticated');
        setLoading(false);
      } else {
        console.log('userNotAuthenticated');
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <Stack.Navigator>
      {loading ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="splash"
          component={SplashScreen}
        />
      ) : !authenticated ? (
        <>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Register"
            component={Register}
          />
        </>
      ) : (
        <Stack.Screen
          name="App"
          options={{headerShown: false}}
          component={AppNavigation}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
