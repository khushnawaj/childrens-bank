import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCoins, FaCity, FaGlobe, FaCamera, FaTimes } from 'react-icons/fa';

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    country: '',
    profilePicture: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image type and size
      if (!file.type.match('image.*')) {
        setErrorMessage('Please select an image file (JPEG, PNG)');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrorMessage('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setUserDetails(prev => ({
          ...prev,
          profilePicture: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setUserDetails(prev => ({
      ...prev,
      profilePicture: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('name', userDetails.name);
      formData.append('email', userDetails.email);
      formData.append('password', userDetails.password);
      formData.append('city', userDetails.city);
      formData.append('country', userDetails.country);
      if (userDetails.profilePicture) {
        formData.append('profilePicture', userDetails.profilePicture);
      }

      const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert('Registration successful! Please login with your credentials.');
        navigate('/login');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error || 
                      'Registration failed. Please try again.';
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Full Name',
      icon: <FaUser />,
      required: true
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email Address',
      icon: <FaEnvelope />,
      required: true
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Create Password (min 6 characters)',
      icon: <FaLock />,
      required: true,
      minLength: 6
    },
    {
      name: 'city',
      type: 'text',
      placeholder: 'Your City',
      icon: <FaCity />,
      required: false
    },
    {
      name: 'country',
      type: 'text',
      placeholder: 'Your Country',
      icon: <FaGlobe />,
      required: false
    }
  ];

  return (
    <div className="signup-page" style={styles.pageContainer}>
      <div className="signup-card" style={styles.cardContainer}>
        <div className="brand-header" style={styles.brandHeader}>
          <FaCoins size={60} style={styles.brandIcon} />
          <h1 style={styles.brandTitle}>Join Kids Savings Bank</h1>
          <p style={styles.brandSubtitle}>Start your financial journey today!</p>
        </div>

        {errorMessage && (
          <div style={styles.errorAlert}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleFormSubmit} style={styles.formStyle}>
          {/* Profile Picture Upload */}
          <div style={styles.imageUploadContainer}>
            <div style={styles.avatarContainer}>
              {previewImage ? (
                <>
                  <img 
                    src={previewImage} 
                    alt="Profile preview" 
                    style={styles.avatarImage}
                  />
                  <button 
                    type="button" 
                    onClick={removeImage}
                    style={styles.removeImageButton}
                  >
                    <FaTimes />
                  </button>
                </>
              ) : (
                <div style={styles.avatarPlaceholder}>
                  <FaCamera size={24} />
                </div>
              )}
            </div>
            <div style={styles.uploadButtonContainer}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={styles.fileInput}
                id="profilePicture"
              />
              <label 
                htmlFor="profilePicture" 
                style={styles.uploadButton}
              >
                {previewImage ? 'Change Photo' : 'Upload Photo'}
              </label>
              <p style={styles.uploadHint}>JPEG or PNG (max 2MB)</p>
            </div>
          </div>

          {/* Other form fields */}
          {inputFields.map((field) => (
            <div key={field.name} style={styles.inputContainer}>
              <div style={styles.inputIcon}>
                {field.icon}
              </div>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={userDetails[field.name]}
                onChange={handleInputChange}
                required={field.required}
                minLength={field.minLength}
                style={styles.inputField}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            style={isSubmitting ? styles.submitButtonDisabled : styles.submitButton}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={styles.loginPrompt}>
          Already have an account?{' '}
          <a 
            href="/login" 
            style={styles.loginLink}
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Log in here
          </a>
        </div>
      </div>
    </div>
  );
}

// Updated styles with image upload components
const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px'
  },
  cardContainer: {
    width: '100%',
    maxWidth: '480px',
    padding: '2.5rem',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  brandHeader: {
    marginBottom: '2rem',
    color: '#2c3e50'
  },
  brandIcon: {
    marginBottom: '1rem',
    color: '#3498db'
  },
  brandTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#2c3e50'
  },
  brandSubtitle: {
    color: '#7f8c8d',
    fontSize: '0.95rem'
  },
  errorAlert: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem'
  },
  formStyle: {
    width: '100%'
  },
  imageUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '20px'
  },
  avatarContainer: {
    position: 'relative',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  avatarPlaceholder: {
    color: '#7f8c8d',
    fontSize: '1.5rem'
  },
  removeImageButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0
  },
  uploadButtonContainer: {
    flex: 1,
    textAlign: 'left'
  },
  fileInput: {
    display: 'none'
  },
  uploadButton: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  uploadHint: {
    marginTop: '4px',
    color: '#7f8c8d',
    fontSize: '0.8rem'
  },
  inputContainer: {
    marginBottom: '1.2rem',
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#3498db',
    fontSize: '0.9rem'
  },
  inputField: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: '1px solid #dfe6e9',
    borderRadius: '8px',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#f8f9fa'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  submitButtonDisabled: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#bdc3c7',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'not-allowed',
    marginTop: '0.5rem'
  },
  loginPrompt: {
    marginTop: '1.5rem',
    color: '#7f8c8d',
    fontSize: '0.9rem'
  },
  loginLink: {
    color: '#3498db',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline'
    }
  }
};

export default Signup;