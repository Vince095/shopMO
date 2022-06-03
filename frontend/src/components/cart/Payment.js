import React, { Fragment, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import PayPal from './Paypal'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import currency from '../layout/currency'

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)
    const [checkout, setCheckout] = React.useState(false)
    const [pay, setPay] = React.useState(false)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            console.log(clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(order))

                    history.push('/success')
                } else {
                    alert.error('There is some issue while payment processing')
                }
            }


        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message)
        }
    }
    let location = useSelector(state => state.userCountry);
    let exRate = currency(location).exRate;
    let symbol = currency(location).symbol;

    const virtualCards = ['4242424242424242', '4000056655665556', '4000056655665572', '5200828282828210', '6011981111111113','2227200000000009']
    const [data , setData] = React.useState({cvc: "654"});
    const [focus, setFocus] = React.useState('');

    const handleFocus = (e) => {
        setFocus( 'cvc' );
        
    }
    const handleInputChange = (e) => 
        setData({...data, data: e.target.value});

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />
            
            <div className="row wrapper">
            {(checkout === true) 
                ? <div className="payment-div">
                    <PayPal 
                    price={orderInfo.totalPrice}
                    history={history}
                    order={order}
                 
                    />
                </div> 

                :<div>
                    <h1 >Payment methods</h1>
                    <button onClick={() => {setCheckout(true)}} id="view_btn" className="btn btn-block py-3">Use credit/debit card {` - ${symbol}${orderInfo && (orderInfo.totalPrice*exRate).toFixed(2)}`}</button>
                </div>
            }
        </div>
            
            <div className="row wrapper">
                { (pay === true)?
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                       <i className="fa fa-info-circle md-5"> For mpesa, eco-cash or cash on delivery use shopmo virtual card to checkout
                         
                       </i>
                       <div  className="col-md-offset-2 ">
                            <Cards
                                   
                                    cvc={data.cvc}
                                    expiry={'12/26'}
                                    focused={focus}
                                    name={user.name}
                                    number={virtualCards[Math.floor(Math.random() * virtualCards.length)]}
                            />
                       </div>
                     
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                                
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                name="cvc"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                                onChange={handleInputChange}
                                onFocus={handleFocus}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                           Pay {` - ${symbol}${orderInfo && (orderInfo.totalPrice*exRate).toFixed(2)}`}
                        </button>

                    </form>
                </div>
                :
                <div>
                    <button onClick={() => {setPay(true)}} id="view_btn" className="btn btn-block py-3">mpesa/eco-cash/cash on delivery {` - ${symbol}${orderInfo && (orderInfo.totalPrice*exRate).toFixed(2)}`}</button>
                </div>
    }
            </div>

        </Fragment>
    )
}

export default Payment
