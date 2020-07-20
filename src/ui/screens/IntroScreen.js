import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import React, { Component } from 'react';
import {
    Image, Platform,
    Pressable, StyleSheet,



    Text, View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { AsyncStorageKeys, Colors, IntroScreenImages, NavigationRouteNames, Strings } from "./../../Utility/Constants";


export default class IntroScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView bounces={false}>
                    <Swiper containerStyle={styles.swiper}
                        loop={false}
                        index={1}
                        dotColor="rgba(255,255,255,0.3)"
                        activeDotColor="white" >
                        {
                            IntroScreenImages.map((item) => {
                                return (
                                    <Image
                                        key={() => item.key}
                                        source={{ uri: item.uri }}
                                        style={styles.swiperImage} />
                                )
                            })
                        }
                    </Swiper>
                    <View style={styles.descriptionContainer}>
                        <View style={styles.descriptionHeaderContainer}>
                            <Text style={{ fontSize: Platform.OS === "ios" ? 34 : 30 }}>
                                {Strings.introscreen_description_header_welcome_to}
                                <Text style={{ fontWeight: 'bold' }}> {Strings.introscreen_description_header_shop_cart}</Text>
                            </Text>
                        </View>
                        <Text style={styles.descriptionContent}>
                            {Strings.introscreen_description_content}
                        </Text>
                    </View>
                </ScrollView>
                <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? Colors.app_color_blue : Colors.app_color_dark_blue }, styles.gettingStartedButton]}
                    onPress={() => this.navigateToCustomerRegistration()}
                >
                    <View>
                        <Text style={styles.gettingStartedButtonText}>
                            {Strings.introscreen_get_started_button.toUpperCase()}
                        </Text>
                    </View>
                </Pressable>

            </View>
        );
    }

    navigateToCustomerRegistration() {
        AsyncStorage.setItem(AsyncStorageKeys.intro_screen_visited, "true")
            .then(() => {
                this.props.navigation.dispatch(
                    StackActions.replace(NavigationRouteNames.RootStackNavigator.CustomerRegistration)
                );
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    swiper: {
        height: Platform.OS === "ios" ? 500 : 400,
        marginBottom: Platform.OS === "ios" ? 15 : 10,
    },
    swiperImage: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    descriptionContainer: {
        flex: 1,
    },
    descriptionHeaderContainer: {
        marginVertical: Platform.OS === "ios" ? 25 : 10,
        alignItems: 'center'
    },
    descriptionContent: {
        paddingHorizontal: Platform.OS === "ios" ? 30 : 20,
        fontSize: Platform.OS === "ios" ? 24 : 22,
        color: 'grey',
        textAlign: 'center'
    },
    gettingStartedButton: {
        height: Platform.OS === "ios" ? 60 : 50,
        justifyContent: 'center',
        marginBottom: Platform.OS === "ios" ? 25 : 0,
        marginHorizontal: Platform.OS === "ios" ? 10 : 0,
    },
    gettingStartedButtonText: {
        color: 'white',
        fontSize: Platform.OS === "ios" ? 20 : 18,
        fontWeight: Platform.OS === "ios" ? '700' : 'bold',
        textAlign: 'center'
    }
});
