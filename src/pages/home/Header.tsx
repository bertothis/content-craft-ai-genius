
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold ai-gradient-text">
        ContentCraft AI Genius
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Genera articoli di blog ottimizzati per la SEO in due fasi: ricerca approfondita e creazione di contenuti di qualità.
      </p>
    </div>
  );
};

export default Header;
