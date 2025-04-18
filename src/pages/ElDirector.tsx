
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, Edit } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const ElDirector = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState<string>('');
  const articleContent = location.state?.articleContent;

  useEffect(() => {
    if (!articleContent) {
      navigate('/');
      return;
    }

    // Simuliamo l'analisi con un timer
    const timer = setTimeout(() => {
      const mockAnalysis = `
Analisi Tecnica del Contenuto:

1. Precisione Tecnica:
- Il contenuto mostra una buona comprensione generale dell'argomento
- Alcuni concetti potrebbero beneficiare di ulteriori approfondimenti tecnici
- Suggerisco di aggiungere riferimenti a studi accademici recenti

2. Chiarimenti Necessari:
- La sezione sulla keyword density potrebbe essere supportata da dati statistici
- I concetti di AI generativa meritano una spiegazione più approfondita
- Consiglierei di includere esempi pratici di implementazione

3. Suggerimenti di Miglioramento:
- Aggiungere riferimenti a framework specifici di machine learning
- Includere metriche quantitative per supportare le affermazioni
- Espandere la sezione sulle limitazioni tecniche

MODIFICHE PROPOSTE:

${articleContent.replace(
  "ChatGPT può generare contenuti di alta qualità",
  "ChatGPT, basato sull'architettura GPT-3.5/4, può generare contenuti di alta qualità attraverso tecniche avanzate di NLP"
).replace(
  "L'AI può analizzare grandi volumi di dati",
  "L'AI, attraverso algoritmi di deep learning e analisi predittiva, può processare e analizzare grandi volumi di dati"
)}
`;
      
      setAnalysis(mockAnalysis);
      setEditedArticle(articleContent);
      setIsAnalyzing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [articleContent, navigate]);

  const handleModifyText = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    navigate('/', { 
      state: { 
        modifiedArticle: editedArticle,
        source: 'el-director'
      } 
    });
    toast({
      title: "Modifiche applicate",
      description: "Le modifiche suggerite da El Director sono state applicate all'articolo."
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl space-y-6">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Torna all'articolo
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-brand-600" />
            <span>El Director - Analisi Tecnica</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAnalyzing ? (
            <div className="space-y-8">
              <div className="flex items-center justify-center py-12">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center animate-pulse">
                    <Brain className="h-12 w-12 text-brand-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 animate-ping" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="prose prose-slate max-w-none">
                <pre className="whitespace-pre-wrap font-sans">{analysis}</pre>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedArticle}
                    onChange={(e) => setEditedArticle(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                  <Button onClick={handleSaveChanges} className="ai-gradient-bg">
                    Applica Modifiche
                  </Button>
                </div>
              ) : (
                <Button onClick={handleModifyText} className="ai-gradient-bg">
                  <Edit className="mr-2 h-4 w-4" />
                  Modifica Testo
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ElDirector;
