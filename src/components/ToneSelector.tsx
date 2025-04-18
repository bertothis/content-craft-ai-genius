
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2 } from 'lucide-react';

export type ToneType = 'datapizza' | 'formale';

interface ToneSelectorProps {
  selectedTone: ToneType;
  onChange: (tone: ToneType) => void;
}

const tones: { value: ToneType; label: string; description: string }[] = [
  { 
    value: 'datapizza', 
    label: 'Tono di Datapizza', 
    description: 'Informale, diretto e coinvolgente, con un tocco di personalità'
  },
  { 
    value: 'formale', 
    label: 'Tono Formale', 
    description: 'Professionale, autorevole e strutturato'
  }
];

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Volume2 className="mr-2 h-5 w-5 text-brand-600" />
          Tone of Voice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedTone} 
          onValueChange={(value) => onChange(value as ToneType)}
          className="space-y-3"
        >
          {tones.map((tone) => (
            <div key={tone.value} className="flex items-start space-x-2">
              <RadioGroupItem value={tone.value} id={`tone-${tone.value}`} />
              <div className="grid gap-1">
                <Label htmlFor={`tone-${tone.value}`} className="font-medium">
                  {tone.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {tone.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ToneSelector;
