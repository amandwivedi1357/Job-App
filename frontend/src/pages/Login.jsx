/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user/userAction';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();


    const response = await dispatch(login(formData));

    if (response.status === 200) {
      
      const { role } = response.data;

    
      toast({
        title: "Login Successful.",
        description: `Welcome back, ${response.data.name}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirect based on user role
      if (role === "admin") {
        navigate('/admin'); // Redirect to /admin for admin users
      } else {
        navigate('/'); // Redirect to / for normal users
      }
    } else {
      // Show error toast
      toast({
        title: "Login Failed.",
        description: response.message || "Invalid email or password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Login</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/signup" className="text-sm text-purple-600 hover:underline">
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
