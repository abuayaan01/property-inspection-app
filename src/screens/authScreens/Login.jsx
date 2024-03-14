import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../Context/AuthContext/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginReq} from '../../services/api';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {setAuthenticated} = useAuth();


  const loginFun = async (token,userId) => {
    await AsyncStorage.setItem('token', JSON.stringify(token));
    await AsyncStorage.setItem('userId', JSON.stringify(userId));
    setAuthenticated(true);
  };

  async function login() {
    if (email == '' || password == '') {
      console.log('Invalid Credentials');
      return;
    } else {
      setLoading(true);
      await LoginReq(email, password).then(res => {
        if (res.status == 200) {
          try {
            loginFun(res.token,res.userId);
          } catch (err) {
            console.log(err);
          }
          setLoading(false);
        } else {
          console.log(res);
          setLoading(false);
        }
      });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../../assets/splashBg.png')}
        // resizeMode="stretch"
      >
        <View style={{marginVertical: 20}}>
          <Text style={styles.headText}>Login</Text>
          <Text style={{color: '#aaa'}}>Please sign in to continue.</Text>
        </View>
        <View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Password"
          />
        </View>
        <View>
          <TouchableOpacity onPress={login} style={styles.actionBtn}>
            {loading ? (
              <ActivityIndicator color={'#fff'} size={30} />
            ) : (
              <Text style={{color: '#fff', fontWeight: '700'}}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text>
          Don't have an account?{' '}
          <TouchableOpacity>
            <Text style={{color: 'orange'}}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    // width: "100%",
  },
  input: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    // paddingHorizontal: 20,
  },
  headText: {
    fontSize: 32,
    fontWeight: '800',
    color: 'black',
  },
  actionBtn: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 50,
  },
});
