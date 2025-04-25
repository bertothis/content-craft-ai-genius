
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from 'lucide-react';

interface OverviewProps {
  overview: string;
}

const Overview: React.FC<OverviewProps> = ({ overview }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="mr-2 h-5 w-5 text-brand-600" />
          Panoramica
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-line">{overview}</p>
      </CardContent>
    </Card>
  );
};

export default Overview;
