import { Habit } from '@/lib/types'
import { Trash2, Flame } from 'lucide-react'

interface HabitItemProps {
  habit: Habit
  onToggle: () => void
  onDelete: () => void
  streak: number
}

export function HabitItem({ habit, onToggle, onDelete, streak }: HabitItemProps) {
  const today = new Date().toDateString()
  const isCompletedToday = habit.completedDates.includes(today)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={onToggle}
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
              isCompletedToday
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            aria-label={`Toggle ${habit.name}`}
          >
            {isCompletedToday && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`font-medium text-gray-900 ${isCompletedToday ? 'line-through opacity-60' : ''}`}>
              {habit.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
                <span className={`text-sm ${streak > 0 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                  {streak} day{streak !== 1 ? 's' : ''} streak
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
          aria-label={`Delete ${habit.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}