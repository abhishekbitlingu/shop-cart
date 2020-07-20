import AsyncStorage from '@react-native-community/async-storage';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Accordion, Icon, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { setNavigatorRoutesForLogOut } from '../../redux/actions/NavigationActions';
import AppUtilities from '../../Utility/AppUtilities';
import { AsyncStorageKeys, DrawerNavigationSections, Strings, NavigationRouteNames } from '../../Utility/Constants';
import { connect } from 'react-redux';


class DrawerContent extends Component {

    render(props) {
        console.log("this.props = ", this.props)
        return (
            <DrawerContentScrollView
                {...props}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false} >
                <Accordion
                    style={styles.drawerScrollView}
                    dataArray={DrawerNavigationSections}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    contentStyle={styles.drawerScrollViewContent}
                    onAccordionOpen={(item, index) => {
                        this._onAccordionOpen(item, index)
                    }}
                    onAccordionClose={(item, index) => {
                        this._onAccordionOpen(item, index)
                    }}
                />
            </DrawerContentScrollView>
        );
    }

    _renderContent = (item) => {
        if (item.children) {
            return (
                <View style={[
                    {
                        borderBottomWidth: (item.children) ? 0.2 : 0,
                    }
                ], styles.itemContentContainer}>
                    {
                        item.children.map((child, index) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        if (item.children) {
                                            this.props.navigation.closeDrawer();
                                            setTimeout(() => {
                                                this.props.navigation.navigate(NavigationRouteNames.HomeStackNavigator.ProductListing, {
                                                    headerText: item.header,
                                                    tabs: item.children,
                                                    initialPageIdex: index
                                                })
                                            }, 300)
                                        }
                                    }}>
                                    <Text style={styles.itemContentText}>
                                        {child}
                                    </Text>
                                </Pressable>
                            );
                        })
                    }
                </View>
            );
        } else {
            return null
        }

    }

    _renderHeader = (item, expanded) => {
        return (
            <View 
            key={expanded.toString()}
            style={[
                {
                    backgroundColor: (expanded && !item.children && item.header != "Sign out") ?
                        "rgba(51,51,51,0.2)" : "transparent",
                    borderBottomWidth: (expanded && item.children) ? 0 : 0.2,
                }, styles.itemHeaderContainer]}>
                <Text style={styles.itemHeaderText}>
                    {item.header}
                </Text>
                {(item.children != null && (expanded
                    ? <Icon style={styles.headerIcon} name="remove" />
                    : <Icon style={styles.headerIcon} name="add" />))}
            </View>
        );
    }

    onConfirmLogout= () => {
        AsyncStorage.multiRemove([AsyncStorageKeys.auth_token, AsyncStorageKeys.intro_screen_visited])
            .then(() => {
                this.props.dispatch(setNavigatorRoutesForLogOut());
            })
    }

    _onAccordionOpen(item, index) {
        console.log("This.props = " + this.props.dispatch)
        if (item.header == "Sign out") {
            this.props.navigation.closeDrawer()
            AppUtilities.showAlert(Strings.sign_out_alert_message, "Yes", () => this.onConfirmLogout(), "Cancel")
        }
    }
}

const styles = StyleSheet.create({
    drawerScrollView: {
        backgroundColor: 'transparent',
        marginTop: 50,
        marginBottom: 50,
    },
    drawerScrollViewContent: {
        backgroundColor: 'transparent',
    },
    itemContentContainer: {
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: "transparent",
        borderColor: 'rgba(255,255,255, 0.5)',
    },
    itemContentText: {
        fontWeight: "600",
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
    },
    itemHeaderContainer: {
        flexDirection: "row",
        padding: 10,
        paddingVertical: 23,
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: 'rgba(255,255,255, 0.5)',
    },
    itemHeaderText: {
        fontWeight: "600",
        color: 'white',
        paddingHorizontal: 10,
        fontSize: 18,
    },
    headerIcon: {
        fontSize: 22,
        color: 'white',
    },
});

export default connect()(DrawerContent);
