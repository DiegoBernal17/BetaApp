import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/MapScreen';
import ShopsScreen from '../screens/ShopsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const MapStack = createStackNavigator({
  Home: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Mapa',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-map${focused ? '' : '-outline'}`
          : 'md-map'
      }
    />
  ),
};

const ShopsStack = createStackNavigator({
  Shops: ShopsScreen,
});

ShopsStack.navigationOptions = {
  tabBarLabel: 'Negocios',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-pricetag${focused ? '' : '-outline'}` : 'md-pricetag'}
    />
  ),
};

const NotificationsStack = createStackNavigator({
  Notifications: NotificationsScreen,
});

NotificationsStack.navigationOptions = {
  tabBarLabel: 'Notificaciones',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-notifications${focused ? '' : '-outline'}` : 'md-notifications'}
    />
  ),
};

export default createBottomTabNavigator({
  MapStack,
  ShopsStack,
  NotificationsStack,
});
