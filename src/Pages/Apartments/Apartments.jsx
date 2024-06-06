import { useEffect, useState } from "react"
import Apartment from "../../Component/Apartment/Apartment"
import LoadingSpinner from "../../Component/Shared/LoadingSpinner"
import Pagination from "../../Component/Shared/Pagination"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import useAuth from "../../Hooks/useAuth"

const Apartments = () => {
  const { loading, setLoading } = useAuth()
  const axiosPublic = useAxiosPublic()
  const [apartments, setApartments] = useState([])
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const dataPerPage = 6

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosPublic(
        `/all-apartments?page=${currentPage}&size=${dataPerPage}`
      )
      setApartments(data)
      setLoading(false)
    }
    getData()
  }, [axiosPublic, currentPage, dataPerPage, setLoading])

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosPublic("/apartments-count")
      setCount(data?.count)
    }
    getCount()
  }, [axiosPublic])

  if (loading) return <LoadingSpinner />

  return (
    <div className="mt-20 px-5 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {apartments.map((apartment) => (
          <Apartment
            key={apartment._id}
            apartment={apartment}
          />
        ))}
      </div>
      <Pagination
        totalData={count}
        dataPerPage={dataPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Apartments
