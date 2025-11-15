import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../components/UIComponents';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ ...formData, role });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Log in
            </Link>
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 p-1 bg-gray-200 rounded-xl">
          <button
            onClick={() => setRole('student')}
            className={`py-2.5 text-sm font-bold rounded-lg transition-all ${
              role === 'student' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            I want to Learn
          </button>
          <button
            onClick={() => setRole('instructor')}
            className={`py-2.5 text-sm font-bold rounded-lg transition-all ${
              role === 'instructor' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            I want to Teach
          </button>
        </div>

        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="First Name" 
                required 
                value={formData.first_name}
                onChange={e => setFormData({...formData, first_name: e.target.value})}
              />
              <Input 
                label="Last Name" 
                required 
                value={formData.last_name}
                onChange={e => setFormData({...formData, last_name: e.target.value})}
              />
            </div>
            <Input 
              label="Email Address" 
              type="email" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <Input 
              label="Password" 
              type="password" 
              required 
              minLength={6}
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
            
            <Button type="submit" className="w-full py-3 text-lg" isLoading={loading}>
              Sign up as {role === 'student' ? 'Student' : 'Instructor'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;