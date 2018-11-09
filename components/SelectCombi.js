import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Picker,
    Dimensions
} from 'react-native';

const screen = Dimensions.get('window');

class SelectCombi extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ruta:0
    };
  }

  render() {
    return(
      <View style={ styles.container }>
        <View style={ styles.center }>
        <Text>Selecciona la ruta:</Text>
        <Picker
          selectedValue={this.state.ruta}
          style={styles.picker}
          onValueChange={(itemValue) => this.setState({ruta: itemValue})}>
              <Picker.Item label="" value="0" />
              <Picker.Item label="Vista IMSS" value="2648" />
              <Picker.Item label="1B" value="1325" />
              <Picker.Item label="2B San Luis" value="1328" />
              <Picker.Item label="4B" value="1333" />
              <Picker.Item label="5A" value="1334" />
              <Picker.Item label="5B" value="1335" />
              <Picker.Item label="7A Directa" value="1337" />
              <Picker.Item label="7A Normal" value="1338" />
              <Picker.Item label="8 Directa" value="1340" />
              <Picker.Item label="8 Moreles Ampliación" value="1339" />
              <Picker.Item label="8A IMSS" value="1341" />
              <Picker.Item label="Colosio" value="3687" />
              <Picker.Item label="Loma Linda" value="2921" />
              <Picker.Item label="Loma Linda Directa" value="2923" />
              <Picker.Item label="Loma Linda Mision" value="2925" />
              <Picker.Item label="Roma IMSS" value="1317" />
              <Picker.Item label="Sub Urbana Garambullo" value="2944" />
              <Picker.Item label="Sub Urbana Presa San Javier" value="2915" />
              <Picker.Item label="Vista Candelarias" value="1305" />
              <Picker.Item label="Vista Centro Castaño" value="1319" />
              <Picker.Item label="Vista Centro Perales" value="2919" />
              <Picker.Item label="18 Colonias" value="1349" />
              <Picker.Item label="18 Herraduras" value="1352" />
              <Picker.Item label="1A" value="2913" />
              <Picker.Item label="2A" value="2914" />
              <Picker.Item label="2B San Ángel" value="1327" />
              <Picker.Item label="2B San Luis" value="2916" />
              <Picker.Item label="Valle Verde" value="1330" />
              <Picker.Item label="3B" value="1331" />
              <Picker.Item label="4A Ampliacion Federico Berrueto Ramón" value="2972" />
              <Picker.Item label="4A Directa" value="2927" />
              <Picker.Item label="6K" value="1310" />
              <Picker.Item label="9" value="1343" />
              <Picker.Item label="9 Magisterio" value="2940" />
              <Picker.Item label="13 A" value="1345" />
              <Picker.Item label="14 Directa" value="2942" />
              <Picker.Item label="18 Directa" value="2950" />
              <Picker.Item label="18 Directa apoyo por hora" value="1350" />
              <Picker.Item label="10" value="1344" />
              <Picker.Item label="14" value="1346" />
              <Picker.Item label="17" value="1348" />
              <Picker.Item label="6" value="1336" />
              <Picker.Item label="Anáhuac" value="1302" />
              <Picker.Item label="Anáhuac Tierras" value="1303" />
              <Picker.Item label="Artega" value="1304" />
              <Picker.Item label="Express" value="1307" />
              <Picker.Item label="Guayulera" value="1308" />
              <Picker.Item label="Inter" value="1309" />
              <Picker.Item label="Los Valdés" value="1301" />
              <Picker.Item label="Mirasierra" value="1312" />
              <Picker.Item label="Periférico Huachichiles" value="1313" />
              <Picker.Item label="Periférico Teresitas" value="1314" />
              <Picker.Item label="Ramos" value="1315" />
              <Picker.Item label="Roma" value="1316" />
              <Picker.Item label="Vista Postal" value="1320" />
              <Picker.Item label="Zaragoza Directa" value="1322" />
          <Picker.Item label="Zaragoza Torre" value="1323" />
          </Picker> 
          <Button 
           onPress={() => this.props.onSelectCombi(this.state.ruta)}
           title="Mostrar Ruta"/>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 60,
    alignItems: 'center'
  },
  center: {
    backgroundColor: 'white',
    padding: 20,
    width: screen.width-60,
    borderRadius: 10
  },
  picker: { 
    height: 60,
    width: screen.width-80
  }
});

export default SelectCombi;