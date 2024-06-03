import { ClockLoader } from "react-spinners"

const LoadingSpinner = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <ClockLoader
        size={100}
        color="#F8B189"
      />
    </div>
  )
}

export default LoadingSpinner
