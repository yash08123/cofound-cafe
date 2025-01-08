'use client';
import Link from 'next/link';
import { checkAuth } from '../lib/auth';

interface IdeaCardProps {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  compensation: string;
  amount?: string;
  industry: string;
  founderId: {
    name: string;
  };
}

export default function IdeaCard(props: IdeaCardProps) {
  const user = checkAuth();
  const { _id, title, description, skills, founderId } = props;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600 line-clamp-3">{description}</p>
        
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <span>Posted by {founderId.name}</span>
          </div>
          {skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="text-xs text-gray-500">+{skills.length - 3} more</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {props.compensation}
          </span>
          {props.amount && (
            <span className="text-sm text-gray-600">
              {props.amount}
            </span>
          )}
        </div>

        {user?.role === 'developer' && (
          <div className="mt-4">
            <Link
              href={`/dashboard/ideas/${_id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Details & Apply
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
  