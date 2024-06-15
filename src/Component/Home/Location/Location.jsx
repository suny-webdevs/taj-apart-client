import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const Location = () => {
  return (
    <div className="flex flex-col md:flex-row px-2 md:px-20 rounded-md">
      {/* Content */}
      <div className="w-full md:w-1/2 bg-[#f7f7f7] p-5 md:p-10 rounded-md">
        <h1 className="text-6xl text-primary font-ostt font-bold">
          Our Location
        </h1>
        <p className="text-lg">123 Main St</p>
        <p className="text-lg">Metropolis, NY, USA, 12345</p>

        <h3 className="text-3xl text-primary font-ostt font-bold mt-7">
          Direction
        </h3>
        <p className="text-lg">
          Take the subway to Main St, then walk two blocks north.
        </p>
      </div>
      {/* Map */}
      <div className="w-full md:w-1/2 rounded-md -z-0">
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[40.7128, -74.006]}>
            <Popup>123 Main St</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default Location
