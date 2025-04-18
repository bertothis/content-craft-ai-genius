
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
        className="mb-6 hover:scale-105 transition-transform duration-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Torna all'articolo
      </Button>

      <Card className="glass-card border-none shadow-2xl">
        <CardHeader className="space-y-4">
          <CardTitle className="flex items-center space-x-2">
            <div className="relative">
              <Brain className="h-6 w-6 text-brand-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-500 animate-ping" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent font-bold">
              El Director - Analisi Tecnica
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAnalyzing ? (
            <div className="space-y-8">
              <div className="flex items-center justify-center py-12">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Brain className="h-12 w-12 text-brand-600 animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-ping" />
                </div>
              </div>
              <div className="text-center text-lg font-medium bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-pulse">
                {loadingMessage}
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
                <Skeleton className="h-4 w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
                <Skeleton className="h-4 w-5/6 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="prose prose-slate max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                  {analysis}
                </pre>
              </div>
              
              {isEditing ? (
                <div className="space-y-4 animate-fade-in">
                  <div 
                    className="p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-md border border-white/20 shadow-lg prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: editedArticle }}
                  />
                  <Button 
                    onClick={handleSaveChanges} 
                    className="ai-gradient-bg hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Applica Modifiche
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleModifyText} 
                  className="ai-gradient-bg hover:scale-105 transition-all duration-200 shadow-lg"
                >
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
