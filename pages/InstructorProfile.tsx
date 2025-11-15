import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { InstructorProfile as IProfile } from '../types';
import { Button, Badge, Card } from '../components/UIComponents';
import { Star, PlayCircle, MessageSquare, MapPin, Calendar, Check } from 'lucide-react';

const InstructorProfile = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      try {
        const data = await api.instructor.get(parseInt(id));
        if(data) setInstructor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-primary-600 rounded-full border-t-transparent"></div></div>;
  if (!instructor) return <div className="text-center py-20">Instructor not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Background */}
      <div className="h-48 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Profile Header Card */}
            <Card className="p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative">
                  <img 
                    src={instructor.photo_url} 
                    className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-lg"
                    alt="Profile"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-md">
                    <img src={`https://flagcdn.com/w40/${instructor.country_of_birth?.slice(0,2).toLowerCase() || 'us'}.png`} className="w-6 h-4 object-cover" alt="Flag" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-1">{instructor.user.first_name} {instructor.user.last_name}</h1>
                      <p className="text-primary-600 font-medium mb-2">{instructor.headline}</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                        <Star className="text-yellow-500 fill-yellow-500" size={18} />
                        <span className="font-bold text-yellow-700">{instructor.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{instructor.review_count} reviews</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {instructor.subjects.map(s => (
                      <Badge key={s.subject.id} variant="primary">{s.subject.name}</Badge>
                    ))}
                    {instructor.languages.map(l => (
                      <Badge key={l.language} variant="neutral">{l.language} ({l.proficiency})</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* About */}
            <Card className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{instructor.bio}</p>
            </Card>

            {/* Video Placeholder (Phase 4) */}
            <Card className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Introduction Video</h2>
              <div className="aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                <PlayCircle size={64} className="relative z-10 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                <p className="relative z-10 mt-4 font-medium">Video introduction coming soon</p>
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <Card className="p-6 border-t-4 border-t-primary-500 shadow-xl">
                <div className="text-center mb-6">
                  <p className="text-gray-500 mb-1">Trial Lesson Price</p>
                  <div className="text-4xl font-bold text-gray-900">${instructor.trial_price}</div>
                </div>

                <div className="space-y-3 mb-8">
                  <Button className="w-full py-4 text-lg shadow-primary-500/25 shadow-lg">Book Trial Lesson</Button>
                  <Button variant="outline" className="w-full gap-2">
                    <MessageSquare size={18} /> Send Message
                  </Button>
                </div>

                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600"><Check size={16} /></div>
                    <span>Free cancellation up to 24h</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Check size={16} /></div>
                    <span>100% Satisfaction Guarantee</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;