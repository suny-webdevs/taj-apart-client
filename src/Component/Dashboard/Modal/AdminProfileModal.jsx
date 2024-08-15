import { Dialog, DialogPanel } from "@headlessui/react"
import { AnimatePresence, motion } from "framer-motion"
import PropTypes from "prop-types"
import useAuth from "../../../Hooks/useAuth"

function AdminProfileModal({ isOpen, close }) {
  const { user } = useAuth()

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={close}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center md:transform md:translate-x-32 md:translate-y-10 p-1">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg space-y-4 bg-white p-2 rounded"
              >
                <div>
                  <img
                    src={user?.photoURL}
                    alt="admin"
                    className="rounded-md"
                  />
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

AdminProfileModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
}

export default AdminProfileModal
