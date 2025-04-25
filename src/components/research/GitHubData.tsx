
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github } from 'lucide-react';

interface GitHubDataProps {
  githubData: {
    repo: string;
    issues: Array<{ title: string; url: string }>;
    pullRequests: Array<{ title: string; url: string }>;
    stars: number;
    lastUpdate: string;
  };
}

const GitHubData: React.FC<GitHubDataProps> = ({ githubData }) => {
  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Github className="mr-2 h-5 w-5 text-purple-700" />
          Ricerca GitHub: {githubData.repo}
        </CardTitle>
        <CardDescription>
          Informazioni estratte dalla repository GitHub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-2 text-purple-800">Issues correlate</h3>
            {githubData.issues.length > 0 ? (
              <ul className="space-y-1">
                {githubData.issues.map((issue, index) => (
                  <li key={index} className="text-blue-600 hover:underline truncate">
                    <a href={issue.url} target="_blank" rel="noopener noreferrer">
                      {issue.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Nessuna issue rilevante trovata</p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2 text-purple-800">Pull Requests correlate</h3>
            {githubData.pullRequests.length > 0 ? (
              <ul className="space-y-1">
                {githubData.pullRequests.map((pr, index) => (
                  <li key={index} className="text-blue-600 hover:underline truncate">
                    <a href={pr.url} target="_blank" rel="noopener noreferrer">
                      {pr.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Nessuna pull request rilevante trovata</p>
            )}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-purple-100 flex justify-between text-sm text-gray-600">
          <div>⭐ {githubData.stars.toLocaleString()} stelle</div>
          <div>Ultimo aggiornamento: {githubData.lastUpdate}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubData;
