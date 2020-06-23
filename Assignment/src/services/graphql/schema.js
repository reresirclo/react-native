import { gql } from 'apollo-boost';

export const CUSTOMER_LOGIN = gql`
	mutation($username: String!, $password: String!) {
		generateCustomerToken(email: $username, password: $password) {
			token
		}
	}
`;

export const CUSTOMER_NOTIFICATION_LIST = gql`
	query {
		customerNotificationList {
			items {
				createdAt
				content
				entityId
				subject
				unread
			}
			totalUnread
		}
	}
`;

export const READ_NOTIFICATION = gql`
	mutation($id: Int!) {
		readNotification(entityId: $id) {
			items {
				createdAt
				content
				entityId
				subject
				unread
			}
			totalUnread
		}
	}
`;

export const CATEGORY_LIST = gql`
	query {
		categoryList(filters: { name: { match: "default" } }) {
			children {
				id
				level
				url_key
				name
				is_anchor
				children {
					id
					level
					url_key
					name
					is_anchor
					children {
						id
						level
						url_key
						name
						is_anchor
					}
				}
			}
		}
	}
`;

export const PRODUCT = gql`
	query($urlKey: String!) {
		products(filter: { url_key: { eq: $urlKey } }) {
			items {
				sku
				name
				media_gallery {
					label
					url
				}
				more_info {
					label
					value
				}
				stock_status
				qty_available
				description {
					html
				}
				special_price
				price_range {
					maximum_price {
						regular_price {
							currency
							value
						}
						final_price {
							value
							currency
						}
					}
				}
			}
		}
	}
`;

export const PRODUCT_LIST = gql`
	query($id: String!, $currentPage: Int!) {
		products(
			filter: { category_id: { eq: $id } }
			pageSize: 8
			currentPage: $currentPage
		) {
			items {
				url_key
				id
				sku
				name
				image {
					label
					url
				}
				special_price
				price_range {
					maximum_price {
						regular_price {
							currency
							value
						}
						final_price {
							value
							currency
						}
					}
				}
			}
			page_info {
				current_page
				page_size
				total_pages
			}
			total_count
		}
	}
`;

export const CUSTOMER = gql`
	query {
		customer {
			firstname
			lastname
			email
		}
	}
`;
