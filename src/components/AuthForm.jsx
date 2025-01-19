import React, { useState, useEffect } from "react";
import { Lock, Mail, User, UserPlus, KeyRound, Phone, Building } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    dept: "",
  });
  const [user, setUser] = useState(null); 

  // Check for user in local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const navigate = useNavigate(); 

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? `http://localhost:5000/api/auth/login`
      : `http://localhost:5000/api/auth/register`;

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.id!=undefined) {
        // alert(isLogin ? "Login Successful!" : "Registration Successful!");
        // Store token and user id in local storage
        localStorage.setItem("token", data.token);  
        localStorage.setItem("userId", data.id); 
        console.log("data Saved"); 
    
        // Set the user in state
        setUser(data.user);
      } else {
        alert(data.message || (isLogin ? "Login Failed!" : "Registration Failed!"));
      }
    })    
      .catch((error) => {
        console.error(error);
        alert(isLogin ? "Login Failed!" : "Registration Failed!");
      });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    console.log("User logged out");
    navigate('/login');
  };

  // Update form state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.name}!</h2>
          <p className="text-gray-600 mb-6">You are already logged in.</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header Icon */}
        <div className="flex justify-center mb-8">
          {isLogin ? (
            <Lock className="h-12 w-12 text-indigo-600" />
          ) : (
            <UserPlus className="h-12 w-12 text-indigo-600" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Additional Fields for Registration */}
            {!isLogin && (
              <>
                <InputField
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  icon={User}
                />
                <InputField
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={Mail}
                />
                <InputField
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  icon={Phone}
                />
                <InputField
                  name="dept"
                  placeholder="Department"
                  value={formData.dept}
                  onChange={handleInputChange}
                  icon={Building}
                />
              </>
            )}

            {/* User ID and Password */}
            <InputField
              name="id"
              placeholder="User ID"
              value={formData.id}
              onChange={handleInputChange}
              icon={User}
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              icon={KeyRound}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
          <button onClick={()=> handleLogout()}>log out</button>
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ name, type = "text", placeholder, value, onChange, icon: Icon }) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
      />
    </div>
  );
};

export default AuthForm;
