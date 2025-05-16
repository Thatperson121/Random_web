import { Calculator, Calendar, Clock, Clipboard, CreditCard, FileCog, FileText, PenTool } from 'lucide-react';
import { Tool } from '../types';
import { ColorPickerTool } from '../components/tools/ColorPickerTool';
import { PasswordGeneratorTool } from '../components/tools/PasswordGeneratorTool';
import { MarkdownPreviewerTool } from '../components/tools/MarkdownPreviewerTool';
import { TimerTool } from '../components/tools/TimerTool';
import { CalculatorTool } from '../components/tools/CalculatorTool';
import { TodoListTool } from '../components/tools/TodoListTool';

export const tools: Tool[] = [
  {
    id: 'color-picker',
    title: 'Color Picker',
    description: 'Generate color palettes and convert between different color formats.',
    icon: PenTool,
    component: ColorPickerTool,
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Create secure, random passwords with customizable options.',
    icon: CreditCard,
    component: PasswordGeneratorTool,
  },
  {
    id: 'markdown-previewer',
    title: 'Markdown Previewer',
    description: 'Write and preview Markdown in real-time with syntax highlighting.',
    icon: FileText,
    component: MarkdownPreviewerTool,
  },
  {
    id: 'timer',
    title: 'Timer & Stopwatch',
    description: 'Track time with a customizable timer and stopwatch.',
    icon: Clock,
    component: TimerTool,
  },
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'Perform basic and advanced mathematical calculations.',
    icon: Calculator,
    component: CalculatorTool,
  },
  {
    id: 'todo-list',
    title: 'Todo List',
    description: 'Manage your tasks with a simple, intuitive todo list.',
    icon: Clipboard,
    component: TodoListTool,
  },
];