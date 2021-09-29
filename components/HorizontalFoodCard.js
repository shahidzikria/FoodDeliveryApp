import { isTemplateLiteral } from '@babel/types';
import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text, Image
} from "react-native"

import { FONTS, COLORS, SIZES, icons } from "../constants"

class HorizontalFoodCard extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                    ...this.props.containerStyle
                }}
                onPress={this.props.onPress}
            >
                {/* Image */}

                <Image
                    source={this.props.item.image}
                    style={this.props.imageStyle}
                />
                {/* Info */}
                <View
                    style={{
                        flex: 1,
                    }}>
                    {/* name */}
                    <Text
                        style={{ ...FONTS.h3, fontSize: 17 }}>
                        {this.props.item.name}
                    </Text>

                    {/* Description */}
                    <Text
                        style={{
                            color: COLORS.darkGray2,
                            ...FONTS.body4
                        }}>
                        {this.props.item.description}
                    </Text>

                    {/* price */}
                    <Text
                        style={{ marginTop: SIZES.base, ...FONTS.h2 }}>
                        {"$" + this.props.item.price}
                    </Text>

                </View>

                {/* calories */}
                <View
                    style={{
                        flexDirection: "row",
                        position: 'absolute',
                        top: 5,
                        right: SIZES.radius
                    }}>
                    <Image source={icons.calories}
                        style={{ width: 30, height: 30 }} />
                    <Text
                        style={{
                            color: COLORS.darkGray2, ...FONTS.body5
                        }}
                    >{this.props.item.calories + " Calories"}</Text>

                </View>
            </TouchableOpacity>
        )
    }
}

export default HorizontalFoodCard