import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import "./styles.css"

import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { useEffect, useState } from "react"
import axios from "axios"
import Slide from "./Slide"

const Slider = () => {
  const [slides, setSlides] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/slides.json")
      setSlides(data)
    }
    getData()
  }, [])

  return (
    <div className="w-full h-[50vh] md:h-[calc(100vh_-_63px)] mt-[63px]">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Slide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider
