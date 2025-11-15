import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UIComponents';
import { Search, Star, Shield, Zap, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-900 text-white pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-800/50 border border-primary-700/50 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-primary-100">Over 30,000 active tutors</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight animate-slide-up">
              Unlock your potential with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">expert tutors</span>
            </h1>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto opacity-90">
              Master a new language, ace your exams, or pick up a new hobby. 1-on-1 lessons tailored to your goals.
            </p>
            
            <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto animate-fade-in transform hover:scale-[1.01] transition-transform duration-300">
              <div className="flex-grow flex items-center px-4 bg-gray-50 rounded-xl h-14">
                <Search className="text-gray-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="What do you want to learn?" 
                  className="bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-500"
                />
              </div>
              <Link to="/instructors" className="w-full md:w-auto">
                <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/30">
                  Find a Tutor
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-primary-200/60 font-medium text-sm">
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-teal-400" /> Verified Tutors</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-teal-400" /> Pay per lesson</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-teal-400" /> Affordable prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="-mt-16 relative z-20 container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-gray-900 mb-2">32,000+</div>
            <div className="text-gray-500">Experienced Tutors</div>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-gray-900 mb-2">120+</div>
            <div className="text-gray-500">Subjects Taught</div>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-gray-900 mb-2">4.8/5</div>
            <div className="text-gray-500">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why choose Tutorly?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We make learning engaging, effective, and accessible for everyone.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Star className="w-8 h-8 text-yellow-500" />, title: "Expert Tutors", desc: "Find teachers verified for their experience and teaching ability." },
              { icon: <Shield className="w-8 h-8 text-green-500" />, title: "Verified Profiles", desc: "Every tutor passes a rigorous background and qualification check." },
              { icon: <Zap className="w-8 h-8 text-purple-500" />, title: "Fast Progress", desc: "Personalized learning plans help you reach your goals faster." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary-600 to-primary-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to start learning?</h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of students and start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/instructors">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Browse Tutors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;