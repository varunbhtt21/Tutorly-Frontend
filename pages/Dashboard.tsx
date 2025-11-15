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
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.first_name}!</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your account today.</p>
        </div>
        {isInstructor && (
          <Link to="/dashboard/instructor/onboarding">
             <Button className="gap-2 shadow-lg shadow-primary-500/20"><PlusCircle size={18} /> Edit Profile</Button>
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="p-6 border-l-[6px] border-l-primary-500 hover:translate-y-[-2px] transition-transform">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Upcoming Sessions</p>
              <h3 className="text-4xl font-extrabold text-gray-900 mt-2">0</h3>
            </div>
            <div className="bg-primary-100 p-3 rounded-2xl text-primary-600 shadow-inner">
              <Calendar size={28} />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-[6px] border-l-sky-500 hover:translate-y-[-2px] transition-transform">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">{isInstructor ? 'Total Students' : 'Total Hours'}</p>
              <h3 className="text-4xl font-extrabold text-gray-900 mt-2">0</h3>
            </div>
            <div className="bg-sky-100 p-3 rounded-2xl text-sky-600 shadow-inner">
              <User size={28} />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-[6px] border-l-emerald-500 hover:translate-y-[-2px] transition-transform">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">{isInstructor ? 'Earnings' : 'Spent'}</p>
              <h3 className="text-4xl font-extrabold text-gray-900 mt-2">$0.00</h3>
            </div>
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 shadow-inner">
              <TrendingUp size={28} />
            </div>
          </div>
        </Card>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 min-h-[300px]">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="bg-white/50 rounded-2xl p-10 text-center border border-dashed border-gray-300">
              <p className="text-gray-500 mb-6">No recent activity to show.</p>
              {isInstructor ? (
                <Link to="/dashboard/instructor/onboarding" className="inline-block">
                  <Button variant="outline">Complete your profile</Button>
                </Link>
              ) : (
                <Link to="/instructors" className="inline-block">
                  <Button>Find a tutor</Button>
                </Link>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/settings" className="flex items-center gap-3 p-3.5 hover:bg-white/80 rounded-xl transition-colors text-gray-700 font-medium">
                  <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500"><Settings size={18} /></div>
                   Account Settings
                </Link>
              </li>
              <li>
                <Link to="/messages" className="flex items-center gap-3 p-3.5 hover:bg-white/80 rounded-xl transition-colors text-gray-700 font-medium">
                  <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500"><BookOpen size={18} /></div>
                   Messages
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