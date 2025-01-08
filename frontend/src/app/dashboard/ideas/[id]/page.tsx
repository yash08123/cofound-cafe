'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchIdea, applyToIdea } from '../../../lib/api';
import { checkAuth } from '../../../lib/auth';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface Idea {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  compensation: string;
  industry: string;
  founderId: {
    name: string;
    email: string;
  };
}

export default function IdeaDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const user = checkAuth();

  useEffect(() => {
    const loadIdea = async () => {
      try {
        const data = await fetchIdea(params.id as string);
        setIdea(data);
      } catch (error) {
        console.error('Failed to load idea:', error);
        setError('Failed to load idea details');
      } finally {
        setLoading(false);
      }
    };

    loadIdea();
  }, [params.id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitch.trim()) {
      setError('Please write your pitch');
      return;
    }

    try {
      setApplying(true);
      await applyToIdea(idea!._id, pitch);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to apply:', error);
      setError('Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!idea) return <div>Idea not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">{idea.title}</h1>
          <p className="mt-4 text-gray-600">{idea.description}</p>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Compensation</h3>
                <p className="mt-1 text-sm text-gray-900">{idea.compensation}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                <p className="mt-1 text-sm text-gray-900">{idea.industry}</p>
              </div>
            </div>
          </div>

          {idea.skills.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">Required Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {idea.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {user?.role === 'developer' && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900">Apply for this idea</h2>
              <form onSubmit={handleApply} className="mt-4">
                {error && (
                  <div className="mb-4 text-sm text-red-600">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="pitch" className="block text-sm font-medium text-gray-700">
                    Your Pitch
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="pitch"
                      rows={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Explain why you're the perfect fit for this idea..."
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={applying}
                    className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm
                      ${applying
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      }`}
                  >
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
