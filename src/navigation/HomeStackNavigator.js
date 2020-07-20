import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import ProductListing from '../ui/screens/Home/Dashboard/ProductListing';
import { NavigationRouteNames } from '../Utility/Constants';
import BottomTabNavigator from './BottomTabNavigator';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const HomeStackNavigator = ({ style, navigation }) => {

    return (
        <Animated.View style={[style, styles.bottomTab]}>
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTitle: null,
                headerLeft: null,
            }}>
            <Stack.Screen
                name={NavigationRouteNames.HomeStackNavigator.Dashboard}
                component={BottomTabNavigator}
            />
            <Stack.Screen
                name={NavigationRouteNames.HomeStackNavigator.ProductListing}
                component={ProductListing}
            />
        </Stack.Navigator>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    bottomTab: {
      flex: 1,
      shadowColor: "#000000",
      shadowOffset: {
        width: 12,
        height: 12,
      },
      elevation: 20
    }
})

export default HomeStackNavigator;