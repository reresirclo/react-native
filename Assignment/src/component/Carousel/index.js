import React, { useRef, useState } from 'react';
import { Animated, View } from 'react-native';

const Carousel = ({ data, width }) => {
    const leftAnim = useRef(new Animated.Value(0)).current;
    let arrE = [];
    const [translate, setTranslate] = useState(0);
    const [globalIndex, setGlobalIndex] = useState(0);
    const [imgContainer, setImgContainer] = useState({});

    return (
        <View
            onStartShouldSetResponder={() => {
                arrE = [];
            }}
            onMoveShouldSetResponder={(e) => {
                arrE.push(e.nativeEvent.locationX);
                const firstX = arrE[0];
                const lastX = arrE[arrE.length - 1];
                const calcX = lastX - firstX;

                if (
                    calcX < 0 &&
                    globalIndex < data.length - 1 &&
                    Math.abs(calcX) > 45
                ) {
                    setGlobalIndex(globalIndex + 1);
                    const translateCalc = translate - imgContainer.width;
                    setTranslate(translateCalc);
                    Animated.timing(leftAnim, {
                        toValue: translateCalc,
                        duration: 0,
                        useNativeDriver: true,
                    }).start();
                } else if (
                    calcX > 0 &&
                    globalIndex > 0 &&
                    Math.abs(calcX) > 45
                ) {
                    setGlobalIndex(globalIndex - 1);
                    const translateCalc = translate + imgContainer.width;
                    setTranslate(translateCalc);
                    Animated.timing(leftAnim, {
                        toValue: translateCalc,
                        duration: 0,
                        useNativeDriver: true,
                    }).start();
                }
            }}
            style={{
                borderTopStartRadius: 5,
                borderTopEndRadius: 5,
                backgroundColor: 'white',
                width: '100%',
                paddingTop: '100%',
            }}>
            <View
                onLayout={(e) => {
                    setImgContainer(e.nativeEvent.layout);
                }}
                style={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 15,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                    }}>
                    {data.map((obj, index) => {
                        return (
                            <View
                                key={`point-${index}`}
                                style={{
                                    borderRadius: 2,
                                    width: 8,
                                    height: 8,
                                    backgroundColor:
                                        index === globalIndex ? 'red' : 'gray',
                                    marginRight: 4,
                                }}
                            />
                        );
                    })}
                </View>
                {data.map((item, index) => {
                    return (
                        <Animated.Image
                            key={index}
                            style={[
                                {
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'contain',
                                },
                                {
                                    transform: [
                                        {
                                            translateX: leftAnim,
                                        },
                                    ],
                                },
                            ]}
                            source={{
                                uri: item.url,
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default Carousel;
