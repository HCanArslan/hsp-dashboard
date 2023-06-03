import React from 'react';
import { Card as AntCard } from 'antd';

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <AntCard className="w-full max-w-md mx-auto mb-4">
      <AntCard.Meta title={title} description={content} />
    </AntCard>
  );
};

export default Card;
