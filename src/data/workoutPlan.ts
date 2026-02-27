import { WorkoutDay } from '../types';

/** Hybrid Recovery Split – Mon Push, Tue Pull, Wed Rest, Thu Legs, Fri Upper, Sat Full+Run, Sun Rest */
export const workoutPlan: Record<number, WorkoutDay> = {
  0: { type: 'rest', name: 'Rest Day', exercises: [] },
  1: { type: 'gym', name: 'Push (Chest/Shoulders/Tri) + HIIT', exercises: ['Incline DB Press 4×8-10', 'Overhead Press 3×8', 'DB Lateral Raises 4×15', 'Dips (Weighted) 3×10', 'Finisher: Burpees + Mountain Climbers 4 Rounds (45s Work / 15s Rest)'] },
  2: { type: 'gym', name: 'Pull (Back/Biceps) + Engine', exercises: ['Weighted Pull-ups 4×6-8', 'Seated Cable Rows 4×10', 'Face Pulls 3×20', 'DB Bicep Curls 3×12', 'Finisher: 15 Min Incline Walk or Skipping (steady heart rate)'] },
  3: { type: 'rest', name: 'Rest Day', exercises: [] },
  4: { type: 'gym', name: 'Legs (Quads/Hams/Calves) + Power', exercises: ['Barbell Squats 4×6-8', 'Romanian Deadlifts 4×10', 'Leg Extensions 3×15', 'Calf Raises 4×15', 'Finisher: KB/DB Swings + Box Jumps 4 Supersets (15 Swings / 5 Jumps)'] },
  5: { type: 'gym', name: 'Aesthetic Sculpt (Upper) + HIIT', exercises: ['DB Lateral Raises 4×20', 'Incline DB Flyes 3×12', 'Pull-ups (Bodyweight) 3×Max', 'Hammer Curls 3×12', 'Finisher: 100m Sprints 5 Rounds (Full effort / 60s rest)'] },
  6: { type: 'gym', name: 'Functional Full Body + Run', exercises: ['Deadlifts (Conventional) 3×5', 'Weighted Dips 3×10', 'Hanging Leg Raises 3×15', 'DB Rows 3×10', 'Finisher: 3km Brisk Run'] },
};

/** Get workout for a day of week (0–6) with optional schedule offset (shifts plan by N days) */
export const getWorkoutForDay = (dayOfWeek: number, offset: number = 0): WorkoutDay => {
  const idx = (dayOfWeek - (offset % 7) + 7) % 7;
  return workoutPlan[idx];
};
