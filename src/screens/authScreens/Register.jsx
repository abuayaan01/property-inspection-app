import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Register = ({navigation}) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function Register() {
    console.log(email, password);
    navigation.navigate("Login");
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../../assets/bgScreen.png')}
        // resizeMode="stretch"
      >
        <View style={{marginVertical: 20}}>
          <Text style={styles.headText}>Register</Text>
          <Text style={{color: '#aaa'}}>Create an account.</Text>
        </View>
        <View>
          <TextInput
            value={firstName}
            onChangeText={setfirstName}
            style={styles.input}
            placeholder="First Name"
          />
          <TextInput
            value={lastName}
            onChangeText={setlastName}
            style={styles.input}
            placeholder="Last Name"
          />
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
          <TouchableOpacity onPress={Register} style={styles.actionBtn}>
            <Text style={{color: '#fff', fontWeight: '700'}}>Register</Text>
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
          Already have an account?{' '}
          <TouchableOpacity>
            <Text style={{color: 'orange'}}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

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

export default Register;
