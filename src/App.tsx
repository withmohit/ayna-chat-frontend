import React, { useState } from 'react';
import axios from 'axios';
import ChatApp from './utils/ChatApp.jsx';
import './index.css'; // Ensure Tailwind CSS is included here

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (identifier, password) => {
    setIsLoading(true);
    try {
      const data = {
        identifier: identifier,
        password: password
      };
      const response = await axios.post('https://ayna-chat-backend-17qp.onrender.com/api/auth/local', data);
      if (response.status === 200 && response.data.jwt) {
        localStorage.setItem('jwtToken', response.data.jwt);
        setIsAuthenticated(true);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert('Error during login: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (username, email, password) => {
    setIsLoading(true);
    try {
      const data = {
        username: username,
        email: email,
        password: password
      };
      const response = await axios.post('https://ayna-chat-backend-17qp.onrender.com/api/auth/local/register', data);
      if (response.status === 200) {
        alert('Signup successful! Please login.');
        localStorage.setItem('jwtToken', response.data.jwt);
        setIsAuthenticated(true);
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      alert('Error during signup: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100">
      {isAuthenticated ? (
        <div className="w-full max-w-md border border-gray-700 rounded-lg bg-gray-800 p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mb-4"
          >
            Logout
          </button>
          <ChatApp />
        </div>
      ) : (
        <div className="w-full max-w-md border border-gray-700 rounded-lg bg-gray-800 p-4">
          <h1 className="text-3xl font-bold my-4">Chat Application</h1>

          {isLoading ? (
            <div className="text-center text-lg font-medium">Loading...</div>
          ) : (
            <>
              <LoginForm onLogin={handleLogin} />
              <SignupForm onSignup={handleSignup} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
      >
        Login
      </button>
    </form>
  );
};

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
      >
        Sign up
      </button>
    </form>
  );
};

export default App;
