import React, { useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '@src/component';
import { setNotifications } from '@src/redux/actions';
import { readNotification } from '@src/services/graphql';
import { useNavigation } from '@react-navigation/native';

const Detail = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const notifications = useSelector((state) => state.notifications);

    const { params } = props.route;

    if (!params) {
        return (
            <Layout>
                <ActivityIndicator size="large" color="red" />
            </Layout>
        );
    }

    const { id, content, subject, level, unread, createdAt } = params.data;

    const [updateNotification] = readNotification({
        onCompleted: (data) => {
            const { items } = data.readNotification;
            if (unread) {
                notifications.totalUnread--;
                const [notif] = items;
                const index = notifications.data.findIndex(
                    (item) => item.entityId === notif.entityId,
                );
                notifications.data[index] = notif;
                dispatch(
                    setNotifications({
                        data: notifications.data,
                        totalUnread: notifications.totalUnread,
                    }),
                );
            }
        },
    });

    useEffect(() => {
        updateNotification({
            variables: {
                id,
            },
        });
    }, [id]);

    return (
        <Layout style={{ paddingHorizontal: 15 }}>
            <Text
                style={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 25,
                }}>
                {subject}
            </Text>
            <Text>{content}</Text>
        </Layout>
    );
};

export default Detail;
