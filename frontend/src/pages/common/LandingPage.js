import React from 'react';
import ArticleList from '../Nilupul/ArticleList';
import one from '../../images/common/slider/1.png';
import two from '../../images/common/slider/2.png';
import three from '../../images/Sudarshan/fertilizer images/tsp.png';

import SlideShow from '../../Component/common/Slideshow';

const images = [
  { url: one },
  { url: two },
  { url: three },
];

const DealerSignUp = () => {
  const slideshowImages = [
    require('../../images/Rahul/1.png'),
    require('../../images/Rahul/2.png'),
    require('../../images/Rahul/3.png')
  ];

  return (
    <>
    <SlideShow images={slideshowImages} />
    <ArticleList />
    </>
  );
}

export default DealerSignUp;