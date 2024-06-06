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

  console.log(pages)

  const handlePaginationButton = (value) => {
    setCurrentPage(value)
  }

  return (
    <div className="w-full flex justify-center mt-20">
      <button
        onClick={() => handlePaginationButton(currentPage - 1)}
        className={`${
          currentPage === 1 && "hidden"
        } py-2 px-4 m-2 hover:text-white bg-gray-100 hover:bg-[#F8B189] rounded`}
      >
        <FaArrowLeftLong />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePaginationButton(page)}
          className={`py-2 px-4 m-2 ${
            currentPage === page
              ? "text-white bg-[#F8B189]"
              : "text-black bg-gray-100"
          } hover:text-white hover:bg-[#F8B189] rounded`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePaginationButton(currentPage + 1)}
        className={`${
          currentPage === 7 && "hidden"
        } py-2 px-4 m-2 hover:text-white bg-gray-100 hover:bg-[#F8B189] rounded`}
      >
        <FaArrowRightLong />
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
