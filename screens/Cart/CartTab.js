import React from 'react';
import {
    View,
    Text
} from 'react-native';

class Home extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text>cart</Text>
            </View>
        )
    }
}

export default Home;