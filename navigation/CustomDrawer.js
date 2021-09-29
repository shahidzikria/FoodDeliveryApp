import React from "react";
import {
    View, Text, Image, TouchableOpacity
} from "react-native";

import {
    createDrawerNavigator,
    DrawerContentScrollView
} from "@react-navigation/drawer";

import Animated from "react-native-reanimated"
import { MainLayout } from "../screens";
import { connect } from "react-redux";
import { setSelectedTab } from "../stores/tabs/tabAction";

import {
    COLORS,
    FONTS,
    SIZES,
    constants, icons, dummyData
} from "../constants";

const Drawer = createDrawerNavigator();



class CustomDrawer extends React.Component {

    state = {
        progress: new Animated.Value(0)
    }

    render() {
        const scale = Animated.interpolateNode(this.state.progress, { inputRange: [0, 1], outputRange: [1, 0.8] })
        const borderRadius = Animated.interpolateNode(this.state.progress, { inputRange: [0, 1], outputRange: [0, 25] })

        const animatedStyle = { borderRadius, transform: [{ scale }] }
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.primary }}>

                <Drawer.Navigator
                    drawerType="slide"
                    overlayColor="transparent"
                    drawerStyle={{
                        width: "65%",
                        paddingRight: 20,
                        backgroundColor: "transparent"
                    }}
                    sceneContainerStyle={{
                        backgroundColor: "transparent"
                    }}
                    initialRouteName="MainLayout"
                    drawerContent={props => {

                        setTimeout(() => {
                            this.setState({ progress: props.progress })
                        }, 0)
                        return (
                            <CustomDrawerContent
                                navigation={props.navigation}
                                selectedTab={this.props.selectedTab}
                                setSelectedTab={this.props.setSelectedTab}
                            />
                        )
                    }}
                >
                    <Drawer.Screen name="MainLayout" >
                        {props => <MainLayout {...props}
                            drawerAnimationStyle={
                                animatedStyle
                            } />
                        }
                    </Drawer.Screen>
                </Drawer.Navigator>

            </View>
        )
    }
}


class CustomDrawerContent extends React.Component {
    navigation = this.props.navigation;
    render() {
        return (
            <DrawerContentScrollView
                scrollEnabled={true}
                contentContainerStyle={{ flex: 1 }}>
                <View
                    style={{ flex: 1, paddingHorizontal: SIZES.radius }}>

                    {/* close icon */}
                    <View
                        style={{ alignItems: "flex-start", justifyContent: "center" }}>
                        <TouchableOpacity
                            style={{ alignItems: "center", justifyContent: "center" }}
                            onPress={() => { this.navigation.closeDrawer() }}>
                            <Image
                                source={icons.cross}
                                style={{
                                    height: 35,
                                    width: 35, tintColor: COLORS.white
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Profile */}
                    <TouchableOpacity
                        onPress={() => { alert("Profile") }}
                        style={{
                            flexDirection: "row",
                            marginTop: SIZES.radius,
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={dummyData.myProfile?.profile_image}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: SIZES.radius
                            }}
                        />

                        <View
                            style={{ marginLeft: SIZES.radius }}
                        >
                            <Text
                                style={{
                                    color: COLORS.white, ...FONTS.h3
                                }}
                            >
                                {dummyData.myProfile?.name}
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.body4
                                }}
                            >
                                {"View your profile"}
                            </Text>

                        </View>
                    </TouchableOpacity>

                    {/* Drawer Items */}
                    <View
                        style={{
                            flex: 1, marginTop: SIZES.padding
                        }}
                    >
                        <CustomDrawerItem
                            label={constants.screens.home}
                            icon={icons.home}
                            isFocused={this.props.selectedTab == constants.screens.home}
                            onPress={() => {
                                this.props.setSelectedTab(constants.screens.home)
                                this.navigation.navigate("MainLayout")
                            }}
                        />

                        <CustomDrawerItem
                            label={constants.screens.wallet}
                            icon={icons.wallet} />

                        <CustomDrawerItem
                            label={constants.screens.notification}
                            icon={icons.notification}
                            isFocused={this.props.selectedTab == constants.screens.notification}
                            onPress={() => {
                                this.props.setSelectedTab(constants.screens.notification)
                                this.navigation.navigate("MainLayout")
                            }}
                        />

                        <CustomDrawerItem
                            label={constants.screens.favourite}
                            icon={icons.favourite}
                            isFocused={this.props.selectedTab == constants.screens.favourite}
                            onPress={() => {
                                this.props.setSelectedTab(constants.screens.favourite)
                                this.navigation.navigate("MainLayout")
                            }}
                        />

                        {/* Line Divider */}
                        <View
                            style={{
                                height: 1,
                                marginVertical: SIZES.radius,
                                marginLeft: SIZES.radius,
                                backgroundColor: COLORS.lightGray1

                            }}
                        />

                        <CustomDrawerItem
                            label={"Track Your Order"}
                            icon={icons.location} />

                        <CustomDrawerItem
                            label={"Coupons"}
                            icon={icons.coupon} />

                        <CustomDrawerItem
                            label={"Settings"}
                            icon={icons.setting} />

                        <CustomDrawerItem
                            label={"Invite a Friend"}
                            icon={icons.profile} />

                        <CustomDrawerItem
                            label={"Help Center"}
                            icon={icons.help} />

                    </View>
                    <View
                        style={{
                            marginBottom: SIZES.padding
                        }}

                    >
                        <CustomDrawerItem
                            label="Logout"
                            icon={icons.logout} />
                    </View>
                </View>
            </DrawerContentScrollView>
        )
    }
}

class CustomDrawerItem extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    height: 40,
                    marginBottom: SIZES.base,
                    alignItems: 'center',
                    paddingLeft: SIZES.radius,
                    borderRadius: SIZES.base,
                    backgroundColor: this.props.isFocused ? COLORS.transparentBlack1 : null

                }}
                onPress={this.props.onPress}
            >
                <Image
                    source={this.props.icon}
                    style={{
                        width: 20, height: 20, tintColor: COLORS.white
                    }}
                />

                <Text
                    style={{
                        marginLeft: 15,
                        color: COLORS.white,
                        ...FONTS.h3
                    }}
                >
                    {this.props.label}
                </Text>
            </TouchableOpacity>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedTab: (selectedTab) => {
            return dispatch(setSelectedTab(selectedTab))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)