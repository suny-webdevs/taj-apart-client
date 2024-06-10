import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import PropTypes from "prop-types"

export default function CouponModal({ handleSaveCoupon, isOpen, close }) {
  return (
    <>
      <Transition
        appear
        show={isOpen}
      >
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto mt-32 md:mt-0 md:ml-36">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 border-2 border-primary p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-2xl text-center font-bold text-primary uppercase"
                  >
                    Add a coupon
                  </DialogTitle>
                  <div className="card shrink-0 w-full">
                    <form
                      onSubmit={handleSaveCoupon}
                      className="card-body"
                    >
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Coupon Code</span>
                        </label>
                        <input
                          type="text"
                          name="code"
                          placeholder="Enter coupon code"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Discount Amount</span>
                        </label>
                        <input
                          type="number"
                          name="discount"
                          placeholder="Enter discount amount"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Coupon Description</span>
                        </label>
                        <input
                          type="text"
                          name="desc"
                          placeholder="Enter coupon description"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="form-control mt-9 w-full">
                        <button
                          onClick={close}
                          type="submit"
                          className="bg-primary text-white rounded-md py-3"
                        >
                          Create coupon
                        </button>
                      </div>
                    </form>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

CouponModal.propTypes = {
  handleSaveCoupon: PropTypes.func,
  isOpen: PropTypes.bool,
  close: PropTypes.func,
}
