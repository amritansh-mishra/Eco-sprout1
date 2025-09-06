import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMap = ({ height = '400px', showNMIT = true, additionalMarkers = [] }) => {
  // NMIT Bangalore Yelahanka coordinates
  const nmitCoordinates = [13.1986, 77.7066];
  
  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={nmitCoordinates}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {showNMIT && (
          <Marker position={nmitCoordinates}>
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">NMIT Bangalore</h3>
                <p className="text-sm text-gray-600">Nitte Meenakshi Institute of Technology</p>
                <p className="text-xs text-gray-500">Yelahanka, Bangalore</p>
              </div>
            </Popup>
          </Marker>
        )}
        
        {additionalMarkers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">{marker.title}</h3>
                {marker.description && (
                  <p className="text-sm text-gray-600">{marker.description}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

LocationMap.propTypes = {
  height: PropTypes.string,
  showNMIT: PropTypes.bool,
  additionalMarkers: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
};

LocationMap.defaultProps = {
  height: '400px',
  showNMIT: true,
  additionalMarkers: [],
};

export default LocationMap;
