import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

import 'boxicons'

import Search from './Search'

import '../../App.css'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
            <nav className="navbar row">
            
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                         <Link to="/">
                            <img src="/images/shopMO.png" height="35rem" alt="" />
                         </Link>
                    </div>
                </div>
               
                 <Link to='/' style={{textDecoration: 'none',color: 'white'}}> <i className="back fa fa-arrow-left"></i></Link>
               
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>
                
                 <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3" ><box-icon  type="solid" size="1rem" color="#fff" name="cart"></box-icon>Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard"><box-icon type="solid" color="#febd69" name="dashboard"></box-icon> Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me"><box-icon type="solid" color="#febd69" name="truck"></box-icon> Orders</Link>
                                <Link className="dropdown-item" to="/me"><box-icon type="solid" color="#febd69" name="user-account"></box-icon> Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                <box-icon type="solid" color="#fe6d69" name="door-open"></box-icon> Logout
                                </Link>

                            </div>


                        </div>

                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}


                </div>
              
            </nav>
        </Fragment>
    )
}

export default Header
