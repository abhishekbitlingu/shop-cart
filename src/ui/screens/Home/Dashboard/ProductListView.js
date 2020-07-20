import { Card, Icon } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Colors, DrawerNavigationSections, FileDummyData, Strings } from './../../../../Utility/Constants';


// const mapStateToProps = state => ({
//     isLoading: false,
//     dataArray: state.products.data,
//     itemsLiked: state.products.itemsLiked,
//     error: null
// })

export default class ProductListView extends Component {
    constructor(props) {
        super(props);
        // Prefer Using Redux instead for state management
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        // make api call using saga, for now using local hardcoded json data
        console.log("ProductListView componentDidMount called");
        let data = this.getData()
        this.setState({
            data: data
        })
    }
    getData() {
        if (this.props.type == Strings.dashboard_mens_wear) {
            console.log("inside Men's Wear");
            switch (this.props.subType) {
                case "Wallets":
                    return FileDummyData.collectionFile.mens_wear.wallets;
                case "Bagpack":
                    return FileDummyData.collectionFile.mens_wear.bagpacks;
                case "Western wear":
                    return FileDummyData.collectionFile.mens_wear.western;
                case "Traditional wear":
                    return FileDummyData.collectionFile.mens_wear.traditional;
                default: return [];
            }

        } else if (this.props.type == Strings.dashboard_womens_wear) {
            console.log("inside Women's Wear");
            switch (this.props.subType) {
                case "Wallets and Hand Bags": return FileDummyData.collectionFile.womens_wear.wallets;
                case "Western wear": return FileDummyData.collectionFile.womens_wear.western;
                case "Jewellery": return FileDummyData.collectionFile.womens_wear.jewellery;
                default: return [];
            }
        } else if (this.props.type == Strings.dashboard_kids_wear) {
            console.log("inside Kid's Wear");
            switch (this.props.subType) {
                case "Night Wear": return FileDummyData.collectionFile.kids_wear.night;
                case "Party Wear": return FileDummyData.collectionFile.kids_wear.party;
                case "Traditional Wear": return FileDummyData.collectionFile.kids_wear.traditional;
                default: return [];
            }
        } else if (this.props.type == DrawerNavigationSections[3].header) {
            console.log("inside Accesories");
            switch (this.props.subType) {
                case "Sunglasses": return FileDummyData.collectionFile.accesories.sunglasses;
                case "Caps": return FileDummyData.collectionFile.accesories.caps;
                case "Belts": return FileDummyData.collectionFile.accesories.belts;
                default: return [];
            }
        } else {
            console.log("inside else part");
            return [];
        }

    }

    render() {
        console.log(" this.props.type = ", this.props.type);
        return (
            <View style={styles.container}>
                {
                    this.state.data && this.state.data.length > 0 ? <FlatList
                        style={{ flex: 1, alignSelf: 'stretch' }}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        data={this.state.data}
                        renderItem={this._renderItem}
                        numColumns={2}
                        removeClippedSubviews={false}
                    />
                        : <Text style={styles.errorText}>No Data found</Text>
                }
            </View>
        );
    }

    _renderItem(item, index) {
        console.log("Item rendering for id = " + JSON.stringify(item));
        return (
            <TouchableHighlight >
                <Card style={{ flex: 1, alignSelf: 'stretch', width: 200, height: 320 }}>
                    <View style={{ alignSelf: 'stretch' }}>
                        <Image source={{ uri: item.item.imageUrl }} style={{ width: "100%", aspectRatio: 0.9, alignSelf: 'stretch' }} />
                    </View>
                    <View style={{ flex: 1, alignSelf: 'stretch', padding: 5 }}>
                        <Text style={{ flex: 1, color: 'grey', fontSize: 16, justifyContent: 'center', paddingHorizontal: 5 }}>
                            {item.item.name}
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ flex: 1, color: Colors.app_color_blue, fontSize: 20, alignItems: 'center', paddingHorizontal: 5 }}>
                                {(item.item.discount_price) ? item.item.discount_price : item.item.original_price}
                            </Text>
                            <Text style={{ flex: 1, color: 'grey', padding: 3, fontSize: 17, textDecorationLine: 'line-through', justifyContent: 'center', paddingHorizontal: 5 }}>
                                {(item.item.discount_price) ? item.item.original_price : null}
                            </Text>
                            <Icon style={{ color: 'rgba(0,0,0,0.4)', fontSize: 22, paddingHorizontal: 5 }} name="heart-outline" />
                        </View>
                    </View>

                </Card>
            </TouchableHighlight>

        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.app_color_green,
    },
})