import React from 'react';
import {
  View,
  Text
} from 'react-native';
import Notification from '../components/Notification';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Notificaciones',
  };

  render() {
    return (
      <View style={ {marginTop: 10} }>
        <Notification message="Ruta 7A acercandose" time="7:14" type="bus" />
        <Notification message="Recuerda que puedes enviar información o valorar a los choferes" time="7:00" type="info" />
      </View>
    )
  }
}
