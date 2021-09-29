import React from "react";

import {
    View, Text
} from "react-native"
import { FONTS } from "../constants";

class Header extends React.Component {

    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    ... this.props.containerStyle
                }}
            >
                {/* Left */}
                {this.props.leftComponent}

                {/* Title */}
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{ ...FONTS.h3 }}>
                        {this.props.title}
                    </Text>
                </View>

                {/* Right Component */}

                {this.props.rightComponent}
            </View>


        )
    }
}

export default Header