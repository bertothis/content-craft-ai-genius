
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Settings } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

export interface SEOSettingsData {
  mainKeyword: string;
  secondaryKeywords: string;
  metaDescription: string;
  wordCount: number;
}

interface SEOSettingsProps {
  settings: SEOSettingsData;
  onChange: (settings: SEOSettingsData) => void;
}

const SEOSettings: React.FC<SEOSettingsProps> = ({ settings, onChange }) => {
  const handleChange = (field: keyof SEOSettingsData, value: string | number) => {
    onChange({
      ...settings,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5 text-brand-600" />
          Impostazioni SEO
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mainKeyword" className="flex items-center">
            <Search className="mr-1 h-4 w-4 text-purple-600" />
            Parola chiave principale
          </Label>
          <Input 
            id="mainKeyword"
            value={settings.mainKeyword} 
            onChange={(e) => handleChange('mainKeyword', e.target.value)}
            placeholder="Es. marketing con ChatGPT"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="secondaryKeywords">Parole chiave secondarie</Label>
          <Input 
            id="secondaryKeywords"
            value={settings.secondaryKeywords} 
            onChange={(e) => handleChange('secondaryKeywords', e.target.value)}
            placeholder="Es. AI marketing, prompt engineering, automazione"
          />
          <p className="text-xs text-muted-foreground">Separa le parole chiave con virgole</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta descrizione</Label>
          <Textarea 
            id="metaDescription"
            value={settings.metaDescription} 
            onChange={(e) => handleChange('metaDescription', e.target.value)}
            placeholder="Descrizione che apparirà nei risultati di ricerca (max 160 caratteri)"
            maxLength={160}
          />
          <p className="text-xs text-right text-muted-foreground">
            {settings.metaDescription.length}/160
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label htmlFor="wordCount">Lunghezza articolo</Label>
            <span className="text-sm font-medium">{settings.wordCount} parole</span>
          </div>
          <Slider 
            id="wordCount"
            min={300}
            max={3000}
            step={100}
            value={[settings.wordCount]}
            onValueChange={(values) => handleChange('wordCount', values[0])}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Breve</span>
            <span>Medio</span>
            <span>Lungo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOSettings;
