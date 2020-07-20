import { Container, Header, Left, Tab, Tabs, Icon, ScrollableTab, Body, Title, Right, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import ProductListView from './ProductListView';
import { Colors } from '../../../../Utility/Constants';

export default class ProductListing extends Component {

    componentDidMount() {
        // make API call
    }

    render() {
        console.log(this.props.route.params.tabs)
        let tabs = this.props.route.params.tabs
        return (
            <Container>
                <Header hasTabs transparent>
                    <Left style={{flex: 0}}>
                        <Icon name="chevron-back" type="Ionicons"
                            style={styles.headerLeftNav}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }} />
                    </Left>
                    <Body style={{flex: 1}}>
                        <Text style={{fontSize: 22, paddingTop: Platform.OS == "ios" ? 5 : 0, fontWeight: '500', alignSelf: 'center'}}>{this.props.route.params.headerText}</Text>
                    </Body>
                    <Right style={{flex: 0}}>
                    <Icon name="settings" type="Octicons"
                        style={styles.headerLeftNav}/>
                    </Right>
                </Header>
                <Tabs 
                initialPage={this.props.route.params.initialPageIdex}
                tabBarUnderlineStyle={{backgroundColor: Colors.app_color_green}}
                renderTabBar={() => <ScrollableTab backgroundColor={"transparent"}/>}>
                    {tabs.map((child) => {
                        return (
                            <Tab
                            activeTabStyle={{backgroundColor: 'white'}}
                            tabStyle={{backgroundColor: 'white'}}
                            textStyle={{color: 'grey'}}
                            activeTextStyle={{color: Colors.app_color_blue, fontWeight: 'bold'}}
                            heading={child} >
                                <ProductListView type={this.props.route.params.headerText} subType={child} />
                            </Tab>
                        )
                    })}
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    headerLeftNav: {
        color: 'rgba(51,51,51,0.5)',
    },
})