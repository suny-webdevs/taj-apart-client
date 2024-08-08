import PropTypes from "prop-types"

const Announcement = ({ announcement }) => {
  return (
    <div className="w-full rounded-md text-gray-800 bg-primary hover:text-primary hover:bg-secondary transition-colors duration-150 p-5 backdrop-blur-2xl">
      <h3 className="text-2xl font-bold flex items-center justify-between">
        <span>{announcement.title}</span>
        <span className="text-sm font-medium">{announcement.date}</span>
      </h3>
      <p className="text-base mt-3">{announcement.desc}</p>
    </div>
  )
}

Announcement.propTypes = {
  announcement: PropTypes.object,
}

export default Announcement
