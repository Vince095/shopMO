import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import 'boxicons'
import {useSelector, } from 'react-redux'

const Footer = () => {

    const { user } = useSelector(state => state.auth)
    
    return (
        <Fragment>
            <footer className="py-1">
                <div className="container">
                    <div className="row " 
                        style={{color:'#EAA221',align:'center', fontSize:'1.2rem', fontWeight:'bold'}}>
                        {user && user.role === 'user' && (
                        <div className="col-6 col-md">
                            <p className="text-center">
                                <Link className='' to="/seller/new" style={{color:'#EAA221'}}>
                                  <i className='fa fa-handshake-o' ></i>  Become a seller
                                </Link>
                            </p>
                        </div>)}
                    </div>
                        <div className="col-12 col-md-6">
                     </div>
                    <div className="row">
                        
                        <div className="col-6 col-md">
                            <h5>LET US HELP YOU</h5>
                            <ul className="list-unstyled text-small">
                                <li><Link className="text-muted" to="/">Help center</Link></li>
                                <li><Link className="text-muted" to="/">Delivery options and timelines</Link></li>
                                <li><Link className="text-muted" to="/">How to return a product on ShopMO?</Link></li>
                                <li><Link className="text-muted" to="/">Corporate and bulk purchases</Link></li>
                                <li><Link className="text-muted" to="/">Report a product</Link></li>
                    
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Resources</h5>
                            <ul className="list-unstyled text-small">
                                <li><Link className="text-muted" to="/">Resource</Link></li>
                                <li><Link className="text-muted" to="/">Resource name</Link></li>
                                <li><Link className="text-muted" to="/">Another resource</Link></li>
                                <li><Link className="text-muted" to="/">Final resource</Link></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md">
                            <h5>Payment</h5>
                            <ul className="list-unstyled text-small">
                                <li><Link className="text-muted" to="/">Debit/Credit card</Link></li>
                                <li><Link className="text-muted" to="/">Visa</Link></li>
                                <li><Link className="text-muted" to="/">Master</Link></li>
                                <li><Link className="text-muted" to="/">Cash On delivery</Link></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md">
                            <h5>More info</h5>
                            <ul className="list-unstyled text-small">
                                <li><Link className="text-muted" to="/">Site Map</Link></li>
                                <li><Link className="text-muted" to="/">Track Orders</Link></li>
                                <li><Link className="text-muted" to="/privacy">Privacy Policy</Link></li>
                                <li><Link className="text-muted" to="/">terms and Conditions</Link></li>
                            </ul>
                        </div>
                    </div>

               <p className='text-center mt-1'> Follow Us</p>
               <div className='col-6 col-md text-center'>
               <box-icon type="logo" size="1.5rem" color="#fff" name="facebook-circle"></box-icon>
               <box-icon type='logo' size='1.5rem' color='#fff' name='instagram-alt'></box-icon>
               <box-icon name='twitter' size='1.5rem' type='logo' color='#fff' ></box-icon>
               </div>
                <div className='line'></div>
               <p className="text-center mt-1">
                    <span dangerouslySetInnerHTML={{"__html":"&copy;"}}></span> ShopMO - {new Date().getFullYear()}, All Rights Reserved.
                </p> 
                
                </div>
                </footer>
        </Fragment>
    )
}

export default Footer
