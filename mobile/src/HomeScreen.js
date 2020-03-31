import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LoginPage} from './components/LoginPage';
import {storeData} from './helpers/storage/storage';

export class HomeScreen extends React.Component {
  state = {
    token: '',
  };

  setToken = token => {
    storeData('@token', token).then(() => this.setState({token: token}));
  };

  render() {
    if (!this.state.token) {
      return <LoginPage setToken={this.setToken} />;
    }

    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
