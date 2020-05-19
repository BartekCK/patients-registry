import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LoginPage} from './components/LoginPage';
import {storeData} from './helpers/storage/storage';
import {addUserCoordinate} from './helpers/apiCommands';
import {PERMISSIONS, request} from 'react-native-permissions';

export class HomeScreen extends React.Component {
  state = {
    token: '',
    xCoordinate: 0,
    yCoordinate: 0,
    isShare: false,
    helpMe: false,
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

  changeHelp = () => {
    this.setState({...this.state, helpMe: !this.state.helpMe}, () => {
      addUserCoordinate({
        ...this.state,
        helpMe: this.state.helpMe,
      })
        .then(res => console.log(res))
        .catch(err => {
          console.log(err);
        });
    });
  };

  geoLocation = async () => {
    const {isShare} = this.state;

    if (Platform.OS === 'android') {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log(response);
    }

    if (isShare) {
      this.watchId = Geolocation.watchPosition(
        success => {
          console.log(success); //TO CHECK LOCATION IN CONSOLE
          this.setState(
            {
              ...this.state,
              xCoordinate: success.coords.latitude,
              yCoordinate: success.coords.longitude,
            },
            () => {
              addUserCoordinate({
                ...this.state,
                xCoordinate: success.coords.latitude,
                yCoordinate: success.coords.longitude,
              })
                .then(res => console.log(res))
                .catch(err => {
                  console.log(err);
                });
            },
          );
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

  setHelp = coordinateInformation => {
    this.setState({...coordinateInformation});
  };

  render() {
    if (!this.state.token) {
      return <LoginPage setHelp={this.setHelp} setToken={this.setToken} />;
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

        <TouchableOpacity onPress={this.changeHelp}>
          {this.state.helpMe ? (
            <Text style={styles.textButton}>Zakończ pomoc</Text>
          ) : (
            <Text style={styles.textButton}>Zawołaj o pomoc</Text>
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
    marginVertical: 100,
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
