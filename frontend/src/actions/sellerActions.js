import axios from "axios"

import {
    REGISTER_SELLER_REQUEST,
    REGISTER_SELLER_SUCCESS,
    REGISTER_SELLER_FAIL,
    LOAD_SELLER_REQUEST,
    LOAD_SELLER_SUCCESS,
    LOAD_SELLER_FAIL,
    ALL_SELLER_REQUEST,
    ALL_SELLER_SUCCESS,
    ALL_SELLER_FAIL,
    SELLER_PRODUCT_SUCCESS,
    SELLER_PRODUCT_FAIL,
    DELETE_SELLER_REQUEST,
    DELETE_SELLER_SUCCESS,
    DELETE_SELLER_FAIL,
    CLEAR_ERRORS,
    DELETE_SELLER_RESET

} from '../constants/sellerConstants'

export const newSeller = (sellerData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_SELLER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/seller/new`, sellerData, config)

        dispatch({
            type: REGISTER_SELLER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: REGISTER_SELLER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get all sellers 
export const getAllSellers = () => async (dispatch) => {
    try {

        dispatch({ type:  ALL_SELLER_REQUEST })

        const { data } = await axios.get(`/api/v1/sellers`)

        dispatch({
            type: ALL_SELLER_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ALL_SELLER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Delete seller (Admin)
export const deleteSeller = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SELLER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/seller/${id}`)

        dispatch({
            type: DELETE_SELLER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SELLER_FAIL,
            payload: error.response.data.message
        })
    }
}

//get seller products
export const getSellerProducts = (seller) => async (dispatch) => {
    try {

        dispatch({ type: LOAD_SELLER_REQUEST })

        const { data } = await axios.get(`/api/v1/products?seller=${ seller }`)

        dispatch({
            type: SELLER_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SELLER_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}