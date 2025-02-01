export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: Difficulty;
  type: 'daily' | 'weekly' | 'regular';
  problemStatement: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    javascript: string;
    typescript: string;
    python: string;
  };
};

export type TopicStats = {
  name: string;
  count: number;
};

export type HardTopic = {
  name: string;
  difficulty: number;
};