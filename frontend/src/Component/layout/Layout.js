import React,{ useState, useEffect } from 'react'

import Header from '../common/header'
import Footer from '../common/footer'
import TopBar from '../../pages/common/topbar'
import Router from '../../router/Router'


const Layout = () => {

        const [showFooter, setShowFooter] = useState(false);
        const [lastScrollTop, setLastScrollTop] = useState(0);
      
        useEffect(() => {
          const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setShowFooter(currentScrollTop > lastScrollTop);
            setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
          };
      
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }, [lastScrollTop]);
  
        return (
            <div style={{ paddingBottom: showFooter ? '80px' : '0' }}>
              <Header />
              <TopBar />
              <Router />
              <Footer visible={showFooter} />
            </div>
          );
  };


export default Layout