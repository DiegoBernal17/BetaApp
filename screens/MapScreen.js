import React from 'react';
import {
    View,
    Dimensions,
    Text
} from 'react-native';
import * as firebase from 'firebase';
import requestLocationPermission from '../config/requestLocationPermission';
import Map from '../components/Map';
import SelectCombi from '../components/SelectCombi';
require ('../config/firebase_config');
require ('../assets/data/routes.json');

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.016590208942925955;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const shopRef = firebase.database().ref("shops");

console.ignoredYellowBox = ['Setting a timer'];
export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        trayectoria = this.trayectoria.bind(this);

        shopRef.once("value", (snapshot) => {
            this.setState({
                shops: snapshot.val()
            })
        });
    }

    componentDidMount() {
        requestLocationPermission();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            },
            (error) => this.setState({ error: error.message })
        );
    }

    getInitialState() {
        return {
            showMap: false,
            region: {
                latitude: 25.418924,
                longitude: -101.000013,
                latitudeDelta: 0.04264815546284595,
                longitudeDelta: 0.037773214280591105,
            }                                                                               
        };
    }

    handleSelect = (ruta) => {
        if(ruta > 0) {
            this.trayectoria(ruta);
        }
    } 

    handleChangeRuta = () => {
        this.setState({ showMap: false});
    }

    render() {
        let component;
        if(this.state.showMap) {
            if(this.state.trayectoria != null) {
                component = <Map region={this.state.region} trayectoria={this.state.trayectoria} route={this.state.route} shops={this.state.shops} error={this.state.error} onChangeRuta={this.handleChangeRuta}/>
            } else {
                component = <Text>Cargando...</Text>
            }
        } else {
            component = <SelectCombi onSelectCombi={this.handleSelect} />;
        }
        return ( 
            <View>
                {component}
            </View>);
    }

    trayectoria = (ruta) => {
        hora = new Date() 
        let trajectoryRef = firebase.database().ref("/routes/"+ruta+"/trajectory");
        trajectoryRef.once('value', (snap) => {
            let trayectoria = snap.val();
            this.setState({
                trayectoria: trayectoria,
                route: ruta,
                showMap: true
            })
            trayectoria.forEach((combi, i) => {
                if(i != 0 && i%12 == 0)
                    this.updateCombis(ruta, i, 
                        (typeof trayectoria[hora.getMinutes()+i] !== 'undefined' ? trayectoria[hora.getMinutes()+i] : trayectoria[hora.getMinutes()]) );
            });
        });
    }

    updateCombis = (route, i, trajectory) => {
        if(typeof trajectory === 'undefined') {
            trajectory = this.state.trajectory[4]
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
}
