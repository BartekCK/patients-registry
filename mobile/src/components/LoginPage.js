import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {loginUser} from '../helpers/apiCommands';

export const LoginPage = ({setToken}) => {
  const [credentials, setCredentials] = useState({});

  const signIn = () => {
    loginUser({...credentials})
      .then(res => setToken(res.access_token))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../resources/img/logo.png')} />
      </View>
      <View>
        <Input
          containerStyle={styles.input}
          inputStyle={styles.inputColor}
          placeholder="Email"
          leftIcon={{type: 'font-awesome', name: 'user', color: '#98969b'}}
          onChangeText={username => setCredentials({...credentials, username})}
        />
        <Input
          secureTextEntry={true}
          inputStyle={styles.inputColor}
          containerStyle={styles.input}
          placeholder="Hasło"
          leftIcon={{type: 'font-awesome', name: 'lock', color: '#98969b'}}
          onChangeText={password => setCredentials({...credentials, password})}
        />
        <Button
          type="outline"
          containerStyle={styles.button}
          titleStyle={styles.buttonColor}
          buttonStyle={styles.buttonFrame}
          title="ZALOGUJ"
          onPress={() => signIn()}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../resources/img/loginImage.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#1C0826',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  input: {
    padding: 5,
  },
  inputColor: {
    color: '#98969b',
  },
  button: {
    padding: 5,
    marginHorizontal: 5,
  },
  buttonColor: {
    color: '#98969b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonFrame: {
    borderRadius: 300,
    borderColor: '#8D009B',
    borderWidth: 3,
  },
});
