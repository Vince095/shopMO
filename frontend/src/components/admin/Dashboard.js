import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, CardBody, Card, Button } from 'reactstrap';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import SalesChart from './charts/Sales';
import currency from '../layout/currency';

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import { getAllSellers} from '../../actions/sellerActions'

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)
    const { sellers } = useSelector(state => state.allSellers)

    const location = useSelector(state => state.userCountry)
    const rate = currency(location).exRate;
    const symbol = currency(location).symbol;
    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
        dispatch(getAllSellers())
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>{symbol}{totalAmount && (totalAmount * rate).toFixed(2)}</b>
                                                 
                                            </div>
                                             
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/soldout">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-secondary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Vendors<br /> <b>{ sellers && sellers.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/sellers">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                
                            </div>
                            <h2 className="my-4">Statistics</h2>
                            
                            
                            <div className="col-xl-4 col-sm-6 mb-3">
                                    <Card className="card text-white bg-premium o-hidden h-100">
                                        <div className="card-body">
                                <div className="d-flex align-items-start">
                                    <div className="font-weight-bold">
                                    <small className="text-black-50 d-block mb-1 text-uppercase">
                                        New Accounts
                                    </small>
                                    <span className="font-size-xxl mt-1 blue">{Math.floor(Math.random() * (10000 - 100 + 1)) + 10}</span>
                                    </div>
                                    <div className="ml-auto">
                                    <div className="bg-white text-center text-success  rounded-circle">
                                        <i className="fa fa-bar-chart"></i>
                                       
                                    </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <i className="fa fa-caret-up text-success mr-1"></i>
                                   
                                    <span className="text-success pr-1">{(Math.floor(Math.random() * (100.00 - 0.50 + 1.01)) + 1.01).toFixed(2)}%</span>
                                    <span className="text-black-50">increase this month</span>
                                </div>
                                </div>
                                </Card>
                            </div>
                      

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white  o-hidden h-100">
                                        <SalesChart/>
                                    </div>
                                </div>
                            </div>

                        </Fragment>
                    )}

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard
