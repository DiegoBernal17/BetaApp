import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import ShopList from '../components/ShopList';

import * as firebase from 'firebase';

const shopRef = firebase.database().ref("shops");

export default class ShopsScreen extends React.Component {
  static navigationOptions = {
    title: 'Tiendas Registradas',
  };

  constructor(props) {
    super(props);
    this.state = {
      shops: null
    }

    shopRef.once("value", (snapshot) => {
      this.setState({
        shops: snapshot.val()
      })
    });
  }

  render() {
    let component;
    if(this.state.shops == null) {
      component = <Text>Cargando...</Text>
    } else {
      component = (this.state.shops.map((shop, i) => <ShopList key={i} name={shop.name} /> ))
    }

    return (
      <ScrollView style={styles.container}>
        {component}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
});
