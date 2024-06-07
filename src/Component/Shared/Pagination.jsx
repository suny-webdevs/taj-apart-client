import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"
import PropTypes from "prop-types"

const Pagination = ({
  totalData,
  dataPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPage = Math.ceil(totalData / dataPerPage)

  const pages = [...Array(totalPage).keys()].map((page) => page + 1)

  const handlePaginationButton = (value) => {
    setCurrentPage(value)
  }

  return (
    <div className="container mx-auto flex justify-center gap-5 flex-wrap px-10 mt-20">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePaginationButton(currentPage - 1)}
        className="flex items-center gap-3 py-2 px-5 hover:text-white bg-gray-100 hover:bg-[#F8B189] rounded"
      >
        <FaArrowLeftLong /> Previous
      </button>

      <div className="flex gap-5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePaginationButton(page)}
            className={`hidden md:flex py-2 px-5 ${
              currentPage === page
                ? "text-white bg-[#F8B189]"
                : "text-black bg-gray-100"
            } hover:text-white hover:bg-[#F8B189] rounded`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === 7}
        onClick={() => handlePaginationButton(currentPage + 1)}
        className="flex items-center gap-3 py-2 px-5 hover:text-white bg-gray-100 hover:bg-[#F8B189] rounded"
      >
        Next <FaArrowRightLong />
      </button>
    </div>
  )
}

Pagination.propTypes = {
  totalData: PropTypes.number,
  dataPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
}

export default Pagination
