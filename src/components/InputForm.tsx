
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Search } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface InputFormProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

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
    
    onSubmit(input);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cosa vuoi scrivere oggi?</CardTitle>
        <CardDescription>
          Descrivi l'argomento del tuo articolo in modo dettagliato
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Es. Voglio un articolo su come usare ChatGPT per fare marketing, focalizzandosi sui casi d'uso più innovativi..."
            className="min-h-32 resize-y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="w-full ai-gradient-bg hover:opacity-90"
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
