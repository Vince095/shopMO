import React from 'react'
import { Link } from 'react-router-dom'

import {  useSelector } from 'react-redux'

const Product = ({ product, col }) => {

    const location = useSelector(state => state.userCountry)
    let exRate = 1;

    const currency = () => {
        if (location.user.country_name === 'Nigeria') {
            exRate = 414.48;
            return '₦'
        } else if (location.user.country_name === 'Ghana') {
            exRate = 7.51;
            return '₵'
        }else if (location.user.country_name === 'Lesotho') {
            exRate = 16;
            return 'M'
        }else if (location.user.country_name === 'South Africa') {
            exRate = 16;
            return 'R'
        }else {
            return '$'
        }   
    }
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.images[0].url}
               alt="" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text"><small>{currency()}</small> {(product.price*exRate).toFixed(2)}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Product
