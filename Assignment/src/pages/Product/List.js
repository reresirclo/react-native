import { useNavigation } from '@react-navigation/native';
import { ItemProduct, Layout } from '@src/component';
import { productList } from '@src/services/graphql';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';

const Product = props => {
    const navigation = useNavigation();
    const { params } = props.route;
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    const [getProducts, { data, loading, error, refetch }] = productList({
        onCompleted: data => {
            setProducts(products.concat(data.products.items));
        },
    });

    useEffect(() => {
        if (params) {
            const { headerTitle, id } = params;
            setCategoryId(id);

            navigation.setOptions({
                title: headerTitle,
            });

            getProducts({
                variables: {
                    id,
                    currentPage,
                },
            });
        }
    }, [params, currentPage]);

    if (loading && currentPage === 1) {
        return (
            <Layout>
                <ActivityIndicator size="large" color="red" />
            </Layout>
        );
    }

    const loadMore = () => {
        const { total_pages } = data.products.page_info;
        const loadPage = currentPage + 1;

        if (total_pages >= loadPage && !loading) {
            refetch({
                variables: {
                    id: categoryId,
                    currentPage: loadPage,
                },
            });
            setCurrentPage(loadPage);
        }
    };

    return (
        <Layout>
            {products.length == 0 ? (
                <Text>No Product</Text>
            ) : (
                <FlatList
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.2}
                    numColumns={2}
                    style={{
                        width: '100%',
                    }}
                    contentContainerStyle={{
                        width: '100%',
                    }}
                    data={products}
                    ListFooterComponent={() => {
                        return (
                            (!loading &&
                                data.products.page_info.total_pages ===
                                    currentPage && (
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 25,
                                            color: 'gray',
                                        }}>
                                        End of Product
                                    </Text>
                                )) || (
                                <ActivityIndicator size="large" color="red" />
                            )
                        );
                    }}
                    ListFooterComponentStyle={{
                        height: 75,
                        paddingVertical: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    renderItem={({ item }) => {
                        return (
                            <ItemProduct
                                onPress={() =>
                                    navigation.push('Detail Product', {
                                        urlKey: item.url_key,
                                    })
                                }
                                style={{
                                    width: '47%',
                                }}
                                data={item}
                            />
                        );
                    }}
                    keyExtractor={item => String(item.id)}
                />
            )}
        </Layout>
    );
};

export default Product;
