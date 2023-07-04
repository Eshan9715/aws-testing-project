import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import SliderCard from "../components/DialogBoxes/SliderCard";

const SliderRates = ({Data,title})=>  {
    
    const SampleNextArrow = (props) =>{
        const { className, style,onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black", borderRadius: 10, color: "white" }}
            onClick={onClick}
          />
        );
      }
      
      const SamplePrevArrow= (props) =>{
        const { className, style,onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black", borderRadius: 10, color: "white" }}
            onClick={onClick}
          />
        );
      }
 
    var settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,

      responsive: [
        {
            breakpoint: 1500,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3,
            }
          },
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
          }
        },
        {
            breakpoint: 995,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,           
            }
          },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 505,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
      
      ]
    };
    return (
        <div className="w-full flex tracking-wide justify-center items-start gap-3">
            {/* <p className="text-lg font-semibold text-start">{title}</p> */}
            {Data.length>=3 &&
            <Slider {...settings} className="w-[100%] flex text-center mt-1">

            {Data?.map((obj,index)=>(
                    <SliderCard key={index} discharge={obj.discharge} containers={obj.rates} shipmode={obj.deliveryMode} validPeriod={obj.validDate} shippingline={obj.shipline} title='Exports from Sri lanka' currency='USD'/>
                ))
            }
            </Slider>}

            {Data.length===0 &&
            <div className="w-full flex justify-center items-center p-4 border text-[17px]">No Rates available here!</div>
            }

            {Data.length<3 &&
              Data?.map((obj,index)=>(
                  <SliderCard key={index} discharge={obj.discharge} containers={obj.rates} shipmode={obj.deliveryMode} validPeriod={obj.validDate} shippingline={obj.shipline} title='Exports from Sri lanka' currency='USD'/>
              ))
            
            }
            
        </div>
    );
  }

export default SliderRates;
