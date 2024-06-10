import PropTypes from "prop-types"

const Announcement = ({ announcement }) => {
  return (
    <div className="w-full rounded-xl bg-white/5 p-6 border-2 border-primary backdrop-blur-2xl">
      <h3 className="text-2xl text-primary font-bold">{announcement.title}</h3>
      <p className="text-base text-secondary font-normal mt-3">
        {announcement.desc}
      </p>
    </div>
  )
}

Announcement.propTypes = {
  announcement: PropTypes.object,
}

export default Announcement
