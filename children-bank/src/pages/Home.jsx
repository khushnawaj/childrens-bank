import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaPiggyBank, 
  FaSignInAlt, 
  FaUserPlus, 
  FaCoins, 
  FaChartLine, 
  FaAward,
  FaStar,
  FaChild
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/styles.css";

const FeatureCard = ({ icon, title, description }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
        textAlign: "center",
        flex: "1",
        minWidth: "250px",
        margin: "10px"
      }}
    >
      <div style={{
        fontSize: "2.5rem",
        color: "#1E90FF",
        marginBottom: "15px"
      }}>
        {icon}
      </div>
      <h3 style={{
        color: "#333",
        marginBottom: "10px"
      }}>
        {title}
      </h3>
      <p style={{ color: "#666" }}>
        {description}
      </p>
    </motion.div>
  );
};

const TestimonialCard = ({ name, age, quote }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
        margin: "10px",
        maxWidth: "350px"
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "15px"
      }}>
        <div style={{
          backgroundColor: "#FFD700",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "15px"
        }}>
          <FaChild size={24} color="#333" />
        </div>
        <div>
          <h4 style={{ margin: 0 }}>{name}</h4>
          <p style={{ margin: 0, color: "#666" }}>Age {age}</p>
        </div>
      </div>
      <p style={{ color: "#333", fontStyle: "italic" }}>"{quote}"</p>
      <div style={{ display: "flex", marginTop: "10px" }}>
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color="#FFD700" />
        ))}
      </div>
    </motion.div>
  );
};

const Home = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "linear-gradient(135deg, #FFD700 0%, #1E90FF 100%)",
      padding: "20px",
      textAlign: "center",
      fontFamily: "'Comic Neue', cursive, sans-serif"
    }}>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          maxWidth: "800px",
          width: "100%",
          margin: "40px 0"
        }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <FaPiggyBank
            size={80}
            style={{
              color: "#1E90FF",
              marginBottom: "20px",
              filter: "drop-shadow(0 5px 5px rgba(0,0,0,0.1))"
            }}
          />
        </motion.div>
        
        <h1 style={{
          fontSize: "3rem",
          color: "#333",
          marginBottom: "20px",
          fontWeight: "bold",
          background: "linear-gradient(45deg, #1E90FF, #FF6B6B)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
        }}>
          Welcome to <span style={{ color: "#1E90FF" }}>Kids</span> Bank!
        </h1>

        <p style={{
          fontSize: "1.3rem",
          color: "#666",
          marginBottom: "40px",
          lineHeight: "1.6"
        }}>
          Where kids learn to save, earn, and manage money in a fun and safe environment!
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}>
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px 30px",
              backgroundColor: "#1E90FF",
              color: "white",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#187bcd"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#1E90FF"}
          >
            <FaSignInAlt /> Login
          </Link>

          <Link
            to="/signup"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px 30px",
              backgroundColor: "#FF6B6B",
              color: "white",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#e05555"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#FF6B6B"}
          >
            <FaUserPlus /> Sign Up
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "40px 0",
        padding: "20px"
      }}>
        <h2 style={{
          color: "white",
          fontSize: "2.5rem",
          marginBottom: "40px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
        }}>
          Why Kids Love Our Bank
        </h2>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px"
        }}>
          <FeatureCard
            icon={<FaCoins />}
            title="Easy Savings"
            description="Set goals and watch your money grow with fun visualizations"
          />
          <FeatureCard
            icon={<FaChartLine />}
            title="Track Progress"
            description="See how much you've saved with colorful charts and graphs"
          />
          <FeatureCard
            icon={<FaAward />}
            title="Earn Badges"
            description="Get rewarded for reaching your savings milestones"
          />
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "40px 0",
        padding: "20px"
      }}>
        <h2 style={{
          color: "white",
          fontSize: "2.5rem",
          marginBottom: "40px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
        }}>
          What Our Young Savers Say
        </h2>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px"
        }}>
          <TestimonialCard
            name="Emma"
            age="9"
            quote="I saved up for a new bike all by myself! Kids Bank made it so fun!"
          />
          <TestimonialCard
            name="Liam"
            age="11"
            quote="I love earning badges when I reach my savings goals. It's like a game!"
          />
          <TestimonialCard
            name="Sophia"
            age="8"
            quote="My piggy bank is now digital and I can see my money grow every day!"
          />
        </div>
      </div>

      {/* How It Works Section */}
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 }
        }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          maxWidth: "800px",
          width: "100%",
          margin: "40px 0"
        }}
      >
        <h2 style={{
          color: "#1E90FF",
          fontSize: "2.5rem",
          marginBottom: "30px"
        }}>
          How It Works
        </h2>
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          textAlign: "left"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              backgroundColor: "#1E90FF",
              color: "white",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
              flexShrink: 0
            }}>
              1
            </div>
            <div>
              <h3 style={{ color: "#333", marginBottom: "5px" }}>Sign Up</h3>
              <p style={{ color: "#666" }}>Parents create an account and set up profiles for their kids.</p>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              backgroundColor: "#1E90FF",
              color: "white",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
              flexShrink: 0
            }}>
              2
            </div>
            <div>
              <h3 style={{ color: "#333", marginBottom: "5px" }}>Set Goals</h3>
              <p style={{ color: "#666" }}>Kids choose what they want to save for and set savings targets.</p>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              backgroundColor: "#1E90FF",
              color: "white",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
              flexShrink: 0
            }}>
              3
            </div>
            <div>
              <h3 style={{ color: "#333", marginBottom: "5px" }}>Track & Grow</h3>
              <p style={{ color: "#666" }}>Watch savings grow, earn rewards, and learn money skills!</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final CTA */}
      <div style={{
        margin: "40px 0",
        padding: "20px",
        textAlign: "center"
      }}>
        <h2 style={{
          color: "white",
          fontSize: "2.5rem",
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
        }}>
          Ready to Start Your Savings Adventure?
        </h2>
        <Link
          to="/signup"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "15px 40px",
            backgroundColor: "#FFD700",
            color: "#333",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.3rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginTop: "20px"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#FFC000";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#FFD700";
            e.target.style.transform = "scale(1)";
          }}
        >
          <FaPiggyBank /> Join Now - It's Free!
        </Link>
      </div>
    </div>
  );
};

export default Home;