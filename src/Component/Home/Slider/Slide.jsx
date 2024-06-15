import PropTypes from "prop-types"

const Slide = ({ slide }) => {
  return (
    <div
      style={{ backgroundImage: `url(${slide.img})` }}
      className="w-full h-[80vh] md:h-screen bg-cover bg-center bg-no-repeat"
    >
      <div className="w-full h-[80vh] md:h-screen bg-black bg-opacity-60 flex flex-col justify-center items-center">
        <h1 className="text-5xl md:text-8xl text-white font-ostt font-bold">
          {slide.title}
        </h1>
        <p className="text-gray-200 text-base px-14 md:px-0">
          {slide.sub_title}
        </p>
      </div>
    </div>
  )
}

Slide.propTypes = {
  slide: PropTypes.object,
}

export default Slide
