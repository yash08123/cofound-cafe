'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchIdea } from '../../lib/api';
import ApplicationCard from '../../components/ApplicationCard';

interface Application {
  _id: string;
  developerName: string;
  pitch: string;
  status: string;
  developerId: string;
}

interface Idea {
  title: string;
  description: string;
  skills: string[];
  compensation: string;
  applications: Application[];
}

export default function IdeaDetails() {
  const [idea, setIdea] = useState<Idea | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const searchParams = useSearchParams();
  const ideaId = searchParams.get('id');

  useEffect(() => {
    if (!ideaId) return;
    const getIdea = async () => {
      const data = await fetchIdea(ideaId as string);
      setIdea(data);
      setApplications(data.applications); // Assuming applications are part of the idea object
    };
    getIdea();
  }, [ideaId]);

  if (!idea) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{idea.title}</h1>
      <p>{idea.description}</p>
      <p>Skills: {idea.skills.join(', ')}</p>
      <p>Compensation: {idea.compensation}</p>

      <h2 className="mt-4 text-xl font-semibold">Applications</h2>
      <div className="space-y-4">
        {applications.length > 0 ? (
          applications.map((application) => (
            <ApplicationCard
              key={application._id}
              developerName={application.developerName}
              pitch={application.pitch}
              status={application.status}
            />
          ))
        ) : (
          <p>No applications yet</p>
        )}
      </div>
    </div>
  );
}
