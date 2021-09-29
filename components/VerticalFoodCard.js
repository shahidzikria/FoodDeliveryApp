import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Text,

} from "react-native";

import { COLORS, FONTS, SIZES, icons } from "../constants"

class VerticalFoodCard extends Component {
    containerStyle = this.props.containerStyle
    item = this.props.item
    onPress = this.props.onPress
    render() {
        return (
            <TouchableOpacity
                style={{
                    width: 200,
                    padding: SIZES.radius,
                    alignItems: "center",
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                    ...this.containerStyle

                }}
                onPress={this.onPress}
            >
                {/* Calories and favourite*/}
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image
                            source={icons.calories}
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />

                        <Text style={{
                            color: COLORS.darkGray2, ...FONTS.body5
                        }}>
                            {this.item.calories + " Calories"}
                        </Text>
                    </View>
                    <Image
                        source={icons.love}
                        style={{
                            width: 20, height: 20,
                            tintColor: this.item.isFavourite ? COLORS.primary : COLORS.gray
                        }}

                    />
                </View>

                {/* Image */}
                <View
                    style={{
                        height: 150,
                        width: 150,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >

                    <Image
                        source={this.item.image}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </View>

                {/* Information */}

                <View
                    style={{
                        alignItems: "center",
                        marginTop: -20
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>{this.item.name}</Text>
                    <Text style={{ color: COLORS.darkGray2, textAlign: "center", ...FONTS.body5 }}>{this.item.description}</Text>
                    <Text style={{ marginTop: SIZES.radius, ...FONTS.h2 }} >{"$" + this.item.price}</Text>

                </View>

            </TouchableOpacity>
        )
    }
}

export default VerticalFoodCard;