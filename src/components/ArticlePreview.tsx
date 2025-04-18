
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ArticlePreviewProps {
  htmlContent: string;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ htmlContent }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div 
          className="prose prose-sm md:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </CardContent>
    </Card>
  );
};

export default ArticlePreview;
