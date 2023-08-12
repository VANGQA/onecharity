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
import { CCarousel } from '@coreui/react';
import { CCarouselItem } from '@coreui/react';
import { CImage } from '@coreui/react';
import { CCard } from '@coreui/react';
import { CCardBody } from '@coreui/react';
import { CCardTitle } from '@coreui/react';
import { CCardImage } from '@coreui/react';
import HeroSlider, {Slide} from 'hero-slider';



import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const myfirstSlider="https://media.takealot.com/promotions/83540-top-banner.png";
const mysecondSlider="https://media.takealot.com/promotions/83540-top-banner.png";
const mylastSlider="https://media.takealot.com/promotions/83540-top-banner.png";

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
    <>
      <HeroSlider
         slidingAnimation="left_to_right"
         orientation="horizontal"
         initialSlider={1}
         onBeforeChange={(previousSlide, nextSlide)=>console.log("onBeforeChange", previousSlide,nextSlide)}
         onChange={nextSlide =>console.log("onChange", nextSlide)}
         onAfterChange={nextSlide =>console.log("onAfterChange", nextSlide)}
         style={{ backgroundColor: "rgba(0,0,0,0.33)" }}

         settings={{
           slidingDuration:250,
           slidingDelay:100,
           shouldAutoplay:true,
           shouldDisplayButtons:true,
           autoplayDuration:5000,
           height: "100vh",
         }}
 
       >
          <Slide
            background={{
              backgroundImage:myfirstSlider,
              backgroundAttachment:"fixed"
            }}
          />
          <Slide
            background={{
              backgroundImage:mysecondSlider,
              backgroundAttachment:"fixed"
            }}
          />
          <Slide
            background={{
              backgroundImage:mylastSlider,
              backgroundAttachment:"fixed"
            }}
          />
        
       </HeroSlider>
    </>

    
      <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
         <>
      
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
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
            {sellers.map((seller) => (
                <SwiperSlide key={seller._id}>
                    <Link to={`/seller/${seller._id}`}>
                        <CCard>
                            <CCardBody>
                                <CCardTitle>{seller.seller.name}</CCardTitle>
                                <CCardImage orientation="top" width="100%" src={seller.seller.logo} alt={seller.seller.name} />
                             </CCardBody>
                          </CCard>
                       </Link>
                   </SwiperSlide>
                ))}
              </Swiper>
          </>
        
          )}
      <h2>Featured Products</h2>
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
