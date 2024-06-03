import PropTypes from "prop-types"

const Apartment = ({ apartment }) => {
  const { apartment_image, floor_no, block_name, apartment_no, rent_per_year } =
    apartment

  return (
    <div>
      <div className="border border-gray-300 hover:border-primary transition-colors duration-150 border-b-4 rounded">
        {/* Card image */}
        <div className="h-72 w-full">
          <img
            src={apartment_image}
            className="w-full h-full object-cover group-hover:scale-150 transition"
          />
        </div>
        {/* Card content */}
        <div className="px-8 py-5">
          <div className="">
            <p className="py-2 pl-4 border-b uppercase">
              Floor No: <span className="font-bold">{floor_no}</span>
            </p>
            <p className="py-2 pl-4 border-b uppercase">
              Block Name: <span className="font-bold">{block_name}</span>
            </p>
            <p className="py-2 pl-4 border-b uppercase">
              Apartment No: <span className="font-bold">{apartment_no}</span>
            </p>
            <p className="py-2 text-primary text-lg font-bold uppercase pl-4">
              Rent: <span className="">${rent_per_year} /year</span>
            </p>
          </div>
          <div className="mt-5 flex justify-center">
            <button className="px-6 py-2 bg-primary text-white rounded">
              Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Apartment.propTypes = {
  apartment: PropTypes.object,
}

export default Apartment
