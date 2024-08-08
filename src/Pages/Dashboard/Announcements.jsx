import Announcement from "../../Component/Dashboard/Sidebar/Announcements/Announcement"
import LoadingSpinner from "../../Component/Shared/LoadingSpinner"
import useAnnounce from "../../Hooks/useAnnounce"

const Announcements = () => {
  const [announcements, isLoading] = useAnnounce()

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-3xl text-primary font-bold uppercase mb-10">
        Announcements
      </h1>
      <div className="flex justify-start items-center">
        <div className="card gap-2 shrink-0 w-full max-w-3xl bg-base-100">
          {announcements.map((announcement) => (
            <Announcement
              key={announcement._id}
              announcement={announcement}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Announcements
