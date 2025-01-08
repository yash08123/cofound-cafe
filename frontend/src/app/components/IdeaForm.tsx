'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createIdea } from '../lib/api';

export default function IdeaForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: [''],
    compensation: 'equity',
    amount: '',
    industry: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createIdea(formData);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create idea');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const removeSkill = (index: number) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills Required</label>
        {formData.skills.map((skill, index) => (
          <div key={index} className="mt-2 flex items-center gap-2">
            <input
              type="text"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="e.g., React, Node.js, UI/UX"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSkill}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          Add Another Skill
        </button>
      </div>

      <div>
        <label htmlFor="compensation" className="block text-sm font-medium text-gray-700">
          Compensation Type
        </label>
        <select
          id="compensation"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.compensation}
          onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
        >
          <option value="equity">Equity</option>
          <option value="fixed">Fixed Amount</option>
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Compensation Amount
        </label>
        <input
          type="text"
          id="amount"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder={formData.compensation === 'equity' ? 'e.g., 10% equity' : 'e.g., $5000'}
        />
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
          Industry
        </label>
        <input
          type="text"
          id="industry"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          placeholder="e.g., Technology, Healthcare, Education"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${loading 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
        >
          {loading ? 'Creating...' : 'Create Idea'}
        </button>
      </div>
    </form>
  );
}
