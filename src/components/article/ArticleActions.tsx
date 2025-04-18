
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy, FileDown, Pencil, Save, Brain } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface ArticleActionsProps {
  isEditing: boolean;
  onEditToggle: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onConsultDirector: () => void;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({
  isEditing,
  onEditToggle,
  onCopy,
  onDownload,
  onConsultDirector
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onEditToggle}
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
        onClick={onCopy}
        className="flex items-center"
        disabled={isEditing}
      >
        <Copy className="mr-2 h-4 w-4" /> Copia
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onDownload}
        className="flex items-center"
        disabled={isEditing}
      >
        <FileDown className="mr-2 h-4 w-4" /> Scarica
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onConsultDirector}
        className="flex items-center ml-auto"
        disabled={isEditing}
      >
        <Brain className="mr-2 h-4 w-4" /> Chiama El Director
      </Button>
    </div>
  );
};

export default ArticleActions;
