import { Helmet } from "react-helmet-async"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import toast from "react-hot-toast"

const MakeAnnouncements = () => {
  const axiosSecure = useAxiosSecure()

  const handlePostAnnouncement = async (e) => {
    e.preventDefault()
    try {
      const form = e.target
      const title = form.title.value
      const desc = form.desc.value

      const savedInfo = {
        title,
        desc,
      }

      const { data } = await axiosSecure.post("/announcements", savedInfo)
      if (data.insertedId) {
        toast.success("Announcement was making successfully!")
        form.reset()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="p-5 w-full min-h-screen">
      <Helmet>
        <title>Make Announcements | Taj Apart</title>
      </Helmet>
      <h1 className="text-center text-primary text-2xl md:text-4xl font-bold py-5">
        Make Announcements
      </h1>
      <div className="p-5 flex justify-center">
        <div className="card shrink-0 w-full max-w-3xl border bg-base-100">
          <form
            onSubmit={handlePostAnnouncement}
            className="card-body"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Announcement title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="desc"
                placeholder="Announcement description..."
                className="textarea textarea-bordered textarea-lg w-full max-w-3xl"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="bg-primary text-white py-2 rounded"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MakeAnnouncements
