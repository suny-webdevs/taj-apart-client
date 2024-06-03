import Apartment from "../../Component/Apartment/Apartment"
import LoadingSpinner from "../../Component/Shared/LoadingSpinner"
import useApartments from "../../Hooks/useApartments"

const Apartments = () => {
  const [apartments, isLoading] = useApartments()

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="mt-20 px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {apartments.map((apartment) => (
          <Apartment
            key={apartment._id}
            apartment={apartment}
          />
        ))}
      </div>
    </div>
  )
}

export default Apartments
