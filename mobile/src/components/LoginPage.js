import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
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
      <ImageBackground
        source={require('../../resources/img/background.png')}
        style={styles.background}>
        <Input
          containerStyle={styles.input}
          placeholder="Email"
          leftIcon={{type: 'font-awesome', name: 'user'}}
          onChangeText={username => setCredentials({...credentials, username})}
        />
        <Input
          secureTextEntry={true}
          containerStyle={styles.input}
          placeholder="Hasło"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={password => setCredentials({...credentials, password})}
        />
        <Button
          containerStyle={styles.button}
          title="Zaloguj"
          onPress={() => signIn()}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  input: {
    padding: 5,
  },
  button: {
    padding: 5,
  },
});
