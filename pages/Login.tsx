import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../components/UIComponents';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the redirect path from location state or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      // Add toast error here
    } finally {
      setLoading(false);
    }
  };

  // Helper for demo login
  const demoLogin = (role: 'student' | 'instructor') => {
    setEmail(role === 'instructor' ? 'demo_instructor@tutorly.com' : 'demo_student@tutorly.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>

        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              label="Email Address" 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input 
                label="Password" 
                type="password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className="absolute right-0 top-0">
                 <Link to="/forgot-password" className="text-xs font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <Button type="submit" className="w-full py-3" isLoading={loading}>
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Demo</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" onClick={() => demoLogin('student')}>
                Student Demo
              </Button>
              <Button variant="outline" size="sm" onClick={() => demoLogin('instructor')}>
                Instructor Demo
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;