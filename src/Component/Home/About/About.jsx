import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center w-full h-screen px-2 mt-2 md:mt-0 md:px-0">
      {/* Image */}
      <div className="w-full md:w-1/2 h-full">
        <img
          src="https://i.ibb.co/M7GMPLX/9.jpg"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="w-full md:w-1/2 h-full bg-secondary p-10 flex flex-col justify-center items-start">
        <h4 className="text-sm text-gray-200 font-ostt mb-2 ml-2">About</h4>
        <h1 className="text-5xl md:text-7xl text-gray-300 font-ostt font-bold">
          Get Home-Like Ambience
        </h1>
        <p className="text-base text-gray-400 font-normal mt-2">
          A self-described luxury permanent residence, the AKA Taj Apart offers
          guests the space and comfort of an apartment, with the service and
          amenities you’d expect at a five-star hotel.
        </p>
        <Link
          to="/apartments"
          className="px-6 py-2 bg-primary text-base text-white uppercase rounded mt-8"
        >
          view apartments
        </Link>
      </div>
    </div>
  )
}

export default About
