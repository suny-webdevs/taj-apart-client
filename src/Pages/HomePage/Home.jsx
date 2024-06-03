import { Helmet } from "react-helmet-async"
import Slider from "../../Component/Home/Slider/Slider"
import About from "../../Component/Home/About/About"
import Coupons from "../../Component/Home/Coupons/Coupons"
import Location from "../../Component/Home/Location/Location"

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Taj Apart</title>
      </Helmet>
      <Slider />
      <About />
      <Coupons />
      <Location />
    </div>
  )
}

export default Home
