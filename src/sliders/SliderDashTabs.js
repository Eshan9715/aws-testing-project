import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SliderDashTabs = ({Data,SData,chooseTab,role,type,align})=>  {
  
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
      slidesToShow: 4,
      slidesToScroll: 2,
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
        <div className="w-full flex flex-col justify-center items-start">
              <p className="text-[17px] font-semibold mb-2">Ongoing Shipments</p>

              {((type==='dashbar') && (SData?.length>4)) && 
              <Slider {...settings} className="w-[100%] flex text-center justify-start items-center bg-red-500">
              {
                Data.map(e=>(SData?.filter(er=> er.status===e.fact).length>0 && 
                  <li className="mr-1 py-1.5" role="presentation">
                    <p className={`flex justify-between bg-white text-black  border border-black px-6 py-3 rounded-lg active`} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false"><span className="font-semibold text-lg text-right bg-red-500 rounded-full w-6 h-6 flex justify-center items-center text-white">{SData?.filter(er=> er.status===e.fact).length}</span>{e.topic}</p>
                  </li>
                ))

              }
              </Slider>}

              {((type==='dashbar') && (SData?.length===0)) && 
              <div className="w-full flex justify-center items-center text-red-500 font-semibold p-4 border-red-500 border text-[17px]">No ongoing shipments here!</div>
              }

              {((type==='dashbar') && (SData?.length>0) && (SData?.length<=4)) && 
                <div className="w-full flex">
                  {align==='vertiz' && <div className="w-full flex flex-col max-h-[200px] overflow-y-auto">
                  {Data.map(e=>(SData?.filter(er=> er.status===e.fact).length>0 && 
                    <li className="mr-2 py-1.5 flex">
                      <div className={`flex w-full gap-2 justify-between bg-white text-black  border px-2 py-3 rounded-lg active`}>
                        <p className="font-semibold text-lg text-left bg-red-500 rounded-full w-6 h-6 flex justify-center items-center text-white">
                          {SData?.filter(er=> er.status===e.fact).length}
                        </p>
                        <p className="flex text-end">{e.topic}</p>
                      </div>
                    </li>
                  ))}
                  </div>}

                  {align==='horiz' && <div className="w-full flex">
                  {Data.map(e=>(SData?.filter(er=> er.status===e.fact).length>0 && 
                    <li className="mr-2 py-1.5 flex">
                      <div className={`flex w-full gap-2 justify-between bg-white text-black  border px-2 py-3 rounded-lg active`}>
                        <p className="font-semibold text-lg text-left bg-red-500 rounded-full w-6 h-6 flex justify-center items-center text-white">
                          {SData?.filter(er=> er.status===e.fact).length}
                        </p>
                        <p className="flex text-end">{e.topic}</p>
                      </div>
                    </li>
                  ))}
                  </div>}
                </div>
              
                         
              }

        </div>
    );
  }
export default SliderDashTabs;
