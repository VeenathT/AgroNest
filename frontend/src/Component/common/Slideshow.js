import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Import the default styles

const Slideshow = ({ images }) => {
  const slideStyles = {
    height: '500px', // Set the height of each slide
    display: 'flex',
    
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="slide-container">
      <Slide>
        {images.map((url, index) => (
          <div key={index} className="each-slide" style={slideStyles}>
            <div style={{ 'backgroundImage': `url(${url})`, height: '100%', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              {/* If you want to display a caption, you can add it here */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default Slideshow;
