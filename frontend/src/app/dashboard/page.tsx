'use client';
import { useEffect, useState } from 'react';
import { 
  fetchUserIdeas, 
  fetchUserApplications, 
  updateApplicationStatus
} from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Link from 'next/link';
import { Plus, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Application {
  _id: string;
  ideaId: {
    _id: string;
    title: string;
    description: string;
    compensation: string;
    founderId: {
      name: string;
      phone: string;
    };
  };
  developerId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  pitch: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Idea {
  _id: string;
  title: string;
  description: string;
  compensation: string;
  founderId: {
    name: string;
    phone: string;
  };
  applications: Application[];
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [userRole, setUserRole] = useState<'founder' | 'developer' | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          router.push('/auth/sign-in');
          return;
        }

        const user = JSON.parse(userData);
        if (!user.id) {
          localStorage.removeItem('user');
          router.push('/auth/sign-in');
          return;
        }

        setUserRole(user.role);

        if (user.role === 'founder') {
          const founderIdeas = await fetchUserIdeas();
          setIdeas(founderIdeas);
        } else {
          const devApplications = await fetchUserApplications();
          setApplications(devApplications);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        localStorage.removeItem('user');
        router.push('/auth/sign-in');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [router]);

  const handleApplicationStatus = async (applicationId: string, status: 'accepted' | 'rejected') => {
    try {
      await updateApplicationStatus(applicationId, status);
      // Refresh ideas data
      const updatedIdeas = await fetchUserIdeas();
      setIdeas(updatedIdeas);
    } catch (error) {
      console.error('Failed to update application status:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!userRole) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Please sign in to view your dashboard</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {userRole === 'founder' ? (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Posted Ideas</h1>
            <Link
              href="/dashboard/ideas/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Post New Idea
            </Link>
          </div>

          {ideas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">You haven&apos;t posted any ideas yet.</p>
              <Link
                href="/dashboard/ideas/new"
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                <Plus className="h-5 w-5 mr-1" />
                Post your first idea
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {ideas.map((idea) => (
                <div key={idea._id} className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">{idea.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{idea.description}</p>
                  </div>

                  <div className="border-t border-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h4 className="text-sm font-medium text-gray-500">Applications</h4>
                      {idea.applications.length === 0 ? (
                        <p className="mt-2 text-sm text-gray-500">No applications yet</p>
                      ) : (
                        <div className="mt-2 space-y-4">
                          {idea.applications.map((application) => (
                            <div
                              key={application._id}
                              className="border rounded-lg p-4 bg-gray-50"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900">
                                    {application.developerId.name}
                                  </h5>
                                  <p className="mt-1 text-sm text-gray-600">{application.pitch}</p>
                                  {application.status === 'accepted' && (
                                    <p className="mt-2 text-sm text-gray-600">
                                      Contact: {application.developerId.phone}
                                    </p>
                                  )}
                                </div>
                                {application.status === 'pending' && (
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleApplicationStatus(application._id, 'accepted')}
                                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Accept
                                    </button>
                                    <button
                                      onClick={() => handleApplicationStatus(application._id, 'rejected')}
                                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Reject
                                    </button>
                                  </div>
                                )}
                                {application.status !== 'pending' && (
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                      ${
                                        application.status === 'accepted'
                                          ? 'bg-green-100 text-green-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}
                                  >
                                    {application.status}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Applications</h1>
          {applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">You haven&apos;t applied to any ideas yet.</p>
              <Link
                href="/dashboard/ideas"
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                Browse Available Ideas
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((application) => (
                <div key={application._id} className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {application.ideaId.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {application.ideaId.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Your Pitch</h4>
                      <p className="mt-1 text-sm text-gray-900">{application.pitch}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            application.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : application.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        {application.status}
                      </span>
                      {application.status === 'accepted' && (
                        <p className="text-sm text-gray-600">
                          Founder contact: {application.ideaId.founderId?.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
