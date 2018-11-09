import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';


const ShopList = props => {
  return (
    <Touchable
      style={styles.option}
      background={Touchable.Ripple('#ccc', false)}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Image
            source={require('../assets/images/shop-icon.png')}
            resizeMode="contain"
            fadeDuration={0}
            style={{ width: 32, height: 32, marginTop: -3 }}
          />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>
            {props.name}
          </Text>
        </View>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});

export default ShopList;