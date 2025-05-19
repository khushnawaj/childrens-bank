import React from 'react'
import { Link } from 'react-router-dom'
import { FaSadTear, FaHome, FaSearch } from 'react-icons/fa'
import '../styles/styles.css'

function NotFound () {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #F8F9FA 0%, #E3F2FD 100%)',
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%'
        }}
      >
        <div
          style={{
            fontSize: '5rem',
            color: '#FF6B6B',
            marginBottom: '20px'
          }}
        >
          <FaSadTear />
        </div>

        <h1
          style={{
            fontSize: '2.5rem',
            color: '#333',
            marginBottom: '15px'
          }}
        >
          Oops! Page Not Found
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}
        >
          We couldn't find the page you're looking for. Maybe it's hiding with
          the lost coins?
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <Link
            to='/'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              backgroundColor: '#1E90FF',
              color: 'white',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => (e.target.style.backgroundColor = '#187bcd')}
            onMouseOut={e => (e.target.style.backgroundColor = '#1E90FF')}
          >
            <FaHome /> Go Home
          </Link>

          <Link
            to='/dashboard'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              backgroundColor: '#FFD700',
              color: '#333',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => (e.target.style.backgroundColor = '#e6c200')}
            onMouseOut={e => (e.target.style.backgroundColor = '#FFD700')}
          >
            <FaSearch /> Explore Dashboard
          </Link>
        </div>

        <div
          style={{
            marginTop: '40px',
            padding: '15px',
            backgroundColor: '#F8F9FA',
            borderRadius: '10px'
          }}
        >
          <p style={{ color: '#666', margin: 0 }}>
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
