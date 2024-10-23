import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';
import axios from 'axios';

const SignIn = () => {
  const [focusedField, setFocusedField] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loginType, setLoginType] = useState();
  const [userTypes, setUserTypes] = useState([]); // State to store user types

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const savedEmail = Cookies.get('savedEmail');
    const savedPassword = Cookies.get('savedPassword');

    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  // Fetch user types from the API
  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/usertypes/getall`);

        // Access the user types from the nested data property
        if (Array.isArray(response.data.data)) {
          setUserTypes(response.data.data); // Use response.data.data to get the user types
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };

    fetchUserTypes();
  }, [apiUrl]);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    let emailError = '';
    if (!email) {
      emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = 'Email is invalid';
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
  };

  const validatePassword = (password) => {
    let passwordError = '';
    if (!password) {
      passwordError = 'Password is required';
    } else if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters';
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  const handleBlur = (field) => {
    if (field === 'email' && email === '') {
      setFocusedField('');
    } else if (field === 'password' && password === '') {
      setFocusedField('');
    }
  };

  axios.defaults.baseURL = apiUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');

    // Perform validation
    validateEmail(email);
    validatePassword(password);

    // Check for errors before proceeding
    if (errors.email || errors.password) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        usertype_name: loginType,
      });

      console.log(response.data);
      Cookies.set('userToken', response.data.token);
      Cookies.set('loginType', loginType);
      Cookies.set('employeeName', response.data.name);

      axios.defaults.headers.common['Authorization'] = `${response.data.token}`;

      navigate('/dashboard');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again.';
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <form
        onSubmit={handleSubmit}
        className="card bg-white shadow-xl flex flex-col items-center gap-6 sm:gap-8 md:gap-9 rounded-3xl p-6 sm:p-8 md:p-12 w-full max-w-sm md:max-w-md lg:max-w-lg"
      >
        <h1 className="text-black uppercase tracking-wider font-bold text-lg sm:text-xl md:text-2xl">
          Sign In
        </h1>

        {/* Email Input */}
        <div className="relative w-full">
          <input
            type="text"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
              setFormTouched(true);
            }}
            className={`w-full p-2 outline-none text-black text-base bg-transparent border-l-2 border-b-2 border-black rounded-bl-lg transition-all duration-300 ${
              focusedField === 'email' || email
                ? 'border-t-2 border-r-2 border-black'
                : ''
            }`}
            onFocus={() => setFocusedField('email')}
            onBlur={() => handleBlur('email')}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <span
            className={`absolute left-2 top-2 transform transition-all duration-300 ${
              focusedField === 'email' || email
                ? 'translate-x-0 -translate-y-[1.5rem] text-xs sm:text-sm md:text-base bg-black text-white'
                : 'translate-y-2 text-black bg-transparent'
            } p-1 pointer-events-none uppercase tracking-wide rounded-3xl`}
          >
            Email
          </span>
          {formTouched && errors.email && (
            <p className="text-red-500 text-xs sm:text-sm md:text-xs mb-1 absolute bottom-[-1.5rem] left-2">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
              setFormTouched(true);
            }}
            className={`w-full p-2 outline-none text-black text-base bg-transparent border-l-2 border-b-2 border-black rounded-bl-lg transition-all duration-300 ${
              focusedField === 'password' || password
                ? 'border-t-2 border-r-2 border-black'
                : ''
            }`}
            onFocus={() => setFocusedField('password')}
            onBlur={() => handleBlur('password')}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <button
            type="button"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
            onClick={handlePasswordToggle}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <span
            className={`absolute left-2 top-2 transform transition-all duration-300 ${
              focusedField === 'password' || password
                ? 'translate-x-0 -translate-y-[1.5rem] text-xs sm:text-sm md:text-base bg-black text-white'
                : 'translate-y-2 text-black bg-transparent'
            } p-1 pointer-events-none uppercase tracking-wide rounded-lg`}
          >
            Password
          </span>
          {formTouched && errors.password && (
            <p className="text-red-500 text-xs sm:text-sm md:text-xs mt-1 absolute bottom-[-1.5rem] left-2">
              {errors.password}
            </p>
          )}
        </div>

        {/* Login Type Dropdown */}
        <div className="relative w-full">
          {userTypes.length === 0 ? ( // Check if userTypes is empty
            <select
              className="w-full p-2 border-2 border-black rounded-lg outline-none bg-transparent text-black"
              disabled
            >
              <option>Loading user types...</option>
            </select>
          ) : (
            <select
              value={loginType || ''}
              onChange={(e) => setLoginType(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-lg outline-none bg-transparent text-black"
            >
              <option value="" disabled>
                Select Login Type
              </option>
              {userTypes.map((userType) => (
                <option key={userType.id} value={userType.usertype_name}>
                  {userType.usertype_name}
                </option>
              ))}
            </select>
          )}
          <span className="absolute left-2 top-2 translate-y-[-1.5rem] text-black bg-white p-1">
            Login As
          </span>
        </div>

        {apiError && (
          <p className="text-red-500 text-xs sm:text-sm md:text-xs mb-1">
            {apiError}
          </p>
        )}

        <button
          type="submit"
          className="h-[45px] w-[100px] rounded-3xl border-2 border-black cursor-pointer bg-transparent transition-all duration-500 uppercase text-xs tracking-wider mb-8 hover:bg-black hover:text-white"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
