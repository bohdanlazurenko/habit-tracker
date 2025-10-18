'use client'

import { useState, useEffect } from 'react'
import { HabitList } from '@/components/HabitList'
import { AddHabitForm } from '@/components/AddHabitForm'
import { Habit } from '@/lib/types'
import { loadHabits, saveHabits } from '@/lib/storage'

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const loadedHabits = loadHabits()
    setHabits(loadedHabits)
  }, [])

  useEffect(() => {
    if (isClient) {
      saveHabits(habits)
    }
  }, [habits, isClient])

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      completedDates: [],
      createdAt: new Date().toISOString(),
    }
    setHabits([...habits, newHabit])
  }

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const today = new Date().toDateString()
        const completedDates = habit.completedDates.includes(today)
          ? habit.completedDates.filter(date => date !== today)
          : [...habit.completedDates, today]
        return { ...habit, completedDates }
      }
      return habit
    }))
  }

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter(habit => habit.id !== habitId))
  }

  const calculateStreak = (completedDates: string[]): number => {
    if (completedDates.length === 0) return 0
    
    const dates = completedDates
      .map(date => new Date(date))
      .sort((a, b) => b.getTime() - a.getTime())
    
    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    
    for (const date of dates) {
      date.setHours(0, 0, 0, 0)
      if (date.getTime() === currentDate.getTime()) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else if (date.getTime() === currentDate.getTime()) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }
    
    return streak
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Habit Tracker</h1>
        <p className="text-gray-600">Build consistency, one day at a time</p>
      </header>

      <AddHabitForm onAddHabit={addHabit} />

      <HabitList
        habits={habits}
        onToggleHabit={toggleHabit}
        onDeleteHabit={deleteHabit}
        calculateStreak={calculateStreak}
      />
    </div>
  )
}