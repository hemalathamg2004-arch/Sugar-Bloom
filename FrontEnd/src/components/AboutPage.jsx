import React from 'react'
import './CSS/About.css'

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* PREMIUM HERO SECTION */}
      <div className="about-hero">
        <div className="hero-blur-1"></div>
        <div className="hero-blur-2"></div>
        <div className="about-hero-content">
          <span className="hero-label">BEYOND BAKING</span>
          <h1>Crafting Sweet <span className="text-gradient">Digital Dreams</span></h1>
          <p>We're blending the art of traditional baking with the power of Artificial Intelligence to redefine your dessert experience.</p>
          <div className="floating-icons">
            <span className="float-1">🍰</span>
            <span className="float-2">🤖</span>
            <span className="float-3">✨</span>
          </div>
        </div>
      </div>

      <div className="about-content">
        {/* 1. STORY & MISSION (The Heart) */}
        <div className="about-story-grid">
          <div className="about-section story-card">
            <span className="section-badge">OUR JOURNEY</span>
            <h2>Our Story</h2>
            <p>
              Sugar Bloom was born from a simple idea: everyone deserves access to delicious, 
              high-quality sweet treats delivered fast and fresh. What started as a small bakery 
              in 2020 has now grown into a trusted dessert delivery platform connecting 
              customers with the best bakeries in town.
            </p>
          </div>
          <div className="about-section mission-card">
            <span className="section-badge">OUR PURPOSE</span>
            <h2>Our Mission</h2>
            <p>
              To bring bakery-fresh treats to your doorstep with unprecedented speed 
              and care. We believe that great desserts have the power to bring people together 
              and make every moment special.
            </p>
          </div>
        </div>

        {/* 2. WHY CHOOSE US? (New Feature) */}
        <div className="values-section">
           <div className="values-header">
             <span className="values-badge">💎 CORE VALUES</span>
             <h2>Why Choose Sugar Bloom?</h2>
           </div>
           <div className="values-grid">
             <div className="value-item">
               <div className="value-icon">🧁</div>
               <h3>Freshly Baked</h3>
               <p>Every item is prepared fresh by our expert bakery partners only after you order.</p>
             </div>
             <div className="value-item">
               <div className="value-icon">🤖</div>
               <h3>AI Powered</h3>
               <p>Our advanced AI understands your mood and suggests the perfect dessert for you.</p>
             </div>
             <div className="value-item">
               <div className="value-icon">🚀</div>
               <h3>Swift Delivery</h3>
               <p>We ensure your sweet cravings are satisfied within minutes, not hours.</p>
             </div>
           </div>
        </div>

        {/* 3. INNOVATION (The Brain) */}
        <div className="highlight-section">
          <div className="highlight-badge">🚀 INNOVATION</div>
          <h2 className="highlight-title">Voice Based Food Ordering System</h2>
          <p className="highlight-description">
            Sugar Bloom introduces a revolutionary way to order desserts - just use your voice! 
            Our advanced voice recognition technology allows you to browse dessert menus, place orders, 
            and track deliveries hands-free.
          </p>
          <div className="voice-features">
            <div className="voice-feature">
              <span className="voice-icon">🎤</span>
              <span>Hands-free ordering</span>
            </div>
            <div className="voice-feature">
              <span className="voice-icon">🗣️</span>
              <span>Multi-language support</span>
            </div>
            <div className="voice-feature">
              <span className="voice-icon">⚡</span>
              <span>Instant voice recognition</span>
            </div>
            <div className="voice-feature">
              <span className="voice-icon">🔊</span>
              <span>Voice confirmation</span>
            </div>
          </div>
        </div>

        {/* 4. AI TIPS */}
        <div className="tips-section">
          <div className="tips-header">
            <span className="tips-badge">✨ AI SOMMELIER TIPS</span>
            <h2>How to Get Perfect Suggestions</h2>
            <p>Try these prompts with our AI Voice Assistant to discover your perfect treat!</p>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-emoji">🎉</div>
              <div className="tip-mood">Celebrating</div>
              <div className="tip-prompt">"I am celebrating my birthday!"</div>
              <div className="tip-result">→ Suggests fancy Layer Cakes</div>
            </div>
            <div className="tip-card">
              <div className="tip-emoji">💼</div>
              <div className="tip-mood">After a Meeting</div>
              <div className="tip-prompt">"I just finished a tough meeting."</div>
              <div className="tip-result">→ Suggests indulgent Mousse</div>
            </div>
            <div className="tip-card">
              <div className="tip-emoji">😰</div>
              <div className="tip-mood">Stressed Out</div>
              <div className="tip-prompt">"I am feeling very stressed today."</div>
              <div className="tip-result">→ Suggests rich Brownies</div>
            </div>
            <div className="tip-card">
              <div className="tip-emoji">☕</div>
              <div className="tip-mood">Cozy Evening</div>
              <div className="tip-prompt">"It is a rainy evening and I want something cozy."</div>
              <div className="tip-result">→ Suggests warm Lava Cakes</div>
            </div>
            <div className="tip-card">
              <div className="tip-emoji">⚡</div>
              <div className="tip-mood">Feeling Energetic</div>
              <div className="tip-prompt">"I am feeling super energetic today!"</div>
              <div className="tip-result">→ Suggests light fruity Tarts</div>
            </div>
            <div className="tip-card">
              <div className="tip-emoji">🍎</div>
              <div className="tip-mood">Health Conscious</div>
              <div className="tip-prompt">"I want something sweet but healthy."</div>
              <div className="tip-result">→ Suggests Fruit Salads & Oats</div>
            </div>
          </div>
        </div>

        {/* 5. STATS (Proof) */}
        <div className="stats-section">
          <div className="stat-item">
            <h3>50+</h3>
            <p>Bakery Partners</p>
          </div>
          <div className="stat-item">
            <h3>50k+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>10min</h3>
            <p>Avg. Delivery Time</p>
          </div>
          <div className="stat-item">
            <h3>4.8★</h3>
            <p>Customer Rating</p>
          </div>
        </div>

        {/* 6. TECH STACK */}
        <div className="tech-section">
          <div className="tech-header">
            <span className="tech-badge">💻 THE ENGINE</span>
            <h2>Our Technology Stack</h2>
            <p>Built with modern technologies for a seamless experience.</p>
          </div>
          <div className="tech-grid">
            <div className="tech-card"><h3>⚛️ React.js</h3></div>
            <div className="tech-card"><h3>🐍 Django</h3></div>
            <div className="tech-card"><h3>🤖 Groq AI</h3></div>
            <div className="tech-card"><h3>🛢️ MySQL</h3></div>
          </div>
        </div>

        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-card lead">
              <div className="team-icon">👩‍💻</div>
              <h3>Hemalatha M</h3>
              <p className="team-role">Full Stack Developer</p>
              <p className="team-dept">Information Science Engineering - 4th Year</p>
             
              <p className="team-desc">
                Leading the development of Sugar Bloom with expertise in both frontend and backend technologies.
                Implemented the voice recognition system and full stack architecture.
              </p>
            </div>

           

            
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <h3>50+</h3>
            <p>Bakery Partners</p>
          </div>
          <div className="stat-item">
            <h3>50k+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>10min</h3>
            <p>Avg. Delivery Time</p>
          </div>
          <div className="stat-item">
            <h3>4.8★</h3>
            <p>Customer Rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage