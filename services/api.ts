import { User, AuthResponse, InstructorProfile } from '../types';

// --- MOCK DATA ---
const MOCK_DELAY = 800;

const mockUser: User = {
  id: 1,
  email: 'demo@tutorly.com',
  role: 'student', // Default, changed in login for demo
  first_name: 'Alex',
  last_name: 'Morgan',
  status: 'active'
};

const mockInstructors: InstructorProfile[] = [
  {
    id: 101,
    user_id: 2,
    user: { id: 2, email: 'sarah@t.com', role: 'instructor', first_name: 'Sarah', last_name: 'Jenkins', status: 'active' },
    headline: 'Certified English Tutor with 5 years experience',
    bio: 'I specialize in conversational English and business communication. My lessons are tailored to your specific needs and goals.',
    country_of_birth: 'United Kingdom',
    languages: [{ language: 'English', proficiency: 'Native' }, { language: 'Spanish', proficiency: 'Advanced' }],
    hourly_rate: 25,
    trial_price: 5,
    rating: 4.9,
    review_count: 124,
    total_sessions: 1500,
    subjects: [{ subject: { id: 1, name: 'English', slug: 'english', category: 'Languages' } }],
    is_onboarding_complete: true,
    photo_url: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: 102,
    user_id: 3,
    user: { id: 3, email: 'david@t.com', role: 'instructor', first_name: 'David', last_name: 'Chen', status: 'active' },
    headline: 'Math genius helping you ace your exams',
    bio: 'From Algebra to Calculus, I make complex concepts simple. I have a Masters in Mathematics and love teaching.',
    country_of_birth: 'Canada',
    languages: [{ language: 'English', proficiency: 'Native' }, { language: 'Mandarin', proficiency: 'Native' }],
    hourly_rate: 35,
    trial_price: 10,
    rating: 5.0,
    review_count: 89,
    total_sessions: 600,
    subjects: [{ subject: { id: 2, name: 'Mathematics', slug: 'math', category: 'Sciences' } }],
    is_onboarding_complete: true,
    photo_url: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: 103,
    user_id: 4,
    user: { id: 4, email: 'maria@t.com', role: 'instructor', first_name: 'Maria', last_name: 'Gonzalez', status: 'active' },
    headline: 'Learn Spanish effectively and fun!',
    bio: 'Hola! I am a native Spanish speaker from Spain. I love sharing my culture and language with students from all over the world.',
    country_of_birth: 'Spain',
    languages: [{ language: 'Spanish', proficiency: 'Native' }, { language: 'English', proficiency: 'Fluent' }],
    hourly_rate: 20,
    trial_price: 3,
    rating: 4.7,
    review_count: 210,
    total_sessions: 3200,
    subjects: [{ subject: { id: 3, name: 'Spanish', slug: 'spanish', category: 'Languages' } }],
    is_onboarding_complete: true,
    photo_url: 'https://picsum.photos/200/200?random=3'
  }
];

const mockSubjects = [
  { id: 1, name: 'English', slug: 'english', category: 'Languages' },
  { id: 2, name: 'Mathematics', slug: 'math', category: 'Sciences' },
  { id: 3, name: 'Spanish', slug: 'spanish', category: 'Languages' },
  { id: 4, name: 'Physics', slug: 'physics', category: 'Sciences' },
  { id: 5, name: 'Piano', slug: 'piano', category: 'Arts' },
  { id: 6, name: 'Python', slug: 'python', category: 'Programming' },
];

// --- API METHODS ---

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<AuthResponse> => {
      await delay(MOCK_DELAY);
      // Demo logic: if email contains 'inst', make them an instructor
      const role = email.includes('inst') ? 'instructor' : 'student';
      return {
        access_token: 'mock_jwt_token_' + Date.now(),
        user: { ...mockUser, email, role }
      };
    },
    register: async (data: any): Promise<AuthResponse> => {
      await delay(MOCK_DELAY);
      return {
        access_token: 'mock_jwt_token_' + Date.now(),
        user: { ...mockUser, ...data, id: Math.floor(Math.random() * 1000) }
      };
    },
    me: async (): Promise<User> => {
      await delay(MOCK_DELAY / 2);
      // Retrieve user from local storage simulation if we had one, else return mock
      return mockUser;
    },
    logout: async () => {
      await delay(200);
    }
  },
  instructor: {
    list: async (filters?: any): Promise<InstructorProfile[]> => {
      await delay(MOCK_DELAY);
      let results = [...mockInstructors];
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        results = results.filter(i => 
          i.headline.toLowerCase().includes(q) || 
          i.subjects.some(s => s.subject.name.toLowerCase().includes(q))
        );
      }
      return results;
    },
    get: async (id: number): Promise<InstructorProfile | undefined> => {
      await delay(MOCK_DELAY);
      return mockInstructors.find(i => i.id === id);
    },
    onboarding: {
      saveStep: async (step: number, data: any) => {
        await delay(500);
        console.log(`Saved step ${step}`, data);
        return { success: true };
      }
    }
  },
  subjects: {
    list: async () => {
      await delay(500);
      return mockSubjects;
    }
  }
};