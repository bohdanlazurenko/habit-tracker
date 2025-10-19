"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';

interface HabitFormProps {
  onSubmit: (name: string, color?: string) => void;
}

const colors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Teal', value: '#14b8a6' },
];

export function HabitForm({ onSubmit }: HabitFormProps) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim(), selectedColor);
      setName('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full"
        variant="outline"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Habit
      </Button>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Enter habit name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Choose a color</label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className="w-8 h-8 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: color.value,
                  borderColor: selectedColor === color.value ? '#1f2937' : 'transparent',
                  transform: selectedColor === color.value ? 'scale(1.1)' : 'scale(1)',
                }}
                title={color.name}
              />
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" disabled={!name.trim()}>
            Create Habit
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              setName('');
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}