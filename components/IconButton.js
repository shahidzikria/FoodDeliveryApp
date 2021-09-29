import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image
} from "react-native";
import { COLORS } from "../constants";

class IconButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    ...this.props.containerStyle
                }}
                onPress={this.props.onPress}
            >

                <Image
                    source={this.props.icon}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.white,
                        ...this.props.iconStyle
                    }}
                />
            </TouchableOpacity>
        )
    }
}

export default IconButton;