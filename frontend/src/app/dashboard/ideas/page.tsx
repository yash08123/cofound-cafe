'use client';
import { useEffect, useState } from 'react';
import IdeaCard from '../../components/IdeaCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchIdeas } from '../../lib/api';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { checkAuth } from '../../lib/auth';

interface Idea {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  compensation: string;
  industry: string;
  founderId: {
    name: string;
    _id: string;
  };
}

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const user = checkAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setLoading(true);
        const data = await fetchIdeas();
        console.log('Fetched ideas:', data);
        setIdeas(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch ideas:', error);
        setError('Failed to load ideas. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      loadIdeas();
    }
  }, [mounted]);

  if (!mounted || loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-indigo-600 hover:text-indigo-500"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'developer' ? 'Available Ideas' : 'My Ideas'}
          </h1>
          <p className="mt-2 text-gray-600">
            {user?.role === 'developer' 
              ? 'Browse through startup ideas and apply'
              : 'Manage your posted ideas'}
          </p>
        </div>
        {user?.role === 'founder' && (
          <Link
            href="/dashboard/ideas/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Post New Idea
          </Link>
        )}
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">
            {user?.role === 'developer'
              ? 'No ideas available at the moment.'
              : 'You haven\'t posted any ideas yet.'}
          </p>
          {user?.role === 'founder' && (
            <Link
              href="/dashboard/ideas/new"
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              <Plus className="h-5 w-5 mr-1" />
              Post your first idea
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} {...idea} />
          ))}
        </div>
      )}
    </div>
  );
}
