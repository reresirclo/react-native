import { useNavigation } from '@react-navigation/native';
import { Card, DragCraousel, Layout, TouchableOpacity } from '@src/component';
import { product } from '@src/services/graphql';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';
import HTMLView from 'react-native-htmlview';

const Detail = props => {
    const navigation = useNavigation();
    const { params } = props.route;
    const [data, setData] = useState({});
    const [footerHeight, setFooterHeight] = useState(0);
    const [getProduct, { loading }] = product({
        fetchPolicy: 'cache-and-network',
        onCompleted: data => {
            const [dataProduct] = data.products.items;
            setData(dataProduct);
        },
    });

    useEffect(() => {
        if (params) {
            const { urlKey } = params;
            getProduct({
                variables: {
                    urlKey,
                },
            });
        }
    }, [params]);

    if (loading || Object.keys(data).length === 0) {
        return (
            <Layout>
                <ActivityIndicator size="large" color="red" />
            </Layout>
        );
    }

    return (
        <SafeAreaView>
            <View style={{ height: '100%', flexDirection: 'column' }}>
                <ScrollView
                    style={{
                        width: '100%',
                        flex: 1,
                        padding: 10,
                    }}>
                    <Card>
                        <DragCraousel
                            data={data.media_gallery}
                            width="100%"
                            ratio="1-1"
                        />
                        <View
                            style={{
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#bfbfbf',
                            }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                {data.name}
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: 'red' }}>
                                {`${
                                    data.price_range.maximum_price.final_price
                                        .currency
                                } ${
                                    data.price_range.maximum_price.final_price
                                        .value
                                }`}
                            </Text>
                        </View>
                        <View
                            style={{
                                padding: 10,
                                flex: 1,
                                flexDirection: 'row',
                            }}>
                            <View
                                style={{
                                    width: '33%',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Rating
                                </Text>
                                <Text>
                                    {(data.review.rating_summary &&
                                        `${(
                                            (data.review.rating_summary * 5) /
                                            100
                                        ).toFixed(1)}/5 (${
                                            data.review.reviews_count
                                        })`) ||
                                        '0/5 (0)'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '33%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Stock
                                </Text>
                                <Text>
                                    {data.stock_status.replace('_', ' ')}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '33%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ fontWeight: 'bold' }}>SKU</Text>
                                <Text>{data.sku}</Text>
                            </View>
                        </View>
                    </Card>
                    <Card>
                        <Text
                            style={{
                                color: 'red',
                                fontWeight: 'bold',
                                marginBottom: 10,
                            }}>
                            Details
                        </Text>
                        <HTMLView value={data.description.html || '-'} />
                    </Card>
                    <Card>
                        <Text
                            style={{
                                color: 'red',
                                fontWeight: 'bold',
                                marginBottom: 10,
                            }}>
                            More Information
                        </Text>
                        {(data.more_info &&
                            data.more_info.map((item, index) => {
                                return (
                                    <Text key={index}>{`${item.label}: ${
                                        item.value
                                    }`}</Text>
                                );
                            })) || <Text>-</Text>}
                    </Card>
                </ScrollView>
                <View
                    style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: 'white',
                        padding: 10,
                    }}>
                    <TouchableOpacity
                        title="Back To Home"
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Detail;
