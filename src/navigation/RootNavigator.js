import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { setNavigatorRoutesForAlreadyVisitedUser, setNavigatorRoutesForPreLoggedInUser } from '../redux/actions/NavigationActions';
import CustomerRegistration from '../ui/screens/customer-registration/CustomerRegistration';
import IntroScreen from '../ui/screens/IntroScreen';
import { AsyncStorageKeys, NavigationRouteNames } from '../Utility/Constants';
import DrawerNavigator from './DrawerNavigator';

const mapStateToProps = (state) => ({
    hasVisitedIntro: state.navigation.hasVisitedIntro,
    isLoading: state.navigation.isLoading,
    isSignout: state.navigation.isSignout,
    userToken: state.navigation.userToken,
})

const Stack = createStackNavigator();

const RootNavigator = props => {
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let authToken;
            let isIntroVisited;
            try {
                let keyValuePairArray = await AsyncStorage.multiGet([
                    AsyncStorageKeys.auth_token,
                    AsyncStorageKeys.intro_screen_visited
                ]);
                authToken = keyValuePairArray[0][1];
                isIntroVisited = keyValuePairArray[1][1];
            } catch (e) {
                console.log("token not found", e)
            }
            props.setNavigatorRoutesForPreLoggedInUser(authToken)
            props.setNavigatorRoutesForAlreadyVisitedUser(isIntroVisited);
        };
        bootstrapAsync();
    }, []);

    if (!props.isLoading) {
        setTimeout(() => {
            SplashScreen.hide();
        }, Platform.OS == "android" ? 2000 : 500);
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerTransparent: true,
                headerTitle: null,
                animationTypeForReplace: 'push'
            }} >
                {
                    (props.userToken != null && props.userToken != undefined) ?
                        <Stack.Screen
                            name={NavigationRouteNames.RootStackNavigator.DashboardHome}
                            component={DrawerNavigator}
                            options={{
                                header: () => null,
                                gestureEnabled: false,
                                animationTypeForReplace: 'push'
                            }}
                        />
                        :
                        props.hasVisitedIntro ?
                            (<Stack.Screen
                                name={NavigationRouteNames.RootStackNavigator.CustomerRegistration}
                                component={CustomerRegistration}
                                options={{
                                    header: () => null,
                                    gestureEnabled: false,
                                }}
                            />)
                            :
                            (<>
                                <Stack.Screen
                                    name={NavigationRouteNames.RootStackNavigator.IntroScreen}
                                    component={IntroScreen}
                                    options={{
                                        header: () => null,
                                        gestureEnabled: false,
                                        animationTypeForReplace: props.isSignout ? 'pop' : 'push'
                                    }}
                                />
                                <Stack.Screen
                                    name={NavigationRouteNames.RootStackNavigator.CustomerRegistration}
                                    component={CustomerRegistration}
                                    options={{
                                        header: () => null,
                                        gestureEnabled: false,
                                    }}
                                />
                            </>
                            )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    setNavigatorRoutesForAlreadyVisitedUser: flag => dispatch(setNavigatorRoutesForAlreadyVisitedUser(flag)),
    setNavigatorRoutesForPreLoggedInUser: authToken => dispatch(setNavigatorRoutesForPreLoggedInUser(authToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator)