// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SliderVertical =  ({data,type}) => {
  return (
    <Swiper className='w-full h-[200px] flex flex-col items-center justify-center mt-1.5 gap-4 mb-5'
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
      spaceBetween={50}
      slidesPerView={4}
      direction="vertical"
      autoplay={{
          delay: 2500,
        }}      //navigation
      //pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      //onSwiper={(swiper) => console.log(swiper)}
      //onSlideChange={() => console.log('slide change')}
    >
      {data.map(obj=>(
              <SwiperSlide key={obj.id}>
              {type==='tasks' && 
                <div className="w-full flex px-3 py-1 bg-white shadow-md hover:shodow-lg rounded-lg my-1">
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex justify-center flex-col items-start'>
                            <span className='text-sm text-gray-400'>{obj.act}</span>
                            <span className='text-sm text-slate-400'>{obj.date}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-sm max-w-[80px] text-center ${obj.state === "Urgent" ? 'bg-red-500 w-full text-white':'bg-green-500 w-full text-white'}`}>{obj.state}</span>
                    </div>
                </div>
              }
              {type==='alerts' &&
                <div className="w-full flex px-3 py-2.5 bg-white shadow-md hover:shodow-lg rounded-lg mt-1" key={obj.id}>
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-sm text-gray-800'>{obj.sender}</span>
                        <span className='text-sm'>{obj.act}</span>
                        <span className='text-sm text-slate-400'>{obj.date}</span>

                    </div>
                </div>
              }
              </SwiperSlide>

          ))}
          
    </Swiper>
  );
};


export default SliderVertical


  
      


      