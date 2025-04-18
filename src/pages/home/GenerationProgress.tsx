
import React from 'react';
import { ResearchData } from '@/components/ResearchPhase';
import InputForm from '@/components/InputForm';
import ResearchPhase from '@/components/ResearchPhase';
import ArticlePhase from '@/components/ArticlePhase';
import { ToneType } from '@/components/ToneSelector';
import { SEOSettingsData } from '@/components/SEOSettings';

interface GenerationProgressProps {
  isResearching: boolean;
  isGenerating: boolean;
  researchData: ResearchData | null;
  generatedArticle: string | null;
  onStartResearch: (input: string) => void;
  onGenerateArticle: (tone: ToneType, seoSettings: SEOSettingsData) => void;
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({
  isResearching,
  isGenerating,
  researchData,
  generatedArticle,
  onStartResearch,
  onGenerateArticle,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {!researchData && (
        <InputForm 
          onSubmit={onStartResearch} 
          isLoading={isResearching} 
        />
      )}
      
      {(isResearching || researchData) && (
        <ResearchPhase 
          isLoading={isResearching} 
          researchData={researchData} 
        />
      )}
      
      {researchData && (
        <ArticlePhase 
          researchData={researchData}
          isGenerating={isGenerating}
          onGenerate={onGenerateArticle}
          generatedArticle={generatedArticle}
        />
      )}
    </div>
  );
};

export default GenerationProgress;
