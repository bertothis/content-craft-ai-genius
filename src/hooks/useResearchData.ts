
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import type { ResearchData } from "@/components/ResearchPhase";
import { toast } from "@/components/ui/use-toast";

export const useResearchData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveResearchData = async (data: ResearchData, githubRepo?: string) => {
    try {
      setIsLoading(true);
      
      // Insert research session
      const { data: sessionData, error: sessionError } = await supabase
        .from('research_sessions')
        .insert({
          input_text: "Generated research",
          overview: data.overview,
          key_insights: data.keyInsights,
          statistics: data.statistics,
          trends: data.trends,
          sources: data.sources,
          github_repo: githubRepo
        })
        .select('id')
        .single();

      if (sessionError) throw sessionError;

      // If GitHub data exists, save it
      if (data.githubData) {
        const { error: githubError } = await supabase
          .from('github_research_data')
          .insert({
            research_session_id: sessionData.id,
            repo_name: data.githubData.repo,
            stars: data.githubData.stars,
            last_update: data.githubData.lastUpdate,
            issues: data.githubData.issues,
            pull_requests: data.githubData.pullRequests
          });

        if (githubError) throw githubError;
      }

      toast({
        title: "Ricerca salvata",
        description: "I dati della ricerca sono stati salvati con successo"
      });

      return sessionData.id;
    } catch (error) {
      console.error('Error saving research data:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il salvataggio dei dati",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveGeneratedArticle = async (
    researchSessionId: string,
    content: string,
    tone: string,
    seoSettings: any
  ) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('generated_articles')
        .insert({
          research_session_id: researchSessionId,
          content,
          tone,
          seo_settings: seoSettings
        });

      if (error) throw error;

      toast({
        title: "Articolo salvato",
        description: "L'articolo generato è stato salvato con successo"
      });
    } catch (error) {
      console.error('Error saving generated article:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il salvataggio dell'articolo",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    saveResearchData,
    saveGeneratedArticle
  };
};
