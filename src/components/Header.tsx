
import React from 'react';
import { Brain, FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-brand-600" />
          <h1 className="text-2xl font-bold ai-gradient-text">ContentCraft AI</h1>
        </div>
        <div className="flex items-center space-x-1">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Articoli SEO</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
