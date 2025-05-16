import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Copy, Eye, FileText } from 'lucide-react';

export const MarkdownPreviewerTool: React.FC = () => {
  const [markdown, setMarkdown] = useState(`# Markdown Preview Tool

## Introduction
This is a simple tool to preview Markdown in real-time.

### Features:
- Real-time preview
- Syntax highlighting
- Easy to use

## Code Example
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

## Lists
1. First item
2. Second item
3. Third item

* Unordered item
* Another item
* And another one

## Links and Images
[Visit my portfolio](#)

![Sample Image](https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800)

## Tables
| Name | Role | Skills |
|------|------|--------|
| John | Developer | JavaScript, React |
| Jane | Designer | UI/UX, Figma |

## Blockquotes
> This is a blockquote.
> It can span multiple lines.`);
  
  const [view, setView] = useState<'split' | 'editor' | 'preview'>('split');
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);

  // Simple Markdown to HTML conversion
  useEffect(() => {
    const convertMarkdown = async () => {
      // This is a very simple conversion - in a real app, you'd use a proper Markdown parser
      let converted = markdown
        // Headers
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code blocks
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
        // Images
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" style="max-width: 100%;" />')
        // Lists
        .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
        .replace(/^\* (.*$)/gm, '<li>$1</li>')
        // Blockquotes
        .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
        // Tables - basic support
        .replace(/\|(.+)\|/g, '<tr><td>$1</td></tr>');

      // Fix lists
      converted = converted.replace(/<li>(.*?)<\/li>/g, (match) => {
        if (converted.indexOf('<ul>') === -1) {
          return '<ul>' + match + '</ul>';
        }
        return match;
      });

      // Paragraphs
      converted = '<div class="markdown-preview">' + converted + '</div>';
      converted = converted.replace(/\n{2,}/g, '</p><p>');

      setHtml(converted);
    };

    convertMarkdown();
  }, [markdown]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant={view === 'editor' ? 'primary' : 'outline'}
            onClick={() => setView('editor')}
            icon={<FileText size={16} />}
            size="sm"
          >
            Editor
          </Button>
          <Button
            variant={view === 'preview' ? 'primary' : 'outline'}
            onClick={() => setView('preview')}
            icon={<Eye size={16} />}
            size="sm"
          >
            Preview
          </Button>
          <Button
            variant={view === 'split' ? 'primary' : 'outline'}
            onClick={() => setView('split')}
            size="sm"
          >
            Split
          </Button>
        </div>
        
        <Button
          variant="outline"
          onClick={copyToClipboard}
          size="sm"
          icon={<Copy size={16} />}
        >
          {copied ? 'Copied!' : 'Copy Markdown'}
        </Button>
      </div>

      <div className={`flex ${view === 'split' ? 'space-x-4' : ''}`}>
        {/* Editor */}
        {(view === 'editor' || view === 'split') && (
          <div className={`${view === 'split' ? 'w-1/2' : 'w-full'}`}>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[500px] p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
        
        {/* Preview */}
        {(view === 'preview' || view === 'split') && (
          <div 
            className={`${view === 'split' ? 'w-1/2' : 'w-full'} h-[500px] p-4 overflow-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm prose dark:prose-invert max-w-none`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
};