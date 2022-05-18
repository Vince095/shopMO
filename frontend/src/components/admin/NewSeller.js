import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { NEW_SELLER_RESET } from '../../constants/sellerConstants'
import { newSeller } from '../../actions/sellerActions'
import { updateUser } from '../../actions/userActions'
import { clearErrors} from '../../actions/productActions'


const NewSeller = ({ history }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ role, setRole] = useState('');
   
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

    const { loading, error, success } = useSelector(state => state.newSeller);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        console.log(user._id)

        if (success) {
            history.push('/admin/sellers');
            alert.success('Seller created successfully');
            dispatch(updateUser(user._id, { 
                name: user.name,
                email: user.email,
                role 
            } ));
            dispatch({ type: NEW_SELLER_RESET })
        }

    }, [dispatch, alert, error, success, history, user, role])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('phone', phoneNumber);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('address', address);

        dispatch(newSeller(formData))
        setRole('seller');
    }

   
   
    return (
        <Fragment>
            <MetaData title={'New seller'} />
            <div className="row">
                {user.role === 'admin' &&
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                }
                <div className="col-12 col-md align-self-center">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Seller</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name_field">Phone number</label>
                                    <input
                                        type="tel"
                                        id="name_field"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name_field">Location</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select>
                                </div>
                        
                              
                                 
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? (<box-icon color='#fff' animation='spin' name='loader'></box-icon>): 'CREATE'}
                        
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewSeller
