export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type TopicStats = {
  name: string;
  count: number;
};

export type HardTopic = {
  name: string;
  difficulty: number;
};

type Example = {
  input: string;
  output: string;
  explanation?: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: Difficulty;
  type: 'regular' | 'daily' | 'weekly';
  problemStatement: string;
  examples: Example[];
  constraints: string[];
  starterCode: {
    javascript: string;
    typescript: string;
    python: string;
  };
};

export type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
}; 