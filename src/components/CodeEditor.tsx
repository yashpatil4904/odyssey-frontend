import { useState } from 'react';
import Editor from '@monaco-editor/react';

type CodeEditorProps = {
  initialCode: string;
  language: 'javascript' | 'typescript' | 'python';
  onChange?: (value: string | undefined) => void;
};

export default function CodeEditor({ initialCode, language, onChange }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="h-[600px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
