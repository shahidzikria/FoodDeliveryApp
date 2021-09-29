import React, { Children } from 'react';
import {
    View,
    Text, TouchableOpacity,
    Image,
    TextInput, FlatList
} from 'react-native';
import HorizontalFoodCard from "../../components/HorizontalFoodCard";
import VerticalFoodCard from "../../components/VerticalFoodCard";
import { FONTS, COLORS, SIZES, icons, dummyData } from "../../constants";

import { FilterModal } from "../";
class Home extends React.Component {

    state = {
        selectedCategoryID: 1,
        selectedMenuType: 1,
        menuList: [],
        recomended: [],
        popular: [],
        showFilterModal: false
    }
    componentDidMount() {
        this.handleChangeCategory(this.state.selectedCategoryID,
            this.state.selectedMenuType)
    }

    handleChangeCategory(categoryId, menuTypeId) {
        //  popular Menu
        let selectedPopular = dummyData.menu.find(a => a.name == "Popular")

        this.setState({
            popular: selectedPopular?.list.filter(a => a.categories.includes(categoryId))
        })

        // recomended menu
        let selectedRecomended = dummyData.menu.find(a => a.name == "Recommended")

        // set the recommended menu based on the category id
        this.setState({
            recomended: selectedRecomended?.list.filter(
                a => a.categories.includes(categoryId)
            )
        })

        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId);
        this.setState({ menuList: selectedMenu?.list.filter(a => a.categories.includes(categoryId)) })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                {/* Search */}
                <RenderSearch
                    showFilterModal={() => { this.setState({ showFilterModal: true }) }}

                />


                {/* Filter Modal */}

                {
                    this.state.showFilterModal &&
                    <FilterModal
                        isVisible={this.state.showFilterModal}
                        onClose={() => { this.setState({ showFilterModal: false }) }}
                    />
                }

                {/* List */}
                <FlatList
                    data={this.state.menuList}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View>
                            {/* Delivery to */}
                            <DeliveryTo />


                            {/* Food Categories */}
                            <RenderFoodCategories
                                selectedCategoryID={this.state.selectedCategoryID}
                                setSelectedCategoryID={(idd) => {
                                    this.setState({ selectedCategoryID: idd });
                                    this.handleChangeCategory(idd, this.state.selectedMenuType)
                                }}
                            />

                            {/* Popular Section */}
                            <RenderPopularSection
                                popular={this.state.popular}
                            />


                            {/* Recommended Section */}
                            <RenderRecomendedSection
                                recomended={this.state.recomended}

                            />
                            {/* Menu Types */}
                            <RenderMenuTypes
                                selectedMenuType={this.state.selectedMenuType}
                                setSelectedMenuType={(menu) => {
                                    this.setState({ selectedMenuType: menu }),
                                        this.handleChangeCategory(this.state.selectedCategoryID, menu)
                                }
                                }

                            />
                        </View>
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <HorizontalFoodCard
                                containerStyle={{
                                    height: 130,
                                    alignItems: "center",
                                    marginHorizontal: SIZES.padding,
                                    marginBottom: SIZES.radius
                                }}
                                imageStyle={{
                                    marginTop: 20,
                                    height: 110,
                                    width: 110
                                }}
                                item={item}
                                onPress={() => {
                                    alert("Horizontal Food Card")
                                }}
                            >

                            </HorizontalFoodCard>
                        )
                    }}

                    ListFooterComponent={
                        <View style={{ height: 200 }} />
                    }
                />

            </View>
        )
    }
}

class RenderSearch extends React.Component {
    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    hehight: 40,
                    alignItems: "center",
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                {/* Icon */}
                <Image
                    source={icons.search}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black
                    }}
                />

                {/* Text Input */}
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.body3
                    }}
                    placeholder="Search Food ..."
                />

                {/* Filter Button */}
                <TouchableOpacity
                    onPress={() => { this.props.showFilterModal() }}>
                    <Image source={icons.filter}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

class RenderMenuTypes extends React.Component {
    render() {
        return (
            <View>
                < FlatList
                    horizontal={true}
                    data={dummyData.menu}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 30,
                        marginBottom: 20
                    }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                marginLeft: SIZES.padding,
                                marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0
                            }}
                            onPress={() => {
                                this.props.setSelectedMenuType(item.id)
                            }}
                        >
                            <Text
                                style={{
                                    color: this.props.selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                                    ...FONTS.h3
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}

                />
            </View>
        )
    }
}

class Section extends React.Component {
    render() {
        return (
            <View>
                {/* Header */}

                <View
                    style={{
                        flexDirection: "row",
                        marginHorizontal: SIZES.padding,
                        marginTop: 30,
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            flex: 1, ...FONTS.h3
                        }}
                    >
                        {this.props.title}
                    </Text>
                    <TouchableOpacity
                        onPress={this.props.onPress}
                    >

                        <Text
                            style={{
                                color: COLORS.primary, ...FONTS.body3
                            }}
                        >
                            {"Show All"}
                        </Text>

                    </TouchableOpacity>

                </View>

                {/* Content */}
                {this.props.children}
            </View>
        )
    }
}

class RenderRecomendedSection extends React.Component {
    render() {
        return (
            <Section
                title="Recomended"
                onPress={() => { alert("Show All") }}

            >

                <FlatList
                    data={this.props.recomended}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 180,
                                width: SIZES.width * 0.85,
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == this.props.recomended.length - 1 ? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: "center"
                            }}
                            imageStyle={{
                                marginTop: 35,
                                height: 150,
                                width: 150,
                            }}
                            item={item}
                            onPress={() => { alert("Horizontal Food Card") }}
                        />
                    )}

                />
            </Section>
        )
    }
}

class RenderPopularSection extends React.Component {
    render() {
        return (
            <Section
                title={"Popular Near You"}
                onPress={() => alert("Popular Section")}
            >
                <FlatList
                    data={this.props.popular}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <VerticalFoodCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == this.props.popular.length - 1 ? SIZES.padding : 0,

                            }}

                            item={item}
                            onPress={() => alert("Vertical Food Card")}
                        />
                    )}
                />

            </Section>
        )
    }
}

class RenderFoodCategories extends React.Component {
    render() {
        return (
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 8,
                            borderRadius: SIZES.radius,
                            backgroundColor: this.props.selectedCategoryID == item.id ? COLORS.primary : COLORS.lightGray2


                        }}

                        onPress={() => {
                            this.props.setSelectedCategoryID(item.id)
                        }}
                    >

                        <Image
                            source={item.icon}
                            style={{
                                width: 50,
                                height: 50,
                                marginTop: 5
                            }}
                        />

                        <Text
                            style={{
                                alignSelf: "center",
                                marginRight: SIZES.base,
                                color: this.props.selectedCategoryID == item.id ? COLORS.white : COLORS.darkGray,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>

                    </TouchableOpacity>
                )}
            />
        )
    }
}

class DeliveryTo extends React.Component {
    render() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding
                }}
            >
                <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
                    {"DELIVERY TO"}
                </Text>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        marginTop: SIZES.base,
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h3
                        }}
                    >
                        {dummyData?.myProfile?.address}
                    </Text>
                    <Image
                        source={icons.down_arrow}
                        style={{
                            marginLeft: SIZES.base,
                            height: 20,
                            width: 20
                        }}
                    />

                </TouchableOpacity>
            </View>
        )
    }
}
export default Home;