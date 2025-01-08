import { checkAuth } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
console.log('API Base URL:', API_BASE_URL);

// Helper function to get headers
const getHeaders = () => {
  const user = checkAuth();
  console.log('User from checkAuth:', user);
  
  const headers = {
    'Content-Type': 'application/json',
    'user-id': user?.id || '',
  };
  
  console.log('Generated headers:', headers);
  return headers;
};

export async function fetchIdeas() {
  const response = await fetch(`${API_BASE_URL}/ideas`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch ideas');
  const data = await response.json();
  return data.data;
}

export async function fetchIdea(id: string) {
  const response = await fetch(`${API_BASE_URL}/ideas/${id}`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch idea');
  const data = await response.json();
  return data.data;
}

export async function createIdea(ideaData: {
  title: string;
  description: string;
  skills: string[];
  compensation: string;
  industry: string;
}) {
  const headers = getHeaders();
  if (!headers['user-id']) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/ideas`, {
    method: 'POST',
    headers,
    body: JSON.stringify(ideaData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create idea');
  }
  
  const data = await response.json();
  return data.data;
}

export async function applyToIdea(ideaId: string, pitch: string) {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ ideaId, pitch }),
  });
  if (!response.ok) throw new Error('Failed to apply to idea');
  return response.json();
}

// Endpoint to fetch user profile
export const fetchProfile = async () => {
  const response = await fetch('/api/profile');
  if (!response.ok) throw new Error('Failed to fetch profile');
  return await response.json();
};

interface SignUpData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'founder' | 'developer';
}

interface SignInData {
  email: string;
  password: string;
}

export async function signUp(data: SignUpData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to sign up');
  }

  const result = await response.json();
  return result.data;
}

export async function signIn(data: SignInData) {
  try {
    console.log('Signing in with:', data);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response:', e);
      throw new Error('Invalid server response');
    }

    if (!response.ok || result.status === 'error') {
      throw new Error(result.message || 'Failed to sign in');
    }

    return result.data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function fetchUserIdeas() {
  try {
    const headers = getHeaders();
    if (!headers['user-id']) {
      throw new Error('Authentication required');
    }

    console.log('Fetching ideas with headers:', headers);

    const response = await fetch(`${API_BASE_URL}/ideas/user/my-ideas`, {
      method: 'GET',
      headers: {
        ...headers,
        'Accept': 'application/json'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('Failed to fetch user ideas');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Fetch ideas error:', error);
    throw error;
  }
}

export async function fetchUserApplications() {
  const response = await fetch(`${API_BASE_URL}/applications/my-applications`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch user applications');
  const data = await response.json();
  return data.data;
}

export async function updateApplicationStatus(applicationId: string, status: 'accepted' | 'rejected') {
  const response = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update application status');
  const data = await response.json();
  return data.data;
}
  