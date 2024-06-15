import PropTypes from "prop-types"

const CouponCard = ({ coupon }) => {
  return (
    <div className="uppercase flex">
      <div className="bg-primary text-secondary w-1/2 h-44 md:h-40 p-5 border-x-[14px] border-dotted border-white">
        <p className="text-base text-center">use coupon</p>
        <h1 className="text-3xl md:text-5xl text-center font-bold font-ostt mt-4 mb-2">
          {coupon.code}
        </h1>
        <p className="text-base text-center">and get</p>
      </div>
      <div className="bg-secondary text-primary w-1/2 h-44 md:h-40 p-5 border-x-[14px] border-dotted border-white">
        <p className="text-base text-center">off</p>
        <h1 className="text-7xl text-center font-bold font-ostt my-1">
          {coupon.discount}%
        </h1>
        <p className="text-base text-center">discount</p>
      </div>
    </div>
  )
}

CouponCard.propTypes = {
  coupon: PropTypes.object,
}

export default CouponCard
