import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Button,
    Modal,
    Alert
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import mapStyles from '../assets/data/mapStyles.json';
import * as firebase from 'firebase';
require ('../config/firebase_config');

const screen = Dimensions.get('window');

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buses: null,
      modalVisible: false,
      onBus: false
    }
    changeOnBus = this.changeOnBus.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    busesRef = firebase.database().ref("/buses/"+this.props.route)
    busesRef.on("value", snapshot =>
      this.setState({ buses: snapshot.val() })
    );
    setInterval(() => this.combis(),40000)
  }

  combis = () => {
  let hora = new Date();
    console.log("checando..");
    trayectoria = this.props.trayectoria;
    trayectoria.forEach((combi, i) => {
      if(i != 0 && i%12 == 0)
          this.updateCombis(this.props.route, i, 
              (typeof trayectoria[hora.getMinutes()+i] !== 'undefined' ? trayectoria[hora.getMinutes()+i] : trayectoria[hora.getMinutes()]) );
    });
  }

  updateCombis = (route, i, trajectory) => {
    if(typeof trajectory === 'undefined') {
        trajectory = this.props.trayectoria[4]
    }
    let refBus = firebase.database().ref('buses/'+route+'/'+i);
    refBus.remove();
    refBus.set({
      driver: 'Conductor '+i,
      location: {
          latitude: trajectory.latitude,
          longitude: trajectory.longitude
      },
      rating: (Math.floor(Math.random() * 5)+1)
    });
  }

  handlerClickBus = () =>{
    this.setModalVisible(true);
  }

  changeOnBus = () => {
    this.setState({ onBus: true });
  }
  
  render() {
    const {buses} = this.state;
    let hora = new Date();
    return(
      <View style={ styles.container }>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('La ventana se ha  cerrado.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Ayudanos con esta combi</Text>
                <Text>Hora actual: { hora.getHours()+":"+hora.getMinutes()}</Text>
                <Text>¿Es correcto el tiempo de esa combi?</Text>
                <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title="Correcto"
                color="green"
                accessibilityLabel="Enviar que es correcto"
                />
                <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title="Regresar"
                color="red"
                accessibilityLabel="Cerrar Modal"
                />
              </View>
            </View>
          </Modal>
        <MapView 
        provider={ PROVIDER_GOOGLE }
          style={ styles.map }
          customMapStyle={mapStyles}
          showUserLocation={ true }
          followUserLocation={ true }
          region={ this.props.region }>


          <Marker
              coordinate={ this.props.region }
              title="Estas aquí"
              image={require('../assets/images/here.png')}
          />

          {!!buses && Object.values(buses).map((bus, i) => (
              <Marker
                key={i}
                coordinate={ bus.location }
                title={"R-"+Object.keys(buses)[i]}
                description={"Calificación: "+bus.rating}
                image={require('../assets/images/bus-marker.png')}
                onCalloutPress={this.handlerClickBus}
              />
            ))
          }

          {this.props.shops.map((marker, i) => (
            <Marker
              key={i}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.name}
              description={marker.description}
              image={require('../assets/images/shop-icon.png')}
            />
          ))}
                    
          { this.props.trayectoria != null && (
          <Polyline
            coordinates={this.props.trayectoria}
            strokeColor="#444" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={3}
          />) }
        </MapView>

        { !this.state.onBus && (
          <View style={styles.notifContainer}>
            <Text style={styles.notification}>Tiempo de llegada aprox: 5 min</Text>
          </View>)
        }

        <View style={styles.buttonContainer}>
          <Button color={'rgba(254,234,94,0.6)'} title="¡Ya me subí!" onPress={this.changeOnBus}/>
          <Button color={'rgba(130, 155, 190, 0.6)'} title="Seleccionar otra ruta" onPress={this.props.onChangeRuta}/>
        </View>

        { this.props.error != null && (
          <View style={ styles.error }>
            <Text style={{color:'white'}}>{ this.props.error }</Text>
          </View>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      ...StyleSheet.absoluteFillObject,
      height: screen.height -180,
      width: screen.width+10,
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  map: {
      ...StyleSheet.absoluteFillObject,
  },
  notifContainer: {
    ...StyleSheet.absoluteFillObject,
    marginVertical: 4,
    alignItems: 'center'
  },
  notification: {
    backgroundColor: 'rgba(255,200,0,.5)',
    padding: 6,
    borderRadius: 8,
    height: 30,
    width: 240,
    textAlign: 'center',
    color: '#444'
  },
  buttonContainer: {
    marginVertical: 4,
  },
  error: {
    width: screen.width-50,
    backgroundColor: 'rgba(200, 0,0,0.5)',
    alignItems: 'center',
  }
});

export default Map;