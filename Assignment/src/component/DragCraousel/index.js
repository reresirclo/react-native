import React, { useRef, useState } from 'react';
import { Animated, PanResponder, View } from 'react-native';

const DragCraousel = ({ data, width }) => {
    const [length] = useState(data.length);
    const img = useRef(new Animated.ValueXY()).current;
    const imgPosisiton = useRef(new Animated.Value(0)).current;
    const dot = useRef(new Animated.ValueXY()).current;
    const dotPosisiton = useRef(new Animated.Value(0)).current;
    const baseWidth = useRef(new Animated.Value(0)).current;

    const dots = data.map((obj, index) => {
        return (
            <View
                key={`point-${index}`}
                style={{
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    width: 8,
                    height: 8,
                    backgroundColor: 'gray',
                    marginRight: 4,
                }}
            />
        );
    });

    const goToRight = () => {
        dotPosisiton.setValue(dotPosisiton._value + 12);
        imgPosisiton.setValue(imgPosisiton._value - baseWidth._value);
        Animated.spring(dot, {
            useNativeDriver: false,
            toValue: dotPosisiton._value,
        }).start();

        Animated.spring(img, {
            useNativeDriver: false,
            toValue: imgPosisiton._value,
            bounciness: 0,
        }).start();
    };

    const goToLeft = () => {
        dotPosisiton.setValue(dotPosisiton._value - 12);
        imgPosisiton.setValue(imgPosisiton._value + baseWidth._value);
        Animated.spring(dot, {
            useNativeDriver: false,
            toValue: dotPosisiton._value,
        }).start();

        Animated.spring(img, {
            useNativeDriver: false,
            toValue: imgPosisiton._value,
            bounciness: 0,
        }).start();
    };

    const swipeCalculation = gestureState => {
        const dTreshold = baseWidth._value / 2;
        const vTreshold = 0.1;
        const dx = gestureState.dx;
        const velocity = gestureState.vx;

        if (
            Math.abs(imgPosisiton._value) < baseWidth._value * (length - 1) &&
            Math.abs(dx) > dTreshold &&
            dx < 0
        ) {
            goToRight();
        } else if (
            Math.abs(imgPosisiton._value) > 0 &&
            Math.abs(dx) > dTreshold &&
            dx > 0
        ) {
            goToLeft();
        } else if (
            Math.abs(imgPosisiton._value) < baseWidth._value * (length - 1) &&
            Math.abs(velocity) > vTreshold &&
            dx < 0
        ) {
            goToRight();
        } else if (
            Math.abs(imgPosisiton._value) > 0 &&
            Math.abs(velocity) > vTreshold &&
            dx > 0
        ) {
            goToLeft();
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onPanResponderTerminationRequest: () => false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderTerminate: (e, gestureState) => {
                swipeCalculation(gestureState);
            },
            onPanResponderRelease: (e, gestureState) => {
                swipeCalculation(gestureState);
            },
        }),
    ).current;

    return (
        <View
            style={{
                borderTopStartRadius: 5,
                borderTopEndRadius: 5,
                backgroundColor: 'white',
                width,
                paddingTop: '100%',
            }}>
            <View
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
                        position: 'absolute',
                        bottom: 15,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                    }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Animated.View
                            style={{
                                position: 'absolute',
                                borderRadius: 2,
                                width: 8,
                                height: 8,
                                backgroundColor: 'red',
                                marginRight: 4,
                                zIndex: 1,
                                transform: [
                                    {
                                        translateX: dot.x || 0,
                                    },
                                ],
                            }}
                        />
                        {dots}
                    </View>
                </View>
                {data.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            {...panResponder.panHandlers}>
                            <Animated.Image
                                onLayout={e => {
                                    baseWidth.setValue(
                                        e.nativeEvent.layout.width,
                                    );
                                }}
                                style={[
                                    {
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain',
                                    },
                                    {
                                        transform: [{ translateX: img.x }],
                                    },
                                ]}
                                source={{
                                    uri: item.url,
                                }}
                            />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default DragCraousel;
