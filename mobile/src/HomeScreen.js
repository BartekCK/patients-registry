import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {LoginPage} from './components/LoginPage';
import {storeData} from './helpers/storage/storage';
import {addUserCoordinate} from './helpers/apiCommands';

export class HomeScreen extends React.Component {
  state = {
    token: '',
    latitude: 0,
    longitude: 0,
    isShare: false,
  };
  watchId = null;

  componentWillUnmount = () => {
    this.setState({isShare: false});
    if (!this.watchId) {
      Geolocation.clearWatch(this.watchId);
      Geolocation.stopObserving();
    }
  };

  componentDidUpdate = () => {};

  setToken = token => {
    storeData('@token', token).then(() => this.setState({token: token}));
  };

  geoLocation = () => {
    const {isShare} = this.state;

    if (isShare) {
      this.watchId = Geolocation.watchPosition(
        success => {
          console.log(success); //TO CHECK LOCATION IN CONSOLE
          addUserCoordinate({
            xCoordinate: success.coords.latitude,
            yCoordinate: success.coords.longitude,
          })
            .then(res => console.log(res))
            .catch(err => {
              console.log(err);
            });
        },
        error => console.log(error),
        {enableHighAccuracy: true},
      );
    } else {
      Geolocation.clearWatch(this.watchId);
      Geolocation.stopObserving();
      this.watchId = null;
    }
  };

  render() {
    if (!this.state.token) {
      return <LoginPage setToken={this.setToken} />;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchableButton}
          onPress={() =>
            this.setState({isShare: !this.state.isShare}, this.geoLocation)
          }>
          {this.state.isShare ? (
            <Text style={styles.textButton}>Zakończ</Text>
          ) : (
            <Text style={styles.textButton}>Zlokalizuj</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C0826',
  },
  touchableButton: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 300,
    borderColor: '#8D009B',
    borderWidth: 6,
  },
  textButton: {
    fontSize: 30,
    padding: 2,
    fontWeight: 'bold',
    color: 'white',
  },
});
