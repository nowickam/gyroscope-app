import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import * as firebase from 'firebase';

export default function HomeScreen() {
  const [data, setData] = useState({});
  const date=new Date();
  const dateString=date.getFullYear().toString()+"-"+date.getMonth().toString()+"-"+date.getDate().toString();

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  const _subscribe = () => {
    this._subscription = Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
      firebase.database().ref(dateString+"/"+Date.now()).set({
        x: gyroscopeData.x,
        y: gyroscopeData.y,
        z: gyroscopeData.z
      })
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;
  return (
    <View style={styles.sensor}>
      <Text style={styles.text}>Gyroscope:</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={_toggle} style={styles.button}>
          <Text>Toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 1000) / 1000;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
});

HomeScreen.navigationOptions = {
  header: null,
};


