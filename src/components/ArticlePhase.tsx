import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Eye, Code, Copy, FileDown, Brain, Pencil, Save } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea";
import ToneSelector, { ToneType } from './ToneSelector';
import SEOSettings, { SEOSettingsData } from './SEOSettings';
import { ResearchData } from './ResearchPhase';
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState(generatedArticle || '');
  const [tone, setTone] = useState<ToneType>('datapizza');
  const [seoSettings, setSEOSettings] = useState<SEOSettingsData>({
    mainKeyword: '',
    secondaryKeywords: '',
    metaDescription: '',
    wordCount: 1200,
    keywordDensity: 2.0
  });

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
      // Save changes
      if (editedArticle !== generatedArticle) {
        toast({
          title: "Modifiche salvate",
          description: "Le modifiche all'articolo sono state salvate con successo."
        });
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditedArticle(generatedArticle || '');
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
                  <Tabs defaultValue={isEditing ? "markdown" : "preview"}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger 
                        value="preview" 
                        className="flex items-center"
                        disabled={isEditing}
                      >
                        <Eye className="mr-2 h-4 w-4" /> Anteprima
                      </TabsTrigger>
                      <TabsTrigger 
                        value="markdown" 
                        className="flex items-center"
                      >
                        <Code className="mr-2 h-4 w-4" /> Markdown
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="pt-4">
                      <div 
                        className="prose prose-sm md:prose-base max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: (isEditing ? editedArticle : generatedArticle).replace(/\n/g, '<br />') 
                        }}
                      />
                    </TabsContent>
                    <TabsContent value="markdown" className="pt-4">
                      {isEditing ? (
                        <Textarea
                          value={editedArticle}
                          onChange={(e) => setEditedArticle(e.target.value)}
                          className="min-h-[60vh] font-mono text-sm"
                        />
                      ) : (
                        <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[60vh] text-sm">
                          {generatedArticle}
                        </pre>
                      )}
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditToggle}
                      className="flex items-center"
                    >
                      {isEditing ? (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Salva
                        </>
                      ) : (
                        <>
                          <Pencil className="mr-2 h-4 w-4" /> Modifica
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="flex items-center"
                      disabled={isEditing}
                    >
                      <Copy className="mr-2 h-4 w-4" /> Copia
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadArticle}
                      className="flex items-center"
                      disabled={isEditing}
                    >
                      <FileDown className="mr-2 h-4 w-4" /> Scarica
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleConsultDirector}
                      className="flex items-center ml-auto"
                      disabled={isEditing}
                    >
                      <Brain className="mr-2 h-4 w-4" /> Chiama El Director
                    </Button>
                  </div>
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

const ArticleSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
    <div className="py-2" />
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
    <div className="py-2" />
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

export default ArticlePhase;
