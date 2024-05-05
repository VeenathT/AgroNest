import React from 'react';
import ArticleList from '../Nilupul/ArticleList';
import one from '../../images/common/slider/1.png';
import two from '../../images/common/slider/2.png';
import three from '../../images/Sudarshan/fertilizer images/tsp.png';


import SlideShow from '../../Component/common/Slideshow'
const images = [
  { url: one},
  { url: two},
  { url: three},
  // Add more images as needed
];

const DealerSignUp = () => {
  const images = [
    require('../../images/Rahul/1.png'),
    require('../../images/Rahul/2.png'),
    require('../../images/Rahul/3.png')
  ];

  return (
    
    <>
  

    
    <div className="App">
      <h1>My Slideshow</h1>
      <SlideShow images={images} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', marginTop: '150px' }}>
      <ArticleList />
    </div>
    </>
  
    
    
  );
}


export default DealerSignUp;
