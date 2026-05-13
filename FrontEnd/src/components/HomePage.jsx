import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CSS/Hero.css'
import ItemsPage from './ItemsPage';

const HomePage = () => {
  useEffect(() => {
    const particles = document.createElement('div');
    particles.className = 'particles';
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = 10 + Math.random() * 10 + 's';
      particles.appendChild(particle);
    }
    
    document.querySelector('.outerHero').appendChild(particles);
    
    return () => {
      if (particles.parentNode) {
        particles.remove();
      }
    };
  }, []);

  return (
    <>
        <div className='outerHero'>
            <div className='Hero'>
                <div className='HeroContent'>
                    <h1>
                        <span className='line'>DELICIOUS</span>
                        <span className='line'>
                            <span className='gradient-text'>TREATS</span>
                        </span>
                        <span className='line'>DELIVERED TO YOU</span>
                    </h1>
                    <p>Indulge in the finest cakes, pastries, and sweet treats crafted with love. Freshly baked and delivered right to your doorstep to satisfy your cravings.</p>
                    <div className='HeroButtons'>
                        <a href="#items">
                            <button className='HeroButtonPrimary'>ORDER NOW →</button>
                        </a>
                        <Link to="/about">
                            <button className='HeroButton'>LEARN MORE</button>
                        </Link>
                    </div>
                    

                    <div className='HeroFeatures'>
                        <div className='feature-item'>
                            <span className='feature-number'>50+</span>
                            <span className='feature-label'>Flavors</span>
                        </div>
                        <div className='feature-item'>
                            <span className='feature-number'>Fresh</span>
                            <span className='feature-label'>Baked Daily</span>
                        </div>
                        <div className='feature-item'>
                            <span className='feature-number'>50k+</span>
                            <span className='feature-label'>Happy Customers</span>
                        </div>
                    </div>
                </div>
                <div className='HeroImage'>
                    <div className='blob-1'></div>
                    <div className='blob-2'></div>
                    <img src="sugar_bloom.png" alt="Craving dessert" />
                    <div className='floating-element floating-1'>🍩</div>
                    <div className='floating-element floating-2'>🍰</div>
                    <div className='floating-element floating-3'>🧁</div>
                </div>
            </div>
        </div>
        <ItemsPage  />
        
    </>

  )
}

export default HomePage
