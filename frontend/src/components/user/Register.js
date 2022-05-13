import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Compressor from 'compressorjs'



import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'


const Register = ({ history }) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('/images/default_avatar.jpg')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const file = e.target.files[0];

            const reader = new FileReader();
            
            
             new Compressor(file, {
                    quality:0.9,
                    maxWidth:150,
                    maxHeight:150,
                    success(result){
                        reader.readAsDataURL(result);
                        reader.onload = ()=>{
                            let base64Data = reader.result;
                            if (reader.readyState === 2) {
                                setAvatarPreview(base64Data)
                                setAvatar(base64Data)
                            }
                            document.getElementById('image-temp').value = base64Data;
                        }
                    },error(err){
                        console.log(err.message)
                    }
        
                })
                
            
          

            //error message
            if (file.size/1024/1024 > 1){
                const wrongSize = document.querySelector(".wrongSize");
                setTimeout(() => {
                    wrongSize.style.display="none";
                },5000)
                wrongSize.style.display ="block";
            }
           

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onChange}
                                        required
                                    />
                                    <input
                                        type = 'hidden'
                                        name='image'
                                        id ='image-temp'
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                             <p className='wrongSize' style ={{display:'none',color:'#a43242',size:'2px'}}>please use an image below 1MB</p>
                        </div>

                       

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        
                        >
                            {loading?(
                            <box-icon color="#fff" animation="spin" name="loader"/>):(<span>REGISTER</span>)}
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Register
