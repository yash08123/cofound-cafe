'use client';
import Link from 'next/link';
import { checkAuth } from '../lib/auth';
import { Edit } from 'lucide-react';

interface IdeaCardProps {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  compensation: string;
  amount?: string;
  industry: string;
  founderId: {
    _id: string;
    name: string;
  };
}

export default function IdeaCard(props: IdeaCardProps) {
  const user = checkAuth();
  const isOwner = user?.id && props.founderId?._id && user.id === props.founderId._id;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5">
        <h3 className="text-xl font-semibold text-gray-900">{props.title}</h3>
        <p className="mt-2 text-gray-600 line-clamp-3">{props.description}</p>
        
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <span>Posted by {props.founderId?.name || 'Unknown'}</span>
          </div>
          {props.skills?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {props.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {skill}
                </span>
              ))}
              {props.skills.length > 3 && (
                <span className="text-xs text-gray-500">+{props.skills.length - 3} more</span>
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

        <div className="mt-4 flex justify-between items-center">
          {user?.role === 'developer' ? (
            <Link
              href={`/dashboard/ideas/${props._id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Details & Apply
            </Link>
          ) : isOwner && (
            <Link
              href={`/dashboard/ideas/${props._id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Idea
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
  