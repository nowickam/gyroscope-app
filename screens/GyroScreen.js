import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import * as firebase from 'firebase';
import { styles } from '../constants/Styles.js'
import { round } from '../constants/Functions.js'

export default class GyroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      toggleString: "OFF"
    }
    this.start = null;
    this.date = new Date();
    this.dateString = this.date.getFullYear().toString() + "-" + this.date.getMonth().toString() + "-" + this.date.getDate().toString()
    this.isFirst=true;
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this._subscribe();
    Gyroscope.setUpdateInterval(5000);
  }

  componentWillUnmoundatet() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
      this.setState({toggleString: "ON"});
    } else {
      this._subscribe();
      this.setState({toggleString: "OFF"});
    }
  };

  _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  _fast = () => {
    Gyroscope.setUpdateInterval(100);
  };

  _subscribe = () => {
    this._subscription = Gyroscope.addListener(gyroscopeData => {
      this.setState({
        data: gyroscopeData
      });
      if(this.isFirst){
        this.start=Date.now()
        this.isFirst=false
      }
      firebase.database().ref("gyroscope/" + this.dateString + "/" + (Date.now() - this.start).toString()).set({
        x: gyroscopeData.x,
        y: gyroscopeData.y,
        z: gyroscopeData.z
      })
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.sensor}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text style={styles.buttonText}>{this.state.toggleString}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text style={styles.buttonText}>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text style={styles.buttonText}>Fast</Text>
          </TouchableOpacity>
        </View>

        {this.state.data !== null && <View style={styles.dataContainer}>
          <Text style={styles.dataText}>x: {round(this.state.data.x)}</Text>
          <Text style={styles.dataText}>y: {round(this.state.data.y)}</Text> 
          <Text style={styles.dataText}>z: {round(this.state.data.z)}</Text>
        </View>}

      </View>
    );
  }
}







