import React, { Component, useRef } from 'react';
import {
    View,
    Text,
    Animated,
    ScrollView,
    TouchableWithoutFeedback,
    Modal
} from "react-native";

import { COLORS, FONTS, SIZES, constants, icons } from "../../constants"
import { IconButton, TwoPointSlider } from "../../components"
export default FilterModal = ({ isVisible, onClose }) => {

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current

    const [showFilterModal, setShowFilterModal] = React.useState(isVisible)

    React.useEffect(() => {
        if (showFilterModal) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(() => { onClose() });

        }
    }, [showFilterModal])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 680]
    })

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showFilterModal}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.transparentBlack7
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => { setShowFilterModal(false) }}
                >
                    <View
                        style={{
                            position: "absolute",
                            top: 0, bottom: 0, right: 0, left: 0
                        }}
                    />

                </TouchableWithoutFeedback>

                <Animated.View
                    style={{
                        position: "absolute",
                        left: 0,
                        top: modalY,
                        width: "100%",
                        height: "100%",
                        padding: SIZES.padding,
                        borderTopRightRadius: SIZES.padding,
                        borderTopLeftRadius: SIZES.padding,
                        backgroundColor: COLORS.white,
                    }}
                >
                    {/* Header */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{ flex: 1, ...FONTS.h3 }}
                        >{"Filter Your Search"}</Text>

                        <IconButton
                            containerStyle={{
                                borderWidth: 2,
                                borderRadius: 10,
                                borderColor: COLORS.gray2
                            }}
                            icon={icons.cross}
                            iconStyle={{
                                tintColor: COLORS.gray2
                            }}

                            onPress={() => { setShowFilterModal(false) }}
                        ></IconButton>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 250
                        }}
                    >
                        {/* Distance Section */}
                        <RenderDistance />

                    </ScrollView>

                </Animated.View>
            </View>

        </Modal>
    )
}

class RenderDistance extends Component {
    render() {
        return (
            <Section
                title="Distance"
            >

                <View
                    style={{
                        alignItems: "center"
                    }}
                >
                    <TwoPointSlider
                        value={[3, 10]}
                        min={1}
                        max={20}
                        postfix="km"
                        onValueChange={(val) => { console.log(values) }}
                    ></TwoPointSlider>

                </View>
            </Section>
        )
    }
}
class Section extends Component {
    render() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    ...this.props.containerStyle
                }}
            >
                <Text style={{ ...FONTS.h3 }}>{this.props.title}</Text>

                {this.props.children}

            </View>
        )
    }
}