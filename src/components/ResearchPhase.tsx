
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Overview from './research/Overview';
import KeyInsights from './research/KeyInsights';
import Statistics from './research/Statistics';
import Sources from './research/Sources';
import GitHubData from './research/GitHubData';
import ResearchSkeleton from './research/ResearchSkeleton';

export interface ResearchData {
  overview: string;
  sources: { title: string; url: string }[];
  keyInsights: string[];
  statistics: string[];
  trends: string[];
  githubData?: {
    repo: string;
    issues: { title: string; url: string }[];
    pullRequests: { title: string; url: string }[];
    stars: number;
    lastUpdate: string;
  };
}

interface ResearchPhaseProps {
  isLoading: boolean;
  researchData: ResearchData | null;
}

const ResearchPhase: React.FC<ResearchPhaseProps> = ({ isLoading, researchData }) => {
  if (isLoading) {
    return <ResearchSkeleton githubMode={!!researchData?.githubData} />;
  }

  if (!researchData) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Fase di Ricerca</h2>
      
      <Overview overview={researchData.overview} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KeyInsights insights={researchData.keyInsights} />
        <Statistics statistics={researchData.statistics} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Sources sources={researchData.sources} />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-brand-600" />
              Trend di Mercato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {researchData.trends.map((trend, index) => (
                <li key={index} className="text-gray-700">{trend}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {researchData.githubData && (
        <GitHubData githubData={researchData.githubData} />
      )}
    </div>
  );
};

export default ResearchPhase;
