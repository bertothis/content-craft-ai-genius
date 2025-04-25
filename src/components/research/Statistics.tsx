
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from 'lucide-react';

interface StatisticsProps {
  statistics: string[];
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5 text-brand-600" />
          Statistiche e Dati
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {statistics.map((stat, index) => (
            <li key={index} className="text-gray-700">{stat}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Statistics;
