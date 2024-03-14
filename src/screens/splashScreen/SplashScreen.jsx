import {View, Text, ImageBackground} from 'react-native';
import React from 'react';

export default function SplashScreen() {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/splashBg.png')}></ImageBackground>
    </View>
  );
}
