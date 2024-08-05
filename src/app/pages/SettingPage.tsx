import React, { useState } from 'react';
import { Content } from '../../_metronic/layout/components/content';

interface Location {
  latitude: number;
  longitude: number;
}

const SettingsPage = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          
        });
        
        setError(null);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setError('The request to get user location timed out.');
            break;
          default:
            setError('An unknown error occurred.');
            break;
        }
      }
    );
  };

  return (
    <div>
      {/* <h1>Settings Page</h1> */}

      <Content>
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='d-flex my-4'>
            <button onClick={handleGetLocation} className='btn btn-sm btn-primary me-3'>
            Allow Location Access
                    </button>
                    </div>
      {/* <button onClick={handleGetLocation}>Allow Location Access</button> */}
      {location && (
        <div>
          <h3>Your Location:</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>
            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
          </p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
    </div>
    </Content>
    </div>
  );
};

export  {SettingsPage};
