import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
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
      margin: 5,
      paddingHorizontal: 10,
    },
    dataText: {
      textAlign: 'center',
      fontSize: 40
    },
    dataContainer:{
      flexDirection: 'column',
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20
    },
  });