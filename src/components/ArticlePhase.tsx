
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from 'react-router-dom';
import { ResearchData } from './ResearchPhase';
import ToneSelector, { ToneType } from './ToneSelector';
import SEOSettings, { SEOSettingsData } from './SEOSettings';
import ArticlePreviewTabs from './article/ArticlePreviewTabs';
import ArticleActions from './article/ArticleActions';
import ArticleSkeleton from './article/ArticleSkeleton';

interface ArticlePhaseProps {
  researchData: ResearchData | null;
  isGenerating: boolean;
  onGenerate: (tone: ToneType, seoSettings: SEOSettingsData) => void;
  generatedArticle: string | null;
}

const ArticlePhase: React.FC<ArticlePhaseProps> = ({ 
  researchData, 
  isGenerating, 
  onGenerate,
  generatedArticle
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState(
    location.state?.modifiedArticle || generatedArticle || ''
  );
  const [tone, setTone] = useState<ToneType>('datapizza');
  const [seoSettings, setSEOSettings] = useState<SEOSettingsData>({
    mainKeyword: '',
    secondaryKeywords: '',
    metaDescription: '',
    wordCount: 1200,
    keywordDensity: 2.0
  });

  useEffect(() => {
    if (location.state?.modifiedArticle && location.state?.source === 'el-director') {
      setEditedArticle(location.state.modifiedArticle);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleGenerateArticle = () => {
    if (!seoSettings.mainKeyword.trim()) {
      toast({
        title: "Parola chiave mancante",
        description: "Inserisci almeno la parola chiave principale.",
        variant: "destructive"
      });
      return;
    }
    onGenerate(tone, seoSettings);
  };

  const copyToClipboard = () => {
    if (generatedArticle) {
      navigator.clipboard.writeText(generatedArticle);
      toast({
        title: "Articolo copiato!",
        description: "L'articolo è stato copiato negli appunti."
      });
    }
  };

  const downloadArticle = () => {
    if (generatedArticle) {
      const blob = new Blob([generatedArticle], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `articolo-${seoSettings.mainKeyword.replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (editedArticle !== generatedArticle) {
        toast({
          title: "Modifiche salvate",
          description: "Le modifiche all'articolo sono state salvate con successo."
        });
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleConsultDirector = () => {
    navigate('/el-director', { 
      state: { articleContent: isEditing ? editedArticle : generatedArticle } 
    });
  };

  if (!researchData) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Fase di Generazione dell'Articolo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <ToneSelector selectedTone={tone} onChange={setTone} />
          <SEOSettings settings={seoSettings} onChange={setSEOSettings} />
          
          <Button 
            onClick={handleGenerateArticle} 
            className="w-full ai-gradient-bg hover:opacity-90"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generazione in corso...
              </span>
            ) : (
              <span className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> Genera Articolo
              </span>
            )}
          </Button>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-brand-600" />
                Anteprima dell'Articolo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <ArticleSkeleton />
              ) : generatedArticle ? (
                <div className="space-y-4">
                  <ArticlePreviewTabs
                    content={generatedArticle}
                    isEditing={isEditing}
                    editedContent={editedArticle}
                    onEditChange={setEditedArticle}
                  />
                  
                  <ArticleActions
                    isEditing={isEditing}
                    onEditToggle={handleEditToggle}
                    onCopy={copyToClipboard}
                    onDownload={downloadArticle}
                    onConsultDirector={handleConsultDirector}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium">Configura le impostazioni SEO e genera il tuo articolo</p>
                  <p className="text-sm">L'articolo verrà generato in base ai dati di ricerca e alle tue preferenze</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArticlePhase;
