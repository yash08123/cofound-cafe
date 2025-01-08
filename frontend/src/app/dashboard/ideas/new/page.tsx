'use client';
import IdeaForm from '../../../components/IdeaForm';

export default function NewIdeaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post New Idea</h1>
        <p className="mt-2 text-gray-600">Share your startup idea and find the perfect developer.</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <IdeaForm />
      </div>
    </div>
    
  );
} 