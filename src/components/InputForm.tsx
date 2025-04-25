
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Search } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface InputFormProps {
  onSubmit: (input: string, githubRepo?: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [useGithub, setUseGithub] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim().length < 10) {
      toast({
        title: "Input troppo breve",
        description: "Inserisci una descrizione più dettagliata per ottenere risultati migliori.",
        variant: "destructive"
      });
      return;
    }
    
    if (useGithub && !isValidGithubRepo(githubRepo)) {
      toast({
        title: "Repository GitHub non valida",
        description: "Inserisci un repository nel formato 'utente/repository'",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(input, useGithub ? githubRepo : undefined);
  };

  const isValidGithubRepo = (repo: string): boolean => {
    // Simple validation for the format "username/repository"
    return /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repo);
  };

  return (
    <Card className="w-full glass-card overflow-hidden">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Cosa vuoi scrivere oggi?
        </CardTitle>
        <CardDescription className="text-base text-purple-900/70">
          Descrivi l'argomento del tuo articolo in modo dettagliato
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            placeholder="Es. Voglio un articolo su come usare ChatGPT per fare marketing, focalizzandosi sui casi d'uso più innovativi..."
            className="min-h-32 resize-y bg-white/50 backdrop-blur-sm border-purple-100 rounded-xl focus:border-purple-200 focus:ring-purple-200/50 text-purple-900 placeholder:text-purple-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useGithub"
                checked={useGithub}
                onChange={() => setUseGithub(!useGithub)}
                className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                disabled={isLoading}
              />
              <label htmlFor="useGithub" className="text-sm font-medium text-purple-900">
                Utilizza una repository GitHub per la ricerca approfondita
              </label>
            </div>
            
            {useGithub && (
              <div className="pl-6 space-y-2 animate-fade-in">
                <label htmlFor="githubRepo" className="text-sm font-medium text-purple-900">
                  Repository GitHub (formato: utente/repository)
                </label>
                <Input
                  id="githubRepo"
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  placeholder="es. facebook/react"
                  className="bg-white/50 backdrop-blur-sm border-purple-100 focus:border-purple-200 focus:ring-purple-200/50 text-purple-900 placeholder:text-purple-400"
                  disabled={isLoading}
                />
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="button-gradient w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Elaborazione in corso...
              </span>
            ) : (
              <span className="flex items-center">
                <Search className="mr-2 h-5 w-5" /> Avvia Ricerca
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InputForm;
