type ApplicationCardProps = {
    developerName: string;
    pitch: string;
    status: string;
};

export default function ApplicationCard({
    developerName,
    pitch,
    status,
}: ApplicationCardProps) {
    return (
      <div className="border p-4 rounded-md">
        <h3 className="font-bold">{developerName}</h3>
        <p>{pitch}</p>
        <p>Status: {status}</p>
        <div className="mt-2 flex justify-between">
          <button className="bg-green-500 text-white p-2 rounded">Accept</button>
          <button className="bg-red-500 text-white p-2 rounded">Reject</button>
        </div>
      </div>
    );
  }
  