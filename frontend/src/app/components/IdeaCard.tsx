import Link from "next/link";

type IdeaCardProps = {
    title: string;
    description: string;
    skills: string[];
    compensation: string;
    _id: string;
  };
  
  export default function IdeaCard({ title, description, skills, compensation, _id }: IdeaCardProps) {
    return (
      <div className="border p-4 rounded-md">
        <h2 className="font-bold">{title}</h2>
        <p>{description}</p>
        <p>Skills: {skills.join(', ')}</p>
        <p>Compensation: {compensation}</p>
        <Link href={`/dashboard/ideas/${_id}`} className="text-blue-500">View Details</Link>
      </div>
    );
  }
  