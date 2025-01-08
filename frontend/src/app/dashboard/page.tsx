'use client';
import { useEffect, useState } from 'react';
import IdeaCard from '../components/IdeaCard';
import { fetchIdeas } from '../lib/api';

interface Idea {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  compensation: string;
}

export default function Dashboard() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchIdeas();
      setIdeas(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {ideas.map((idea) => (
          <IdeaCard key={idea._id} {...idea} />
        ))}
      </div>
    </div>
  );
}
