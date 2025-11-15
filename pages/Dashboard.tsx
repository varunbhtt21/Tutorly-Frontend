import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Card } from '../components/UIComponents';
import { BookOpen, Calendar, TrendingUp, Settings, User, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const isInstructor = user.role === 'instructor';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.first_name}!</h1>
          <p className="text-gray-500">Here's what's happening with your account today.</p>
        </div>
        {isInstructor && (
          <Link to="/dashboard/instructor/onboarding">
             <Button className="gap-2"><PlusCircle size={18} /> Edit Profile</Button>
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border-l-4 border-l-primary-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Sessions</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">0</h3>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
              <Calendar size={24} />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-secondary-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{isInstructor ? 'Total Students' : 'Total Hours'}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">0</h3>
            </div>
            <div className="bg-secondary-50 p-3 rounded-lg text-secondary-600">
              <User size={24} />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{isInstructor ? 'Earnings' : 'Spent'}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">$0.00</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-green-600">
              <TrendingUp size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">No recent activity to show.</p>
              {isInstructor ? (
                <Link to="/dashboard/instructor/onboarding" className="mt-4 inline-block">
                  <Button variant="outline">Complete your profile</Button>
                </Link>
              ) : (
                <Link to="/instructors" className="mt-4 inline-block">
                  <Button>Find a tutor</Button>
                </Link>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/settings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-700">
                  <Settings size={18} /> Account Settings
                </Link>
              </li>
              <li>
                <Link to="/messages" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-700">
                  <BookOpen size={18} /> Messages
                </Link>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;