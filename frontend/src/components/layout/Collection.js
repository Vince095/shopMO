import React, { Fragment, useState, useEffect } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { getProducts } from '../../actions/productActions'


import con from './images/banner/connect.svg'
import tech from './images/banner/tech.svg'
import gen from './images/banner/gen.svg'
import cam from './images/banner/cam.svg'
import work from './images/banner/work.svg'
import acc from './images/banner/acc.svg'
import home from './images/banner/home.svg'
import com from './images/banner/com.svg'
import sport from './images/banner/sport.svg'
import shoe from './images/banner/shoe.svg'

const Collection = ({match}) => {
  
    const [category, setCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [rating, setRating] = useState(0)
    
    const dispatch = useDispatch();

    
   

    // const handleClick = () => {
    //     label = category

    //     onClick(e => {
    //         setCategory(e.target.value)
    //     })
    // }

    return (
        <Fragment>
          <div className="container">
                        <div className=" text-white text-center bg-primary">
                            <h3 className="">Shop from our collection!!!</h3>
                        </div>
                        <div className="row m-4">
                            <div className="col-md-2">
                                <div className='collection-item' label = {'Electronics'} onClick={()=>setCategory('Electronics')}> 
                                    <img src={con} alt="connect" className="img-fluid" />
                                </div>
                                <p >stay connected</p>
                            </div>
                            <div className="col-md-2">
                                <div className='collection-item'>
                                    <img src={tech} alt="connect" className="img-fluid" />
                                </div>
                                <p >tech on budget</p>
                            </div>
                            <div className="col-md-2">
                                <div className='collection-item'>
                                    <img src={gen} alt="connect" className="img-fluid" />
                                </div>
                                <p >light up</p>
                            </div>
                            <div className="col-md-2">
                                <div className='collection-item'>
                                    <img src={cam}alt="connect" className="img-fluid" />
                                </div>
                                <p >smart home</p>
                            </div>
                            <div className="col-md-2">
                                <div className='collection-item'>
                                    <img src={work}alt="connect" className="img-fluid" />
                                </div>
                                <p >work from home</p>
                            </div>
                            
                            
                      </div>
                      <div className="row m-4">
                            <div className="col-md-2">
                                <div className='collection-item'>
                                    <img src={acc} alt="connect" className="img-fluid" />
                                </div>
                                <p >mobile accessories</p>
                            </div>
                            <div className="col-md-2">
                                <div className='collection-item'>
                                    <img src={com} alt="connect" className="img-fluid" />
                                </div>
                                <p >computing accessories</p>
                            </div>
                            <div className="col-md-2">
                                <div className='collection-item'>
                                    <img src={sport} alt="connect" className="img-fluid" />
                                </div>
                                <p >sport and fitness</p>
                            </div>
                            <div className="col-md-2">
                                <div className='collection-item'>
                                    <img src={shoe}alt="connect" className="img-fluid" />
                                </div>
                                <p >Outfits</p>
                            </div>
                            <div className="col-md-2">
                                <div className='collection-item'>
                                    <img src={home}alt="connect" className="img-fluid" />
                                </div>
                                <p >Home Entertainment </p>
                            </div>
                           
                       </div>

                    </div>
        </Fragment>
    )
}

export default Collection
