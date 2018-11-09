import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image
} from 'react-native';
const screen = Dimensions.get('window');

const Notification = props => {
    let image
    switch(props.type) {
      case 'bus':
        image = require('../assets/images/bus-marker.png');
        break;
      case 'info':
        image = require('../assets/images/send-info.png');
        break;
        default:
        image = require('../assets/images/notif.png');
    }
    return (
      <View style={styles.container}>
        <View style={props.style==null ? styles.bubble : props.style}>
        {console.log(image)}
            <Image
              source={ image }
              resizeMode="contain"
              fadeDuration={0}
              style={styles.imageBus}
            />
          <Text style={styles.textMsg}>
            {props.message}
          </Text>
          <Text style={styles.textTime}>{props.time}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  bubble: {
    width: screen.width-60,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  textTime: {
    fontSize: 9,
    textAlign: 'right',
    color: '#444',
    marginVertical: -6
  },
  imageBus: {
    width: 20, 
    height: 20,
    position: "absolute",
    right: 8,
    top: 4
  },
  textMsg: {
    width:  screen.width-100,
  }
});

export default Notification;