import React, { useState } from "react";
import Layout from "@/components/Layout";
import { ResearchData } from "@/components/ResearchPhase";
import { ToneType } from "@/components/ToneSelector";
import { SEOSettingsData } from "@/components/SEOSettings";
import Header from "./home/Header";
import GenerationProgress from "./home/GenerationProgress";
import { useResearchData } from "@/hooks/useResearchData";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [isResearching, setIsResearching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [researchData, setResearchData] = useState<ResearchData | null>(null);
  const [generatedArticle, setGeneratedArticle] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  
  const { saveResearchData, saveGeneratedArticle, isLoading } = useResearchData();

  const handleStartResearch = async (input: string, githubRepo?: string) => {
    setIsResearching(true);
    setResearchData(null);
    setGeneratedArticle(null);
    
    try {
      const mockResearchData: ResearchData = {
        overview: `L'utilizzo di ChatGPT nel marketing rappresenta una delle applicazioni più innovative dell'intelligenza artificiale generativa nel settore. ChatGPT può essere impiegato per automatizzare e migliorare numerosi processi di marketing, dalla creazione di contenuti all'analisi dei dati, fino all'interazione diretta con i clienti.\n\nLe aziende stanno adottando questa tecnologia per ottimizzare le operazioni, ridurre i costi e migliorare l'engagement con i clienti. La versatilità di ChatGPT lo rende uno strumento prezioso per professionisti del marketing di ogni livello.`,
        sources: [
          { title: "Harvard Business Review: AI in Marketing", url: "https://hbr.org/topic/ai-and-machine-learning" },
          { title: "OpenAI: ChatGPT for Business", url: "https://openai.com/enterprise" },
          { title: "Marketing AI Institute", url: "https://www.marketingaiinstitute.com/" },
          { title: "Forbes: AI Marketing Trends", url: "https://www.forbes.com/ai/" },
        ],
        keyInsights: [
          "ChatGPT può generare contenuti di alta qualità per blog, social media e campagne email",
          "L'AI può analizzare grandi volumi di dati per identificare trend e opportunità di marketing",
          "Gli assistenti virtuali basati su ChatGPT migliorano il servizio clienti 24/7",
          "Il prompt engineering è fondamentale per ottenere risultati ottimali da ChatGPT",
          "L'integrazione di ChatGPT con altri strumenti di marketing crea workflow automatizzati potenti"
        ],
        statistics: [
          "Il 60% delle aziende che utilizzano AI nel marketing ha registrato un aumento del ROI",
          "Il tempo di produzione dei contenuti si riduce del 75% con l'uso di strumenti AI",
          "Il 78% dei marketer prevede di aumentare gli investimenti in AI nei prossimi 2 anni",
          "I chatbot AI possono gestire fino all'85% delle interazioni con i clienti senza intervento umano"
        ],
        trends: [
          "Personalizzazione avanzata dei contenuti basata su dati utente",
          "Marketing conversazionale tramite chatbot in tempo reale",
          "Automatizzazione del content marketing con qualità sempre più elevata",
          "Integrazione di AI generativa con sistemi CRM e piattaforme di analytics",
          "Aumento della domanda di specialisti in prompt engineering"
        ]
      };
      
      if (githubRepo) {
        mockResearchData.githubData = {
          repo: githubRepo,
          issues: [
            { title: "Feature: Integrate AI content suggestions", url: `https://github.com/${githubRepo}/issues/42` },
            { title: "Bug: ChatGPT API rate limiting issue", url: `https://github.com/${githubRepo}/issues/57` },
            { title: "Enhancement: Improve prompt templates for marketing", url: `https://github.com/${githubRepo}/issues/83` }
          ],
          pullRequests: [
            { title: "Add support for OpenAI's latest model", url: `https://github.com/${githubRepo}/pull/126` },
            { title: "Improve marketing content generation with better prompts", url: `https://github.com/${githubRepo}/pull/145` }
          ],
          stars: 1280,
          lastUpdate: "2 giorni fa"
        };
        
        toast({
          title: "Ricerca GitHub completata",
          description: `Analisi della repo ${githubRepo} integrata nei risultati.`
        });
      }
      
      setResearchData(mockResearchData);
      toast({
        title: "Ricerca completata",
        description: "Abbiamo raccolto le informazioni necessarie per il tuo articolo."
      });
      
      const sessionId = await saveResearchData(mockResearchData, githubRepo);
      if (sessionId) {
        setCurrentSessionId(sessionId);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Errore durante la ricerca",
        description: "Si è verificato un errore durante la ricerca. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsResearching(false);
    }
  };

  const handleGenerateArticle = async (tone: ToneType, seoSettings: SEOSettingsData) => {
    setIsGenerating(true);
    
    try {
      const mockArticle = `# Come Usare ChatGPT per Rivoluzionare il Tuo Marketing

## Introduzione al Marketing con ChatGPT

Nel panorama digitale in rapida evoluzione, l'intelligenza artificiale sta ridefinendo le strategie di marketing tradizionali. ChatGPT, un modello linguistico avanzato sviluppato da OpenAI, è diventato uno strumento indispensabile per i professionisti del marketing che desiderano ottimizzare le loro attività e ottenere risultati migliori.

Questo articolo esplora le modalità pratiche con cui puoi integrare ChatGPT nelle tue strategie di marketing per aumentare l'efficienza, migliorare l'engagement con i clienti e dare slancio ai tuoi risultati commerciali.

## Creazione di Contenuti con l'Intelligenza Artificiale

### Generazione di Blog Post Ottimizzati per SEO

ChatGPT eccelle nella creazione di contenuti per blog informativi e coinvolgenti. Puoi utilizzarlo per:

- Generare bozze complete di articoli su argomenti specifici
- Sviluppare titoli accattivanti che attirano l'attenzione
- Creare meta descrizioni ottimizzate per la SEO
- Suggerire sottotitoli pertinenti per migliorare la struttura dell'articolo

Le statistiche mostrano che il 60% delle aziende che utilizzano l'AI nel marketing ha registrato un aumento significativo del ROI, con una riduzione del 75% nel tempo necessario per la produzione di contenuti.

### Social Media e Campagne Email

Per i social media, ChatGPT può:

- Creare post accattivanti adattati a diverse piattaforme
- Suggerire hashtag pertinenti per aumentare la visibilità
- Generare testi persuasivi per le inserzioni pubblicitarie
- Proporre idee per contenuti visivi e descrizioni

Nelle campagne email, l'AI può personalizzare i messaggi su larga scala, aumentando l'apertura e i tassi di conversione.

## Ottimizzazione delle Strategie di Customer Service

Con l'implementazione di chatbot basati su ChatGPT, le aziende possono:

1. Offrire supporto clienti 24/7 senza costi aggiuntivi
2. Rispondere istantaneamente alle domande frequenti
3. Raccogliere feedback preziosi in tempo reale
4. Indirizzare le richieste complesse agli operatori umani

I chatbot AI possono gestire fino all'85% delle interazioni con i clienti senza intervento umano, liberando risorse per attività più strategiche.

## Data Analysis per Decisioni di Marketing Informate

ChatGPT può aiutare nell'analisi dei dati:

- Interpretando report di marketing complessi
- Identificando tendenze emergenti nel comportamento dei consumatori
- Fornendo suggerimenti per ottimizzare le campagne in corso
- Presentando dati complessi in formato facilmente comprensibile

Il 78% dei marketer prevede di aumentare gli investimenti in AI nei prossimi due anni, riconoscendo il valore aggiunto di queste tecnologie.

## Best Practices per l'Utilizzo di ChatGPT nel Marketing

Per massimizzare i risultati:

- Affinare le competenze di prompt engineering per ottenere output più precisi
- Combinare l'intelligenza artificiale con l'intuizione umana
- Mantenere un controllo umano sulla qualità dei contenuti generati
- Integrare ChatGPT con altri strumenti di marketing per workflow automatizzati

## Tendenze Future nel Marketing AI

Le tendenze emergenti includono:

- Personalizzazione avanzata basata su dati utente individuali
- Marketing conversazionale in tempo reale
- Integrazione di AI generativa con sistemi CRM
- Aumento della domanda di specialisti in prompt engineering

## Conclusione

L'integrazione di ChatGPT nelle strategie di marketing non è più un'opzione futuristica, ma una necessità competitiva nel panorama digitale attuale. Le aziende che adottano queste tecnologie oggi saranno meglio posizionate per il successo domani.

Inizia con progetti pilota specifici, misura i risultati e scala gradualmente l'implementazione di ChatGPT nel tuo marketing mix per rimanere all'avanguardia nel tuo settore.`;
      
      setGeneratedArticle(mockArticle);
      toast({
        title: "Articolo generato",
        description: "Il tuo articolo SEO è stato generato con successo."
      });
      
      if (currentSessionId) {
        await saveGeneratedArticle(currentSessionId, mockArticle, tone, seoSettings);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Errore durante la generazione",
        description: "Si è verificato un errore durante la generazione dell'articolo. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12">
        <Header />
        <GenerationProgress
          isResearching={isResearching || isLoading}
          isGenerating={isGenerating}
          researchData={researchData}
          generatedArticle={generatedArticle}
          onStartResearch={handleStartResearch}
          onGenerateArticle={handleGenerateArticle}
        />
      </div>
    </Layout>
  );
};

export default Index;
