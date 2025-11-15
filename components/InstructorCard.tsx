import React from 'react';
import { Link } from 'react-router-dom';
import { InstructorProfile } from '../types';
import { Star, Globe, BookOpen } from 'lucide-react';
import { Button, Badge, Card } from './UIComponents';

interface Props {
  instructor: InstructorProfile;
}

const InstructorCard: React.FC<Props> = ({ instructor }) => {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden group">
      {/* Left / Top - Image */}
      <div className="w-full md:w-64 bg-gray-100 shrink-0 relative">
        <img 
          src={instructor.photo_url || `https://ui-avatars.com/api/?name=${instructor.user.first_name}+${instructor.user.last_name}&background=random`} 
          alt={instructor.user.first_name}
          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {instructor.is_onboarding_complete && (
          <div className="absolute top-3 right-3">
            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
               Available
            </div>
          </div>
        )}
      </div>

      {/* Right / Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {instructor.user.first_name} {instructor.user.last_name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <Globe size={14} /> {instructor.country_of_birth || 'Global'}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-yellow-500 font-bold">
              <Star size={16} fill="currentColor" />
              <span>{instructor.rating}</span>
            </div>
            <div className="text-xs text-gray-400 font-medium">
              {instructor.review_count} reviews
            </div>
          </div>
        </div>

        <h4 className="text-gray-800 font-medium mb-2 line-clamp-1">
          {instructor.headline}
        </h4>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {instructor.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {instructor.subjects.slice(0, 3).map((s, i) => (
            <Badge key={i} variant="primary">{s.subject.name}</Badge>
          ))}
          {instructor.languages.slice(0, 2).map((l, i) => (
            <Badge key={`l-${i}`} variant="secondary">{l.language}</Badge>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-gray-900">${instructor.hourly_rate}</span>
            <span className="text-sm text-gray-500">/hour</span>
          </div>
          <Link to={`/instructors/${instructor.id}`}>
            <Button>View Profile</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default InstructorCard;