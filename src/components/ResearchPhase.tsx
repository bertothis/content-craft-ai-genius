
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileSearch, Info, Link, TrendingUp, Github } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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
  githubData?: {
    repo: string;
    issues: { title: string; url: string }[];
    pullRequests: { title: string; url: string }[];
    stars: number;
    lastUpdate: string;
  };
}

const ResearchPhase: React.FC<ResearchPhaseProps> = ({ isLoading, researchData }) => {
  const [newNote, setNewNote] = useState("");
  const [customInsights, setCustomInsights] = useState<string[]>([]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setCustomInsights([...customInsights, newNote.trim()]);
      setNewNote("");
      toast({
        title: "Nota aggiunta",
        description: "Il punto chiave è stato aggiunto con successo."
      });
    }
  };

  if (isLoading) {
    return <ResearchSkeleton githubMode={!!researchData?.githubData} />;
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
            <CardDescription>
              Aggiungi note personalizzate ai punti chiave identificati
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                {researchData.keyInsights.map((insight, index) => (
                  <li key={`ai-${index}`} className="text-gray-700">{insight}</li>
                ))}
                {customInsights.map((insight, index) => (
                  <li key={`custom-${index}`} className="text-gray-700 font-medium">{insight}</li>
                ))}
              </ul>
              
              <div className="flex space-x-2">
                <Input
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Aggiungi un punto chiave personalizzato..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddNote();
                    }
                  }}
                />
                <Button 
                  onClick={handleAddNote}
                  variant="outline"
                  size="icon"
                >+</Button>
              </div>
            </div>
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

      {researchData.githubData && (
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Github className="mr-2 h-5 w-5 text-purple-700" />
              Ricerca GitHub: {researchData.githubData.repo}
            </CardTitle>
            <CardDescription>
              Informazioni estratte dalla repository GitHub
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-2 text-purple-800">Issues correlate</h3>
                {researchData.githubData.issues.length > 0 ? (
                  <ul className="space-y-1">
                    {researchData.githubData.issues.map((issue, index) => (
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
                {researchData.githubData.pullRequests.length > 0 ? (
                  <ul className="space-y-1">
                    {researchData.githubData.pullRequests.map((pr, index) => (
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
              <div>⭐ {researchData.githubData.stars.toLocaleString()} stelle</div>
              <div>Ultimo aggiornamento: {researchData.githubData.lastUpdate}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const ResearchSkeleton = ({ githubMode = false }) => (
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

    {githubMode && (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Github className="mr-2 h-5 w-5 text-purple-700" />
            Ricerca GitHub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )}
  </div>
);

export default ResearchPhase;
