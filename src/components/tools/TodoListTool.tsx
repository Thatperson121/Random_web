import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Plus, Trash2, CheckCircle, Circle, Edit, Save } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoListTool: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editingId === null) return;
    
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodo();
          }}
          placeholder="Add a new todo..."
          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Button
          onClick={addTodo}
          variant="primary"
          className="rounded-l-none"
          icon={<Plus size={18} />}
        >
          Add
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={clearCompleted}
          disabled={!todos.some((todo) => todo.completed)}
        >
          Clear completed
        </Button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {filter === 'all'
            ? 'No todos yet. Add one above!'
            : filter === 'active'
            ? 'No active todos!'
            : 'No completed todos!'}
        </div>
      ) : (
        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border-l-4 transition-colors ${
                todo.completed
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-blue-500'
              }`}
            >
              {editingId === todo.id ? (
                <div className="flex-grow flex items-center">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow px-3 py-1 border border-gray-300 dark:border-gray-600 rounded shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                  />
                  <div className="flex space-x-2 ml-2">
                    <button
                      onClick={saveEdit}
                      className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center flex-grow">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`mr-2 ${
                        todo.completed
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {todo.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                    </button>
                    <span
                      className={`flex-grow ${
                        todo.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      disabled={todo.completed}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};