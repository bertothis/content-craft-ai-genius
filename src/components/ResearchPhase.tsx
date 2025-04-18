
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileSearch, Info, Link, TrendingUp } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface ResearchPhaseProps {
  isLoading: boolean;
  researchData: ResearchData | null;
}

export interface ResearchData {
  overview: string;
  sources: { title: string; url: string }[];
  keyInsights: string[];
  statistics: string[];
  trends: string[];
}

const ResearchPhase: React.FC<ResearchPhaseProps> = ({ isLoading, researchData }) => {
  if (isLoading) {
    return <ResearchSkeleton />;
  }

  if (!researchData) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Fase di Ricerca</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5 text-brand-600" />
            Panoramica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-line">{researchData.overview}</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileSearch className="mr-2 h-5 w-5 text-purple-600" />
              Punti Chiave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {researchData.keyInsights.map((insight, index) => (
                <li key={index} className="text-gray-700">{insight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-brand-600" />
              Statistiche e Dati
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {researchData.statistics.map((stat, index) => (
                <li key={index} className="text-gray-700">{stat}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Link className="mr-2 h-5 w-5 text-purple-600" />
              Fonti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {researchData.sources.map((source, index) => (
                <li key={index} className="text-blue-600 hover:underline truncate">
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
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
    </div>
  );
};

const ResearchSkeleton = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Fase di Ricerca</h2>
    
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="mr-2 h-5 w-5 text-brand-600" />
          Panoramica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileSearch className="mr-2 h-5 w-5 text-purple-600" />
            Punti Chiave
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5 text-brand-600" />
            Statistiche e Dati
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ResearchPhase;
