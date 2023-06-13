import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Badge } from "@mui/material";
import { tabData } from "../Data";

const SliderTabs = ({SData,chooseTab})=>  {
    const [tabbmode, setTabbmode] = useState('')

    const pressTab = (type)=>{
        setTabbmode(type)
        chooseTab(type)
    }

    const SampleNextArrow = (props) =>{
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black", borderRadius: 10, color: "white" }}
            onClick={onClick}
          />
        );
      }
      
      const SamplePrevArrow= (props) =>{
        const { className, style, onClick } = props;
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
      slidesToShow: 6,
      slidesToScroll: 4,
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
            initialSlide: 2
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
        <div className="w-full flex justify-center items-center">
            <Slider {...settings} className="w-[85%] flex text-center">
            {tabData.map(e=>(
                <li className="mr-1 py-1.5" role="presentation">
                    <Badge color='error' badgeContent={SData?.filter(er=> er.status===e.fact).length}  >
                        <button onClick={()=>pressTab(e.fact)}  className={`inline-block ${tabbmode===e.fact? "bg-orange-500 text-white": (SData?.filter(er=> er.status===e.fact).length)!==0? 'bg-white text-black  border border-black': 'bg-gray-500 text-white'} px-6 py-3 rounded-lg active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">{e.topic}</button>
                    </Badge>
                </li>
            ))}
            </Slider>
        </div>
    );
  }

  export default SliderTabs;
