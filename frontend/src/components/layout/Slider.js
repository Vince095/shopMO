import React from 'react'
import { Carousel } from 'react-bootstrap'
import pic from './images/display.png';
import shop from './images/shop.png'; 
import smart from './images/smart.png'
import order from './images/odering.png'


const Slider = () => {
    return (
      <div className="slider"  >

          <Carousel pause="hover">
            <Carousel.Item key="1">
              <img className="d-block w-100 " src={pic} alt="slide1" />
            </Carousel.Item>
            <Carousel.Item key="2">
              <img className="d-block w-100" src={shop} alt="slide2" />
            </Carousel.Item>
            <Carousel.Item key="3">
              <img className="d-block w-100" src={smart} alt="slide3" />
            </Carousel.Item>
            <Carousel.Item key="4">
              <img className="d-block w-100" src={order} alt="slide4" />
            </Carousel.Item>
          </Carousel>
      </div>
      
    )
}

export default Slider
