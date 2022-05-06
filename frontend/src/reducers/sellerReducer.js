import {
    REGISTER_SELLER_REQUEST,
    REGISTER_SELLER_SUCCESS,
    REGISTER_SELLER_FAIL,
    ALL_SELLER_REQUEST,
    ALL_SELLER_SUCCESS,
    ALL_SELLER_FAIL,
    SELLER_PRODUCT_SUCCESS,
    SELLER_PRODUCT_REQUEST,
    SELLER_PRODUCT_FAIL,
    DELETE_SELLER_REQUEST,
    DELETE_SELLER_SUCCESS,
    DELETE_SELLER_FAIL,
    DELETE_SELLER_RESET,
    CLEAR_ERRORS

} from '../constants/sellerConstants'


export const newSellerReducer = (state = { seller: [] }, action) => {
    switch (action.type) {

        case REGISTER_SELLER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case REGISTER_SELLER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.seller
            }

        case REGISTER_SELLER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
    }
}


export const allSellerReducer = (state = { sellers: [] }, action) => {
    switch (action.type) {

        case ALL_SELLER_REQUEST:
            return {
                loading: true,
                sellers : []
            }

        case ALL_SELLER_SUCCESS:
            return {
            
                loading: false,
                sellers: action.payload.sellers
            }

        case ALL_SELLER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export const sellerReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_SELLER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_SELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }


        case DELETE_SELLER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_SELLER_RESET:
            return {
                ...state,
                isDeleted: false
            }


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

//seller products reducer

export const sellerProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {

        case SELLER_PRODUCT_REQUEST:
            return {
                loading: true,
                products : []
            }

        case SELLER_PRODUCT_SUCCESS:
            return {
            
                loading: false,
                sellers: action.payload
            }

        case SELLER_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

