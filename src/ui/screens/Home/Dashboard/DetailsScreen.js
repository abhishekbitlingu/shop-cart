import React, { Component } from 'react';
import { Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { NavigationRouteNames, Colors } from './../../../../Utility/Constants';

export default class DetailScreen extends Component {
    render() {
        return (
            <View style={styles.dummyRouteViewContainer}>
                <Text style={styles.dummyRouteText}>This is {NavigationRouteNames.HomeStackNavigator.Details_Screen}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dummyRouteViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dummyRouteText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.app_color_green,
    },
});
