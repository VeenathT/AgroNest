import React from 'react';
import ArticleList from '../../pages/Nilupul/ArticleList';
import SlideShow from '../../Component/common/Slideshow';
import one from '../../images/common/slider/1.png';
import two from '../../images/common/slider/2.png';
import three from '../../images/Sudarshan/fertilizer images/tsp.png';


const images = [
  { url: one },
  { url: two },
  { url: three },
];

const LandingPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="App" style={{ width: '100%', marginBottom: '20px' }}>
        <SlideShow images={images} />
      </div>
      <div style={{ width: '100%' }}>
        <ArticleList />
      </div>
    </div>
  );
}

export default LandingPage;
