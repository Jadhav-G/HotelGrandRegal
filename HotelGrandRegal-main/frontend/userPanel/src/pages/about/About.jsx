import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import hotelImage from './assets/hotel.avif';
import serviceImage from './assets/hotel.avif';
import teamImage from './assets/hotel.avif';
import {useNavigate} from 'react-router-dom';

export default function About() {
  function yearsPassed(fromDateStr) {
    const [day, month, year] = fromDateStr.split("/").map(Number);
    const fromDate = new Date(year, month - 1, day); // JS months are 0-based
    const now = new Date();
  
    let years = now.getFullYear() - fromDate.getFullYear();
  
    // Adjust if the current date is before the anniversary this year
    const hasAnniversaryPassed =
      now.getMonth() > fromDate.getMonth() ||
      (now.getMonth() === fromDate.getMonth() && now.getDate() >= fromDate.getDate());
  
    if (!hasAnniversaryPassed) {
      years--;
    }
  
    return years;
  }
  function formatNumber(num) {
    if (num >= 1_000_000_000) {
      return Math.round(num / 1_000_000_000) + 'B';
    } else if (num >= 1_000_000) {
      return Math.round(num / 1_000_000) + 'M';
    } else if (num >= 1_000) {
      return Math.round(num / 1_000) + 'K';
    } else {
      return num.toString();
    }
  }
  
  
  
  console.log("Years passed:", yearsPassed("12/03/2023"));
  
  const observerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Animation on scroll effect
    const animatedElements = document.querySelectorAll(`.${styles.animate}`);
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.fadeIn);
        }
      });
    }, { threshold: 0.15 });
    
    animatedElements.forEach(el => {
      observerRef.current.observe(el);
    });
    
    // Mouse parallax effect for hero
    const heroSection = document.querySelector(`.${styles.hero}`);
    const heroImage = document.querySelector(`.${styles.heroImage}`);
    const heroText = document.querySelector(`.${styles.heroText}`);
    
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      heroImage.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(1.05)`;
      heroText.style.transform = `translate(calc(-50% + ${x * 10}px), calc(-50% + ${y * 10}px))`;
    };
    
    heroSection?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (observerRef.current) {
        animatedElements.forEach(el => {
          observerRef.current.unobserve(el);
        });
      }
      heroSection?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className={styles.container} style={{marginTop:"-100px"}}>
      <div className={styles.patternOverlay}></div>
      <section className={styles.hero}>
        <div className={styles.heroImageContainer}>
          <img src={hotelImage} alt="Our Hotel" className={styles.heroImage} />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroText}>
          <div className={styles.decorBorder}>
            <div className={styles.decorCorner}></div>
          </div>
          <h1>About <span className={styles.accent}>Hotel Grand Regal</span></h1>
          <p>Experience luxury and comfort like never before. Nestled in nature, yet connected to the heart of the city.</p>
          <button className={styles.ctaButton} onClick={()=>navigate('/Gallery')}>
            <span>Explore Beauty</span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </section>
      
      <div className={styles.ornamentDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerSymbol}>✦</div>
        <div className={styles.dividerLine}></div>
      </div>
      
      <section className={styles.infoSection}>
        <div className={`${styles.sectionTitle} ${styles.animate}`}>
          <h2>Why Choose Us</h2>
          <div className={styles.fancyUnderline}>
            <div className={styles.underlineDot}></div>
            <div className={styles.underline}></div>
            <div className={styles.underlineDot}></div>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.animate}`}>
          <div className={styles.cardImage}>
            <div className={styles.imageFrame}>
              <img src={serviceImage} alt="Our Services" />
            </div>
            <div className={styles.cardTag}>Premium</div>
          </div>
          <div className={styles.cardContent}>
            <h2>Exceptional <span className={styles.accent}>Services</span></h2>
            <div className={styles.cardUnderline}></div>
            <p><span className={styles.dropCap}>F</span>rom concierge assistance to spa relaxation and rooftop dining, we ensure top-class hospitality for every guest. Our amenities are designed to provide the ultimate comfort and convenience during your stay.</p>
            <ul className={styles.featureList}>
              <li><span className={styles.checkmark}>✓</span> 24/7 Concierge</li>
              <li><span className={styles.checkmark}>✓</span> Luxury Spa</li>
              <li><span className={styles.checkmark}>✓</span> Fine Dining</li>
            </ul>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.reverse} ${styles.animate}`}>
          <div className={styles.cardImage}>
            <div className={styles.imageFrame}>
              <img src={teamImage} alt="Our Team" />
            </div>
            <div className={styles.cardTag}>Expert</div>
          </div>
          <div className={styles.cardContent}>
            <h2>Passionate <span className={styles.accent}>Team</span></h2>
            <div className={styles.cardUnderline}></div>
            <p><span className={styles.dropCap}>O</span>ur dedicated staff brings years of experience and a warm attitude, making your stay truly special. We take pride in our attention to detail and personalized service that exceeds expectations.</p>
            <ul className={styles.featureList}>
              <li><span className={styles.checkmark}>✓</span> Professional Staff</li>
              <li><span className={styles.checkmark}>✓</span> Personalized Service</li>
              <li><span className={styles.checkmark}>✓</span> Multilingual Assistance</li>
            </ul>
          </div>
        </div>
      </section>
      
      <div className={styles.parallaxBanner}>
        <div className={styles.parallaxOverlay}></div>
        <div className={styles.parallaxContent}>
          <h2>Luxury Redefined</h2>
          <p>Every detail carefully crafted for an unforgettable experience</p>
        </div>
      </div>
      
      <section className={`${styles.stats} ${styles.animate}`}>
        <div className={styles.statItem}>
          <div className={styles.statCircle}>
            <span className={styles.statNumber}>{yearsPassed('04/04/2022')}+</span>
          </div>
          <span className={styles.statLabel}>Years of Excellence</span>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statCircle}>
            <span className={styles.statNumber}>{formatNumber(yearsPassed('04/04/2022') * 30000)}+</span>
          </div>
          <span className={styles.statLabel}>Happy Guests</span>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statCircle}>
            <span className={styles.statNumber}>3+</span>
          </div>
          <span className={styles.statLabel}>Luxury Rooms</span>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statCircle}>
            <span className={styles.statNumber}>24/7</span>
          </div>
          <span className={styles.statLabel}>Guest Service</span>
        </div>
      </section>
    </div>
  );
}