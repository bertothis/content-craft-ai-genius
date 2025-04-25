
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileSearch } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface KeyInsightsProps {
  insights: string[];
}

const KeyInsights: React.FC<KeyInsightsProps> = ({ insights }) => {
  const [newNote, setNewNote] = useState("");
  const [customInsights, setCustomInsights] = useState<string[]>([]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setCustomInsights([...customInsights, newNote.trim()]);
      setNewNote("");
      toast({
        title: "Nota aggiunta",
        description: "Il punto chiave è stato aggiunto con successo."
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileSearch className="mr-2 h-5 w-5 text-purple-600" />
          Punti Chiave
        </CardTitle>
        <CardDescription>
          Aggiungi note personalizzate ai punti chiave identificati
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            {insights.map((insight, index) => (
              <li key={`ai-${index}`} className="text-gray-700">{insight}</li>
            ))}
            {customInsights.map((insight, index) => (
              <li key={`custom-${index}`} className="text-gray-700 font-medium">{insight}</li>
            ))}
          </ul>
          
          <div className="flex space-x-2">
            <Input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Aggiungi un punto chiave personalizzato..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddNote();
                }
              }}
            />
            <Button 
              onClick={handleAddNote}
              variant="outline"
              size="icon"
            >+</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyInsights;
