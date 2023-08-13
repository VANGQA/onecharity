import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import { CCardTitle } from '@coreui/react';
import { CCardText } from '@coreui/react';
import { CCardImage } from '@coreui/react';
import { CCardBody } from '@coreui/react';
import { CCard } from '@coreui/react';
import { CCol } from '@coreui/react';
import { CRow } from '@coreui/react';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
    <Carousel showThumbs={false} autoPlay>
       
          <div>
            <img src="https://tpc.googlesyndication.com/simgad/12652662985575046320?" width="100%" height="100%" />
          </div>
           <div>
            <img src="https://tpc.googlesyndication.com/simgad/12652662985575046320?" width="100%" height="100%"/>
          </div>
           <div>
            <img src="https://tpc.googlesyndication.com/simgad/12652662985575046320?" width="100%" height="100%" />
          </div>
     
      </Carousel>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      effect={"cube"}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
    >
      {seller.map((seller) => (
        <SwiperSlide key={seller._id}>
          <Link to={`/seller/${seller._id}`}>
            <CCard>
                <CCardBody>
                    <CCardTitle>{seller.seller.name}</CCardTitle>
                    <CCardImage orientation="top" src={seller.seller.logo} alt={seller.seller.name} />
                </CCardBody>
            </CCard>
          </Link>
          
        </SwiperSlide>
      ))}
    </Swiper>
        
    <h1>Categories</h1>
    <CRow>
      <CCol sm={3}>
        <CCard className="mb-3">
          <CCardImage orientation="top" src="https://media.takealot.com/covers_images/071764cf302d4c388fc999b4e497bc52/s-pdpxl.file" />
         </CCard>
       </CCol>
       <CCol sm={3}>
        <CCard className="mb-3">
          <CCardImage orientation="top" src="https://media.takealot.com/covers_images/071764cf302d4c388fc999b4e497bc52/s-pdpxl.file" />
         </CCard>
       </CCol>
       <CCol sm={3}>
        <CCard className="mb-3">
          <CCardImage orientation="top" src="https://media.takealot.com/covers_images/071764cf302d4c388fc999b4e497bc52/s-pdpxl.file" />
         </CCard>
       </CCol>
       <CCol sm={3}>
        <CCard className="mb-3">
          <CCardImage orientation="top" src="https://media.takealot.com/covers_images/071764cf302d4c388fc999b4e497bc52/s-pdpxl.file" />
         </CCard>
       </CCol>
  </CRow>
     
      <h2>Featured Product</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
