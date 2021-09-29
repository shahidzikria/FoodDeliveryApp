import React, { Component } from 'react';
import {
    View, Text, StyleSheet
} from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { COLORS, FONTS, SIZES } from "../constants";

class TwoPointSlider extends Component {
    render() {
        return (
            <MultiSlider
                values={this.props.values}
                sliderLength={SIZES.width - (SIZES.padding * 2) - 20}
                min={this.props.min}
                max={this.props.max}
                step={1}
                markerOffsetY={20}
                selectedStyle={{
                    backgroundColor: COLORS.primary
                }}
                trackStyle={{
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGray2
                }}

                minMarkerOverlapDistance={50}
                customMarker={(e) => {
                    return (
                        <View
                            style={{
                                height: 60,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <View
                                style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    borderWidth: 4,
                                    borderColor: COLORS.white,
                                    backgroundColor: COLORS.primary,
                                    ...styles.shadow
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 5,
                                    color: COLORS.darkGray,
                                    ...FONTS.body3
                                }}>
                                {this.props.prefix}{e.currentValue}{this.props.postfix}

                            </Text>

                        </View>
                    )
                }}
                onValuesChange={(value) => { this.props.onValuesChange(value) }}
            />
        )
    }
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000"
        , shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 1,
        shadowOpacity: 0.1
    }
})
export default TwoPointSlider;