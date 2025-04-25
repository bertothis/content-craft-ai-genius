
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'lucide-react';

interface SourcesProps {
  sources: Array<{ title: string; url: string }>;
}

const Sources: React.FC<SourcesProps> = ({ sources }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link className="mr-2 h-5 w-5 text-purple-600" />
          Fonti
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {sources.map((source, index) => (
            <li key={index} className="text-blue-600 hover:underline truncate">
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Sources;
