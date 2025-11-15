import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { InstructorProfile } from '../types';
import InstructorCard from '../components/InstructorCard';
import { Input, Select, Button } from '../components/UIComponents';
import { Search, Filter, X } from 'lucide-react';

const InstructorSearch = () => {
  const [instructors, setInstructors] = useState<InstructorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      setLoading(true);
      try {
        const data = await api.instructor.list({ search: searchTerm });
        setInstructors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce search
    const timer = setTimeout(() => {
      fetchInstructors();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Mobile Collapsible */}
        <div className={`lg:w-1/4 shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <div className="flex justify-between items-center lg:hidden mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}><X /></button>
            </div>
            
            <div>
              <label className="font-bold text-gray-900 block mb-3">Subject</label>
              <Select options={[
                { value: '', label: 'All Subjects' },
                { value: 'english', label: 'English' },
                { value: 'math', label: 'Mathematics' },
                { value: 'spanish', label: 'Spanish' },
              ]} />
            </div>

            <div>
              <label className="font-bold text-gray-900 block mb-3">Price per hour</label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Min" className="w-1/2" />
                <span className="text-gray-400">-</span>
                <Input type="number" placeholder="Max" className="w-1/2" />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-900 block mb-3">Availability</label>
              <div className="space-y-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                  <label key={d} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                    {d}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find the perfect tutor</h1>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, subject, or keyword..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="lg:hidden px-3"
                onClick={() => setFiltersOpen(true)}
              >
                <Filter size={20} />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl h-64 animate-pulse bg-gray-100"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {instructors.length > 0 ? (
                instructors.map(instructor => (
                  <InstructorCard key={instructor.id} instructor={instructor} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                    <Search size={48} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No tutors found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorSearch;