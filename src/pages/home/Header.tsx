
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold ai-gradient-text">
        ContentCraft AI Genius
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Genera articoli di blog ottimizzati per la SEO in due fasi: ricerca approfondita (inclusa integrazione GitHub) e creazione di contenuti di qualità.
      </p>
      <div className="flex justify-center items-center space-x-2">
        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Novità</span>
        <span className="text-sm text-muted-foreground">Integrazione con repository GitHub per ricerche avanzate</span>
      </div>
    </div>
  );
};

export default Header;
