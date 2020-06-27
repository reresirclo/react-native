import React, { useRef } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native';

export default function DragView() {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                {
                    useNativeDriver: false,
                },
            ),
            onPanResponderRelease: () => {
                Animated.spring(pan, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            },
        }),
    ).current;

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Drag this box!</Text>
            <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                }}
                {...panResponder.panHandlers}>
                <View style={styles.box} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: 'red',
        borderRadius: 5,
    },
});
