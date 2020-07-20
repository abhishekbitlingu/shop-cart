import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Text, View } from 'native-base';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Dashboard from '../ui/screens/Home/Dashboard/Dashboard';
import HotOffer from '../ui/screens/Home/HotOffer';
import MyCart from '../ui/screens/Home/MyCart';
import Profile from '../ui/screens/Home/Profile';
import Search from '../ui/screens/Home/Search';
import { Colors, NavigationRouteNames } from './../Utility/Constants';
const Tab = createBottomTabNavigator();

function BottomTabNavigator({ navigation }) {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            let type;
            if (route.name === NavigationRouteNames.BottomTabNavigator.Home) {
              iconName = 'home-outline';
              type = 'Ionicons'
            } else if (route.name === NavigationRouteNames.BottomTabNavigator.Hot_Offer) {
              iconName = 'local-offer';
              type = 'MaterialIcons'
            } else if (route.name === NavigationRouteNames.BottomTabNavigator.My_cart) {
              iconName = 'bag';
              type = 'SimpleLineIcons'
            } else if (route.name === NavigationRouteNames.BottomTabNavigator.Search) {
              iconName = 'search1';
              type = 'AntDesign'
            } else if (route.name === NavigationRouteNames.BottomTabNavigator.Profile) {
              iconName = 'user';
              type = 'SimpleLineIcons'
            }
            if (route.name === NavigationRouteNames.BottomTabNavigator.My_cart) {
              return (<View style={styles.badgeIconContainer}>
                <Icon
                  name={iconName}
                  type={type}
                  style={{ color: (focused) ? 'white' : 'rgba(255,255,255,0.6)' }} />
                {
                  (2 > 0) && (
                    <View
                      style={styles.badge} >
                      <Text style={styles.badgeText}>
                        2
                      </Text>
                    </View>
                  )
                }
              </View>);
            } else {
              return <Icon
                name={iconName}
                type={type}
                style={{ color: (focused) ? 'white' : 'rgba(255,255,255,0.6)' }} />;
            }
          },
        })}
        tabBarOptions={{
          activeBackgroundColor: Colors.app_color_blue,
          inactiveBackgroundColor: 'rgb(51,51,51)',
          activeTintColor: 'white',
          inactiveTintColor: 'rgba(255,255,255,0.7)',
          tabStyle: styles.tabStyle,
          labelStyle: styles.labelStyle,
        }} >
        <Tab.Screen name={NavigationRouteNames.BottomTabNavigator.Home}
          component={Dashboard} />
        <Tab.Screen name={NavigationRouteNames.BottomTabNavigator.Hot_Offer}
          component={HotOffer} />
        <Tab.Screen name={NavigationRouteNames.BottomTabNavigator.My_cart}
          component={MyCart} />
        <Tab.Screen name={NavigationRouteNames.BottomTabNavigator.Search}
          component={Search} />
        <Tab.Screen name={NavigationRouteNames.BottomTabNavigator.Profile}
          component={Profile} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    flex: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 12,
      height: 12,
    },
    overflow: Platform.OS == "android" ? "hidden" : "visible",
    shadowOpacity: 0.5,
    shadowRadius: 16.00,
    elevation: 24,
  },
  badgeIconContainer: {
    flex: 1,
    marginTop: 7,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: Colors.app_color_green,
    borderRadius: 6,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabStyle: {
    flex: 1,
    alignSelf: 'stretch',
    height: Platform.OS == 'ios' ? 100 : 150,
    paddingBottom: Platform.OS == 'ios' ? 40 : 105,
  },
  labelStyle: {
    fontWeight: 'bold',
  }
})

export default BottomTabNavigator;