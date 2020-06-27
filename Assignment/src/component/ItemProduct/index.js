import React from 'react';
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
const ItemProduct = (props) => {
    const { data = [] } = props;

    if (data.length === 0) {
        return <ActivityIndicator />;
    }
    const finalPrice = data.price_range.maximum_price.final_price;

    return (
        <TouchableWithoutFeedback {...props}>
            <View
                style={[
                    {
                        backgroundColor: 'white',
                        width: '100%',
                        alignItems: 'center',
                        borderRadius: 5,
                        margin: 5,
                        padding: 5,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 1,
                    },
                    props.style,
                ]}>
                <View
                    style={{
                        width: '100%',
                        paddingTop: '100%',
                    }}>
                    <Image
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            resizeMode: 'contain',
                        }}
                        source={{
                            uri: data.image.url === '' ? null : data.image.url,
                        }}
                    />
                </View>
                <View style={{ padding: 10, width: '100%' }}>
                    <Text style={{ textAlign: 'left' }}>{data.name}</Text>
                    <Text style={{ textAlign: 'left' }}>
                        {`${finalPrice.currency} ${finalPrice.value}`}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ItemProduct;
