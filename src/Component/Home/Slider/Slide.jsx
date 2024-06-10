import PropTypes from "prop-types"

const Slide = ({ img, title, sub_title }) => {
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className="w-full h-screen bg-cover bg-center bg-no-repeat flex justify-start items-center"
    >
      <div className="z-10 w-full h-full bg-black bg-opacity-30">
        <h1 className="text-3xl text-white font-ostt font-bold">{title}</h1>
        <p>{sub_title}</p>
      </div>
    </div>
  )
}

Slide.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  sub_title: PropTypes.string,
}

export default Slide
