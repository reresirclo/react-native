import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import {
    CUSTOMER_NOTIFICATION_LIST,
    CUSTOMER_LOGIN,
    CATEGORY_LIST,
    PRODUCT_LIST,
    CUSTOMER,
    READ_NOTIFICATION,
    PRODUCT,
    HOMEPAGE_SLIDER,
} from './schema';

const context = () => {
    const token = useSelector((state) => state.token);

    return {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
};

export const customerNotificationList = (options, lazyQuery = false) => {
    if (lazyQuery) {
        return useLazyQuery(CUSTOMER_NOTIFICATION_LIST, {
            notifyOnNetworkStatusChange: true,
            context: context(),
            ...options,
        });
    } else {
        return useQuery(CUSTOMER_NOTIFICATION_LIST, {
            context: context(),
            ...options,
        });
    }
};

export const customer = (options) =>
    useQuery(CUSTOMER, {
        context: context(),
        ...options,
    });

export const readNotification = (options) =>
    useMutation(READ_NOTIFICATION, {
        context: context(),
        ...options,
    });

export const customerLogin = (options) =>
    useMutation(CUSTOMER_LOGIN, {
        ...options,
    });

export const categoryList = (options) =>
    useLazyQuery(CATEGORY_LIST, {
        ...options,
    });

export const productList = (options) =>
    useLazyQuery(PRODUCT_LIST, {
        ...options,
    });

export const product = (options) =>
    useLazyQuery(PRODUCT, {
        ...options,
    });

export const getHompeageSlider = (options) =>
    useQuery(HOMEPAGE_SLIDER, {
        ...options,
    });
