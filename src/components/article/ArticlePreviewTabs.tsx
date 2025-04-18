
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Code } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface ArticlePreviewTabsProps {
  content: string;
  isEditing: boolean;
  editedContent: string;
  onEditChange: (value: string) => void;
}

const ArticlePreviewTabs: React.FC<ArticlePreviewTabsProps> = ({
  content,
  isEditing,
  editedContent,
  onEditChange
}) => {
  return (
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
            __html: (isEditing ? editedContent : content).replace(/\n/g, '<br />') 
          }}
        />
      </TabsContent>
      <TabsContent value="markdown" className="pt-4">
        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => onEditChange(e.target.value)}
            className="min-h-[60vh] font-mono text-sm"
          />
        ) : (
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[60vh] text-sm">
            {content}
          </pre>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ArticlePreviewTabs;
