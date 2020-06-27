/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { ItemProduct, Swiper } from '@src/component';
import { setNotifications } from '@src/redux/actions';
import {
    customerNotificationList,
    getHompeageSlider,
    productList,
} from '@src/services/graphql';
import { logout } from '@src/services/helper';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [images, setImages] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [dirumahaja, setDirumahaja] = useState([]);
    const [ramadhanSell, setRamadhanSell] = useState([]);
    const [backCounter, setBackCounter] = useState(0);
    const windowWidth = Dimensions.get('window').width;
    const itemWidth = (windowWidth * 30) / 100;

    const [getBestSellers, { loading: bestSellerLoading }] = productList({
        onCompleted: (data) => {
            setBestSellers(data.products.items);
        },
    });
    const [getDirumahaja, { loading: dirumahajaLoading }] = productList({
        onCompleted: (data) => {
            setDirumahaja(data.products.items);
        },
    });
    const [getRamadhanSell, { loading: ramadhanSellLoading }] = productList({
        onCompleted: (data) => {
            setRamadhanSell(data.products.items);
        },
    });

    getHompeageSlider({
        onCompleted: (data) => {
            const result = data.getHomepageSlider.images.map((item) => {
                return { url: item.image_url };
            });

            setImages(result);
        },
    });

    customerNotificationList({
        onCompleted: (data) => {
            const { items, totalUnread } = data.customerNotificationList;
            dispatch(
                setNotifications({
                    data: items,
                    totalUnread,
                }),
            );
        },
        onError: () => {
            logout(dispatch);
        },
    });

    useEffect(() => {
        getBestSellers({
            variables: {
                currentPage: 1,
                id: 45,
            },
        });

        getRamadhanSell({
            variables: {
                currentPage: 1,
                id: 46,
            },
        });

        getDirumahaja({
            variables: {
                currentPage: 1,
                id: 49,
            },
        });
    }, [getBestSellers, getDirumahaja, getRamadhanSell]);

    return (
        <SafeAreaView>
            <ScrollView>
                <Swiper
                    data={images}
                    ratio="16-9"
                    width="100%"
                    resizeMode="cover"
                    loop={true}
                    autoplay={true}
                />
                <View>
                    <View
                        style={{
                            padding: 10,
                            minHeight: 200,
                            justifyContent: 'center',
                        }}>
                        {bestSellerLoading ? (
                            <ActivityIndicator color="red" size="large" />
                        ) : (
                            <>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 20,
                                            marginBottom: 5,
                                        }}>
                                        Best Sellers
                                    </Text>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            navigation.push('Product List', {
                                                headerTitle: 'Best Sellers',
                                                id: 45,
                                            });
                                        }}>
                                        <Text>Lihat Lebih</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                                <FlatList
                                    horizontal={true}
                                    nestedScrollEnabled={true}
                                    data={bestSellers}
                                    showsHorizontalScrollIndicator={false}
                                    style={{
                                        width: '100%',
                                    }}
                                    contentContainerStyle={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                    renderItem={({ item }) => (
                                        <ItemProduct
                                            onPress={() =>
                                                navigation.push(
                                                    'Detail Product',
                                                    {
                                                        urlKey: item.url_key,
                                                    },
                                                )
                                            }
                                            data={item}
                                            style={{ width: itemWidth }}
                                        />
                                    )}
                                    keyExtractor={(item) => String(item.id)}
                                />
                            </>
                        )}
                    </View>
                    <View
                        style={{
                            backgroundColor: 'red',
                            paddingVertical: 5,
                            marginBottom: 10,
                            justifyContent: 'center',
                            minHeight: 200,
                        }}>
                        {dirumahajaLoading ? (
                            <ActivityIndicator color="white" size="large" />
                        ) : (
                            <View
                                style={{
                                    padding: 10,
                                }}>
                                <FlatList
                                    horizontal
                                    nestedScrollEnabled
                                    data={dirumahaja}
                                    showsHorizontalScrollIndicator={false}
                                    style={{
                                        width: '100%',
                                    }}
                                    contentContainerStyle={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                    renderItem={({ item }) => (
                                        <ItemProduct
                                            onPress={() =>
                                                navigation.push(
                                                    'Detail Product',
                                                    {
                                                        urlKey: item.url_key,
                                                    },
                                                )
                                            }
                                            data={item}
                                            style={{ width: itemWidth }}
                                        />
                                    )}
                                    keyExtractor={(item) => String(item.id)}
                                />
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        marginBottom: 5,
                                    }}>
                                    #dirumahaja
                                </Text>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        navigation.push('Product List', {
                                            headerTitle: '#dirumahaja',
                                            id: 49,
                                        });
                                    }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            textAlign: 'center',
                                        }}>
                                        Lihat Lebih
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                    </View>
                    <View
                        style={{
                            padding: 10,
                            minHeight: 200,
                            justifyContent: 'center',
                        }}>
                        {ramadhanSellLoading ? (
                            <ActivityIndicator color="red" size="large" />
                        ) : (
                            <>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 20,
                                            marginBottom: 5,
                                        }}>
                                        Ramadhan Sell
                                    </Text>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            navigation.push('Product List', {
                                                headerTitle: 'Ramadhan Sell',
                                                id: 46,
                                            });
                                        }}>
                                        <Text>Lihat Lebih</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                                <FlatList
                                    horizontal
                                    nestedScrollEnabled
                                    data={ramadhanSell}
                                    showsHorizontalScrollIndicator={false}
                                    style={{
                                        width: '100%',
                                    }}
                                    contentContainerStyle={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                    renderItem={({ item }) => (
                                        <ItemProduct
                                            onPress={() =>
                                                navigation.push(
                                                    'Detail Product',
                                                    {
                                                        urlKey: item.url_key,
                                                    },
                                                )
                                            }
                                            data={item}
                                            style={{
                                                width: itemWidth,
                                            }}
                                        />
                                    )}
                                    keyExtractor={(item) => String(item.id)}
                                />
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export { Home };
