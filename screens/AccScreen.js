import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as firebase from 'firebase';
import {styles} from '../constants/Styles.js'
import {round} from '../constants/Functions.js'

export default class AccScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      toggleString: "OFF"
    }
    this.start=Date.now();
    this.date = new Date();
    this.dateString = this.date.getFullYear().toString() + "-" + this.date.getMonth().toString() + "-" + this.date.getDate().toString()

  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this._subscribe();
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
    Accelerometer.setUpdateInterval(1000);
  };

  _fast = () => {
    Accelerometer.setUpdateInterval(100);
  };

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({
        data: accelerometerData
      });
      firebase.database().ref("accelerometer/"+this.dateString + "/" + (Date.now()-this.start).toString()).set({
        x: accelerometerData.x,
        y: accelerometerData.y,
        z: accelerometerData.z
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





