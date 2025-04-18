import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, Edit } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const LOADING_MESSAGES = [
  "El director sta pensando",
  "El director ha trovato un typo che non gli è piaciuto",
  "El director è felice",
  "El director esta comendo tapas",
  "El director ha finito"
];

const ElDirector = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState<string>('');
  const articleContent = location.state?.articleContent;

  useEffect(() => {
    if (!articleContent) {
      navigate('/');
      return;
    }

    let currentMessageIndex = 0;
    const messageInterval = setInterval(() => {
      currentMessageIndex++;
      if (currentMessageIndex < LOADING_MESSAGES.length) {
        setLoadingMessage(LOADING_MESSAGES[currentMessageIndex]);
      }
    }, 2000);

    const analysisTimer = setTimeout(() => {
      const mockAnalysis = generateAnalysis(articleContent);
      setAnalysis(mockAnalysis);
      setEditedArticle(applyChanges(articleContent));
      setIsAnalyzing(false);
      clearInterval(messageInterval);
    }, 10000);

    return () => {
      clearTimeout(analysisTimer);
      clearInterval(messageInterval);
    };
  }, [articleContent, navigate]);

  const generateAnalysis = (content: string) => {
    return `
• Analisi Tecnica del Contenuto:

• Precisione Tecnica:
  - Il contenuto mostra una buona comprensione generale dell'argomento
  - Alcuni concetti potrebbero beneficiare di ulteriori approfondimenti tecnici
  - Si suggerisce di aggiungere riferimenti a studi accademici recenti

• Chiarimenti Necessari:
  - La sezione sulla keyword density richiede supporto statistico
  - I concetti di AI generativa necessitano una spiegazione più approfondita
  - Si raccomanda di includere esempi pratici di implementazione

• Suggerimenti di Miglioramento:
  - Aggiungere riferimenti a framework specifici di machine learning
  - Includere metriche quantitative a supporto delle affermazioni
  - Espandere la sezione sulle limitazioni tecniche

• Modifiche Proposte:
  - "ChatGPT può generare contenuti di alta qualità" → "ChatGPT, basato sull'architettura GPT-3.5/4, può generare contenuti di alta qualità attraverso tecniche avanzate di NLP"
  - "L'AI può analizzare grandi volumi di dati" → "L'AI, attraverso algoritmi di deep learning e analisi predittiva, può processare e analizzare grandi volumi di dati";
  `;
  };

  const applyChanges = (content: string) => {
    return content
      .replace(
        "ChatGPT può generare contenuti di alta qualità",
        "<mark>ChatGPT, basato sull'architettura GPT-3.5/4, può generare contenuti di alta qualità attraverso tecniche avanzate di NLP</mark>"
      )
      .replace(
        "L'AI può analizzare grandi volumi di dati",
        "<mark>L'AI, attraverso algoritmi di deep learning e analisi predittiva, può processare e analizzare grandi volumi di dati</mark>"
      );
  };

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
              <div className="text-center text-lg font-medium text-brand-600">
                {loadingMessage}
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
                <div dangerouslySetInnerHTML={{ __html: analysis || '' }} />
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div 
                    className="p-4 border rounded-md bg-white"
                    dangerouslySetInnerHTML={{ __html: editedArticle }}
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
