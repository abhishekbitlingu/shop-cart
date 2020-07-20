import { Container, Header, Icon, Left, Right, View } from 'native-base';
import React, { Component } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    Platform
} from 'react-native';
import { Col, Grid, Row } from "react-native-easy-grid";
import Swiper from 'react-native-swiper';
import { Colors, DashboardBannerImages, NavigationRouteNames, staggeredGridImages, Strings, DrawerNavigationSections } from '../../../../Utility/Constants';

export default class Dashboard extends Component {

    navigateToListingPage(type, params) {
        this.props.navigation.navigate(type, params)
    }

    render() {
        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Icon name="menu" type="MaterialIcons"
                            style={styles.headerLeftNav}
                            onPress={() => {
                                this.props.navigation.openDrawer()
                            }} />
                    </Left>
                    <Text style={styles.headerText}>
                        Shop
                        <Text style={{ color: Colors.app_color_green }}>Cart</Text>
                    </Text>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <Swiper containerStyle={styles.swiper}
                        autoplay={true}
                        loop={true}
                        index={1}
                        dotColor="rgba(255,255,255,0.3)"
                        activeDotColor="white" >
                        {
                            DashboardBannerImages.map((item) => {
                                return (
                                    <Image
                                        key={() => item.key}
                                        source={{ uri: item.uri }}
                                        style={styles.swiperImage} />
                                )
                            })
                        }
                    </Swiper>
                    <View style={styles.staggeredGridContainer}>
                        <Grid>
                            <Row size={2}>
                                <Col size={1}>
                                    <Pressable style={styles.gridItem} onPress={() => this.navigateToListingPage(NavigationRouteNames.HomeStackNavigator.ProductListing, {
                                        headerText: Strings.dashboard_kids_wear,
                                        tabs: DrawerNavigationSections[2].children,
                                        initialPageIdex: 0
                                        })}>
                                        <Image
                                            key={() => item.key}
                                            source={{ uri: staggeredGridImages.kids_wear_image_url }}
                                            style={styles.gridItem}
                                        />
                                        <View style={{ position: 'absolute', bottom: 10, right: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10 }}>
                                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                                {Strings.dashboard_kids_wear}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </Col>
                                <Col size={1}>
                                    <Row>
                                        <Pressable style={styles.gridItem} onPress={() => this.navigateToListingPage(NavigationRouteNames.HomeStackNavigator.ProductListing, {
                                            headerText: Strings.dashboard_mens_wear,
                                            tabs: DrawerNavigationSections[0].children,
                                            initialPageIdex: 0
                                            })}>
                                            <Image
                                                key={() => item.key}
                                                source={{ uri: staggeredGridImages.mens_wear_image_url }}
                                                style={styles.gridItem}
                                            />
                                            <View style={{ position: 'absolute', bottom: 30, right: 40, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10 }}>
                                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                                    {Strings.dashboard_mens_wear}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    </Row>
                                    <Row>
                                        <Pressable style={styles.gridItem} onPress={() => this.navigateToListingPage(NavigationRouteNames.HomeStackNavigator.ProductListing, {
                                            headerText: Strings.dashboard_womens_wear,
                                            tabs: DrawerNavigationSections[1].children,
                                            initialPageIdex: 0
                                            })}>
                                            <Image
                                                key={() => item.key}
                                                source={{ uri: staggeredGridImages.womens_wear_image_url }}
                                                style={styles.gridItem}
                                            />
                                            <View style={{ position: 'absolute', bottom: 10, right: 30, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10 }}>
                                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                                    {Strings.dashboard_womens_wear}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    </Row>
                                </Col>
                            </Row>
                            <Row size={1}>
                                <Pressable style={styles.gridItem} onPress={() => this.navigateToListingPage(NavigationRouteNames.HomeStackNavigator.ProductListing, {
                                    headerText: Strings.dashboard_accesories,
                                    tabs: DrawerNavigationSections[2].children,
                                    initialPageIdex: 0
                                    })}>
                                    <Image
                                        key={() => item.key}
                                        source={{ uri: staggeredGridImages.accesories_image_url }}
                                        style={styles.gridItem}
                                    />
                                    <View style={{ position: 'absolute', bottom: 20, right: 100, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10 }}>
                                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                            {Strings.dashboard_accesories}
                                        </Text>
                                    </View>
                                </Pressable>
                            </Row>
                        </Grid>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    swiper: {
        flex: 1
    },
    swiperImage: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    staggeredGridContainer: {
        flex: 2,
    },
    headerLeftNav: {
        color: 'rgb(51,51,51)',
    },
    headerText: {
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: 26,
        color: Colors.app_color_blue,
    },
    gridItem: {
        flex: 1,
    },
});
