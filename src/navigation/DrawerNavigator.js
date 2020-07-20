import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import DrawerContent from '../ui/custom/DrawerContent';
import { Colors, NavigationRouteNames } from '../Utility/Constants';
import HomeStackNavigator from './HomeStackNavigator';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0))
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  })

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 10]
  })
  const screenStyles = { borderRadius, transform: [{ scale }] };
  return (
    <Drawer.Navigator
      overlayColor="transparent"
      drawerType="slide"
      initialRouteName={NavigationRouteNames.DrawerNavigator.BottomTab}
      drawerStyle={styles.drawerStyle}
      sceneContainerStyle={styles.drawerSceneContainer}
      drawerContent={props => {
        setProgress(props.progress);
        return (<DrawerContent {...props} />)
      }}>
      <Drawer.Screen name={NavigationRouteNames.DrawerNavigator.HomeStackNavigator}>
        {
          props => <HomeStackNavigator {...props} style={screenStyles} />
        }
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({

  drawerStyle: {
    width: Platform.OS == "ios" ? "60%" : "50%",
    backgroundColor: Colors.app_color_blue,
  },
  drawerSceneContainer: {
    backgroundColor: Colors.app_color_blue,
  }
})

export default DrawerNavigator