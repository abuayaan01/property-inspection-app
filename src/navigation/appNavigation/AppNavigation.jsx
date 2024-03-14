import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../Context/AuthContext/AuthContext';

export default function AppNavigation({navigation}) {

  const {setAuthenticated} = useAuth()

  const logout = async () => {
    await AsyncStorage.clear();
    setAuthenticated(false);
  };
  return (
    <View>
      <Text>AppNavigation</Text>
      <TouchableOpacity
        style={{backgroundColor: 'red', padding: 10, color: '#fff'}}
        onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
