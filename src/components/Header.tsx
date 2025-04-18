
import React from 'react';
import { Brain, FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 floating">
          <Brain className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold ai-gradient-text">ContentCraft AI</h1>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm">
          <FileText className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-900">Articoli SEO</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
