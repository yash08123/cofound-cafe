'use client';
import { useEffect, useState } from 'react';

interface Profile {
  name: string;
  bio: string;
  whatsapp: string;
  github: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/profile'); // Endpoint for fetching profile
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
        <p><strong>WhatsApp:</strong> {profile.whatsapp}</p>
        <p><strong>GitHub:</strong> <a href={profile.github} target="_blank" rel="noopener noreferrer">{profile.github}</a></p>
      </div>
    </div>
  );
}
