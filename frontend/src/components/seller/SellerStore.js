import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from '../layout/MetaData'
import Product from '../product/Product'
import Loader from '../layout/Loader'
import shuffleArray from '../product/shuffleArray'
import Display from '../layout/Slider'
import currency from '../layout/currency';



import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../../actions/productActions'
import { getCountry } from '../../actions/userActions';
import { getSellerProducts } from '../../actions/sellerActions';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)



const SellerStore = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [isActive, setActive] = useState(false)
    const [rating, setRating] = useState(0)

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)
    const lookup = useSelector(state => state.userCountry)
    const product = useSelector(state => state.sellerProduct.sellers)


    const keyword = match.params.keyword
    const sellerName = match.params.sellerName

   
   

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));
        dispatch(getCountry());
        dispatch(getSellerProducts(sellerName));
        


    }, [dispatch, alert, error, keyword, currentPage, price, category, rating, sellerName])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    function setActiveBtn(){
        setActive(prevState =>{
           return {isActive:!isActive,...prevState}
        })
        
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }
    
    let country = '';
    //traverse through location object to get country name
    function traverse_it(obj){
        for(var prop in obj){
            if(obj[prop] instanceof Object || obj[prop] instanceof Array){
                // object
                traverse_it(obj[obj[prop]]);
            }else{
                // something else
                if(prop === "country"){
                    country = obj[prop];
                    console.log('The value of '+prop+' is '+obj[prop]+'.');
                }
                if(prop ==='sellers'){
                    console.log(obj[prop])
                }
                
            }
        }
    }
    
    let data = lookup.user.data;
    for(let item in data){
        if(item === "country"){

           console.log(data[item]);
        }
    } traverse_it(lookup.user.data);
   
    let sellerProducts = [] ;
    for(let elm in product){
        if(elm === "products"){
           sellerProducts = product[elm]
        }
    }

    console.log(match);
    
    const recommendProduct = shuffleArray(sellerProducts);
  

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={sellerName} />
                                <Display/>
                               
                                
                                <div className="category">
                                 <ul>
                                                    {categories.map(category => (
                                                        <li className ={isActive  && "active"}
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none',                  
                                                               
                                                            }}
                                                            key={category}
                                                            onClick={() =>{setCategory(category);
                                                                setActiveBtn();
                                                                
                                                            }}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                        </div>
                    

                   
                    <h2 id="products_heading">Featured Products</h2>
                    from <i class="fa fa-shopping-cart" aria-hidden="true"></i> {sellerName}
                            

                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5" id="mobi-hide">
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: `M1`,
                                                    1000: `M10000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `M${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>

                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className="my-3" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>

                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                   
                                        <div className="row">
                                            
                                            {recommendProduct.map(product => (
                                                <Product key={product._id} product={product} col={3} />
                                            ))}
                                        </div>
                                   
                                </Fragment>
                            ) : (
                                
                                    recommendProduct.map(product => (
                                      <Product key={product._id} product={product} col={3} />

                                    ))
                                )}

                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                   

                </Fragment>
            )}

        </Fragment>
    )
}

export default SellerStore