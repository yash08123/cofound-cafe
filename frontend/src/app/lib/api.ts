interface IdeaData {
  title: string;
  description: string;
  skills: string[];
  compensation: string;
}

export const fetchIdeas = async () => {
    const response = await fetch('/api/ideas');
    if (!response.ok) throw new Error('Failed to fetch ideas');
    return await response.json();
  };
  
  export const fetchIdea = async (id: string) => {
    const response = await fetch(`/api/ideas/${id}`);
    if (!response.ok) throw new Error('Failed to fetch idea');
    return await response.json();
  };
  
  export const createIdea = async (ideaData: IdeaData) => {
    const response = await fetch('/api/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ideaData),
    });
    if (!response.ok) throw new Error('Failed to create idea');
    return await response.json();
  };
  
  // Endpoint to fetch user profile
  export const fetchProfile = async () => {
    const response = await fetch('/api/profile');
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
  };
  