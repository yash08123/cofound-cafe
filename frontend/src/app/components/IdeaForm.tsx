import { useState } from 'react';

export default function IdeaForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    compensation: '',
    industry: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/ideas', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert('Idea submitted!');
    } else {
      alert('Failed to submit idea');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="input"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="input"
      />
      <input
        type="text"
        name="skills"
        placeholder="Skills (comma separated)"
        value={formData.skills}
        onChange={handleChange}
        className="input"
      />
      <input
        type="text"
        name="compensation"
        placeholder="Compensation"
        value={formData.compensation}
        onChange={handleChange}
        className="input"
      />
      <input
        type="text"
        name="industry"
        placeholder="Industry"
        value={formData.industry}
        onChange={handleChange}
        className="input"
      />
      <button type="submit" className="btn">Submit Idea</button>
    </form>
  );
}
