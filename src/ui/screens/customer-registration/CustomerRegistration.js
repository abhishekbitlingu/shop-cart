import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { Body, Container, Header, Text, Title, View, Tabs, Tab, TabHeading } from 'native-base';
import React, { Component } from 'react';
import { Image, Platform, Pressable, StatusBar, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { signInUser, signUpUser } from '../../../redux/actions/UserActions';
import AppUtilities from '../../../Utility/AppUtilities';
import { AsyncStorageKeys, Colors, ErrorMessages, Strings } from '../../../Utility/Constants';
import LoginForm from '../../forms/LoginForm';
import SignUpForm from '../../forms/SignUpForm';
import { setNavigatorRoutesForPreLoggedInUser } from './../../../redux/actions/NavigationActions';
import { hideHUDLoading, showHUDLoading } from './../../custom/UniversalLoader';
const mapStateToProps = state => ({
    credentials: state.customerRegistration.credentials,
    userData: state.customerRegistration.userData,
    isLoading: state.customerRegistration.isLoading,
    error: state.customerRegistration.error,
});

const mapDispatchToProps = dispatch => ({
    signInUser: userCredentials => dispatch(signInUser(userCredentials)),
    signUpUser: userDetails => dispatch(signUpUser(userDetails)),
    setNavigatorRoutesForPreLoggedInUser: authToken => dispatch(setNavigatorRoutesForPreLoggedInUser(authToken))
});

class CustomerRegistration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSwiperIndex: 0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.checkAndNavigateToHomePage();
    }

    checkAndNavigateToHomePage() {
        if (!this.props.isLoading) {
            hideHUDLoading();
            if (this.props.userData != null) {
                AsyncStorage.setItem(AsyncStorageKeys.auth_token, this.props.userData.authtoken)
                    .then(() => {
                        this.props.setNavigatorRoutesForPreLoggedInUser(this.props.userData.authtoken)
                    })
            } else if (this.props.error != null) {
                AppUtilities.showAlert(this.props.error);
            }
        } else {
            showHUDLoading();
            if (this.props.credentials != null || this.props.userData != null) {
                // show loader
            }
        }
    }

    render() {
        return (
            <Container>
                <Header transparent style={styles.header}>
                    <StatusBar backgroundColor="white" barStyle={"dark-content"} />
                    <Image source={{ uri: Platform.OS == "android" ? 'ic_launcher' : 'AppIcon' }} style={styles.headerLogo} />
                    <Body >
                        <Text style={styles.headerText}>
                            Shop
                            <Text style={{ color: Colors.app_color_green, fontSize: 30 }}>cart</Text>
                        </Text>
                    </Body>
                    <Pressable
                        style={styles.skipButton} >
                        <Text style={styles.skipText}>
                            {Strings.customer_registration_skip_button}
                        </Text>
                    </Pressable>
                </Header>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                >
                    <View style={styles.swiperTitleContainer}>
                        <Title style={styles.swiperTitle}>
                            {
                                this.state.currentSwiperIndex == 0 ?
                                    Strings.customer_registration_swiper_title_sign_in
                                    :
                                    Strings.customer_registration_swiper_title_sign_up
                            }
                        </Title>
                    </View>

                    <Tabs
                        tabBarUnderlineStyle={{flex: 0, width: 0,  backgroundColor: Colors.app_color_green}}
                        tabContainerStyle={{width: 0, height: 0}}
                        onChangeTab={(index)=> {
                            this.setState({
                                currentSwiperIndex: index
                            })
                        }}
                         >
                        <Tab heading={""} >
                            <LoginForm
                                onSubmit={this.validateUser}
                                initialValues={{
                                    email: Strings.login_form_initial_value_email,
                                    password: Strings.login_form_initial_value_password,
                                }}
                            />
                        </Tab>
                        <Tab
                            heading={""} >
                            <SignUpForm onSubmit={this.createUser} />
                        </Tab>
                </Tabs>



                    {/* <Swiper
                        style={{}}
                        loop={false}
                        index={this.state.currentSwiperIndex}
                        activeDotColor='transparent'
                        dotColor='transparent'
                        showsButtons={false}
                        onIndexChanged={(newIndex) => {
                            this.setState({
                                currentSwiperIndex: newIndex
                            })
                        }} >
                        <LoginForm
                            onSubmit={this.validateUser}
                            initialValues={{
                                email: Strings.login_form_initial_value_email,
                                password: Strings.login_form_initial_value_password,
                            }}
                        />
                        <SignUpForm onSubmit={this.createUser} />
                    </Swiper> */}
                </KeyboardAwareScrollView>
            </Container>
        );
    }

    validateUser = (values) => {
        const userCredentials = {
            email: values.email.toLowerCase(),
            password: values.password
        }
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                this.props.signInUser(userCredentials);
            } else {
                AppUtilities.showAlert(ErrorMessages.no_working_internet)
            }
        })

    }

    createUser = (values) => {
        let authToken = AppUtilities.createAuthToken();
        const userDetails = {
            name: values.username,
            email: values.email.toLowerCase(),
            contact: values.contact,
            password: values.password,
            authtoken: authToken
        }
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                this.props.signUpUser(userDetails);
            } else {
                AppUtilities.showAlert(ErrorMessages.no_working_internet)
            }
        })
    }
}

const styles = StyleSheet.create({
    header: {
        height: Platform.OS == "android" ? 128 : 64,
        alignItems: 'center',
        marginHorizontal: 15,
    },
    headerLogo: {
        height: 60,
        aspectRatio: 1.0,
        marginRight: Platform.OS == "android" ? 15 : 8,
    },
    headerText: {
        alignSelf: 'flex-start',
        fontWeight: '500',
        fontSize: 30,
        color: Colors.app_color_blue,
    },
    skipButton: ({ pressed }) => [{
        backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'transparent',
        paddingHorizontal: 10,
        borderRadius: 5,
    }],
    skipText: {
        color: 'grey',
        fontSize: 18,
        marginTop: 3,
    },
    swiperTitleContainer: {
        height: Platform.OS == 'ios' ? 180 : 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiperTitle: {
        fontSize: 28,
        color: 'black',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRegistration)