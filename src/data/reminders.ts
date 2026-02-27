import { Reminder, MealDetail, MealOption } from '../types';

export const WORKOUT_REMINDER_IDS = ['preworkout', 'workout', 'postworkout', 'shake'];
export const EVENING_WORKOUT_REMINDER_IDS = ['preworkout_eve', 'workout_eve', 'postworkout_eve', 'dinner_eve'];

export const defaultReminders: Reminder[] = [
  { id: 'preworkout', title: 'Pre-Workout Fuel', time: '05:30', enabled: true, icon: '🍌' },
  { id: 'workout', title: 'Training Window', time: '06:00', enabled: true, icon: '🏋️' },
  { id: 'postworkout', title: 'Post-Workout: Egg Whites', time: '07:45', enabled: true, icon: '🥚' },
  { id: 'shake', title: 'The Big Breakfast: Muscle Shake', time: '08:30', enabled: true, icon: '🥤' },
  { id: 'lunch', title: 'Lunch: Chicken Curry + Dal', time: '13:30', enabled: true, icon: '🍗' },
  { id: 'snack', title: 'Snack: Paneer / Sprouted Moong', time: '16:30', enabled: true, icon: '🧀' },
  { id: 'dinner', title: 'Dinner: Fish + Sabzi', time: '20:30', enabled: true, icon: '🐟' },
  { id: 'sleep', title: 'Bedtime', time: '22:30', enabled: true, icon: '🌙' },
];

export const eveningReminders: Reminder[] = [
  { id: 'breakfast', title: 'Breakfast (Foundation)', time: '08:30', enabled: true, icon: '🍳' },
  { id: 'lunch', title: 'Lunch (Pre-Fuel)', time: '13:30', enabled: true, icon: '🍗' },
  { id: 'preworkout_eve', title: 'Pre-Workout Snack', time: '17:30', enabled: true, icon: '🍌' },
  { id: 'workout_eve', title: 'Evening Training Window', time: '18:00', enabled: true, icon: '🏋️' },
  { id: 'postworkout_eve', title: 'Post-Workout: Egg Whites', time: '19:45', enabled: true, icon: '🥚' },
  { id: 'dinner_eve', title: 'Recovery Feast (Dinner + Shake)', time: '20:45', enabled: true, icon: '🍽️' },
  { id: 'sleep_eve', title: 'Bedtime', time: '23:00', enabled: true, icon: '🌙' },
];

// Morning rest day: walk + stretch in AM, meals per updated plan
export const restDayRemindersMorning: Reminder[] = [
  { id: 'recovery_walk', title: 'Casual Walk (20 min)', time: '07:30', enabled: true, icon: '🚶' },
  { id: 'recovery_stretch', title: 'Stretching / Foam Rolling', time: '08:15', enabled: true, icon: '🧘' },
  { id: 'breakfast_rest', title: 'Breakfast: 4 Eggs + 3 Toast', time: '08:30', enabled: true, icon: '🍳' },
  { id: 'lunch', title: 'Lunch: 150g Chicken/Veg + 2 Roti', time: '13:30', enabled: true, icon: '🍗' },
  { id: 'snack', title: 'Snack: Paneer / Sprouted Moong', time: '16:30', enabled: true, icon: '🧀' },
  { id: 'dinner', title: 'Dinner: 150g Grilled Fish + Veggies', time: '20:00', enabled: true, icon: '🐟' },
  { id: 'sleep', title: 'Bedtime', time: '22:30', enabled: true, icon: '🌙' },
];

// Evening rest day: walk + stretch in PM, meals per updated plan
export const restDayRemindersEvening: Reminder[] = [
  { id: 'breakfast_rest', title: 'Breakfast: 4 Eggs + 2 Toast', time: '08:30', enabled: true, icon: '🍳' },
  { id: 'lunch', title: 'Lunch: 150g Chicken + Dal + 2 Roti', time: '13:30', enabled: true, icon: '🍗' },
  { id: 'snack', title: 'Snack: Paneer / Sprouted Moong', time: '16:30', enabled: true, icon: '🧀' },
  { id: 'recovery_walk', title: 'Casual Walk (20 min)', time: '18:00', enabled: true, icon: '🚶' },
  { id: 'recovery_stretch', title: 'Stretching / Foam Rolling', time: '18:30', enabled: true, icon: '🧘' },
  { id: 'dinner', title: 'Dinner: 150g Grilled Fish + Large Salad', time: '20:00', enabled: true, icon: '🐟' },
  { id: 'sleep', title: 'Bedtime', time: '23:00', enabled: true, icon: '🌙' },
];

// Legacy export for backward compatibility; defaults to morning
export const restDayReminders: Reminder[] = restDayRemindersMorning;

export const mealDetails: Record<string, MealDetail> = {
  preworkout: {
    heading: 'Pre-Workout Fuel',
    items: ['1 Banana', '2-3 Dates', '1 Cup Black Coffee'],
    tip: 'Light & fast-digesting to fuel your training without feeling heavy.',
  },
  workout: {
    heading: 'Training Window',
    items: [],
    tip: 'Prioritize form over heavy weight. Stay consistent.',
  },
  postworkout: {
    heading: 'Post-Workout (Phase 1)',
    items: ['5-6 Boiled Egg Whites'],
    tip: 'Immediate protein hit for muscle recovery. Eat within 15 mins of finishing.',
  },
  shake: {
    heading: 'The Big Breakfast – Muscle Shake (Mass+)',
    items: ['350ml Full Cream Milk', '3/4 Cup Muesli', '2 tbsp Peanut Butter', '1 Extra Large Banana', '1-2 tbsp Honey'],
    tip: 'Morning Shift: This is your Post-Workout Big Breakfast. Consume right after egg whites.',
  },
  lunch: {
    heading: 'Lunch (Foundation Meal)',
    items: ['200g Chicken Breast Curry', '3 Rotis', '1 Bowl Thick Dal', '1 Bowl Dahi', 'Salad on the side'],
    tip: 'Biggest meal of the day. Don\'t skip the dahi — great for gut health.',
    vegAlternatives: [
      'Soya Power Mix: 120g Soya Chunks Curry + 1 Bowl Thick Dal (~58g Protein)',
      'Paneer Bhurji: 200g Paneer + Dahi + 3 Rotis (~48g Protein)',
      'Stuffed Chilla: 2 Moong Dal Chillas stuffed with 100g Paneer (~42g Protein)',
    ],
  },
  snack: {
    heading: 'Evening Snack',
    items: ['100g Paneer cubes (sautéed)', 'OR Sprouted Moong'],
    tip: 'Quick protein to bridge lunch and dinner. Keep it simple.',
  },
  dinner: {
    heading: 'Dinner (Muscle Repair)',
    items: ['150g Grilled Fish', '1 Roti', 'Mixed Sabzi'],
    tip: 'Lighter than lunch. Focus on lean protein and fiber-rich veggies.',
    vegAlternatives: [
      'Soya Keema: 100g Soya Granules stir-fry + Mixed Veggies (~50g Protein)',
      'Tofu Steaks: 250g Firm Tofu + Broccoli & Peppers (~36g Protein)',
      'Seitan Stir-fry: 100g Seitan (Wheat Gluten) + Veggies (~70g Protein)',
    ],
  },
  sleep: {
    heading: 'Bedtime Routine',
    items: ['In bed by 10:30 PM', 'No screens 30 mins before sleep', 'Muscles grow during rest!'],
    tip: 'Rest day nutrition: Skip morning shake, cut Roti/Rice by 50%, focus on protein & fiber.',
  },
};

export const eveningMealDetails: Record<string, MealDetail> = {
  breakfast: {
    heading: 'Breakfast (Foundation)',
    items: ['4 Whole Eggs (Bhurji/Omelet)', '3 Brown Bread slices', 'Dahi'],
    tip: 'Solid foundation for the day. Keeps you fueled until lunch.',
  },
  lunch: {
    heading: 'Lunch (Pre-Fuel)',
    items: ['200g Chicken Breast Curry', '3 Rotis', '1 Bowl Thick Dal', '1 Bowl Dahi', 'Salad'],
    tip: 'Pre-fuel for evening training. Don\'t skip the dahi — great for gut health.',
    vegAlternatives: [
      'Soya Power Mix: 120g Soya Chunks Curry + 1 Bowl Thick Dal (~58g Protein)',
      'Paneer Bhurji: 200g Paneer + Dahi + 3 Rotis (~48g Protein)',
      'Stuffed Chilla: 2 Moong Dal Chillas stuffed with 100g Paneer (~42g Protein)',
    ],
  },
  preworkout_eve: {
    heading: 'Pre-Workout Snack',
    items: ['1 Banana', '1 Cup Black Coffee', '2-3 Dates'],
    tip: 'Light & fast-digesting to fuel evening training without feeling heavy.',
  },
  workout_eve: {
    heading: 'Evening Training Window',
    items: [],
    tip: 'Intensity priority. Hydrate with 1L water.',
  },
  postworkout_eve: {
    heading: 'Immediate Recovery',
    items: ['5-6 Boiled Egg Whites'],
    tip: 'Rapid protein hit for muscle recovery. Eat within 15 mins of finishing.',
  },
  dinner_eve: {
    heading: 'The Recovery Feast',
    items: ['150g Grilled Fish/Chicken', '1 Roti', 'Mixed Veggies', 'Upgraded Muscle Shake: 350ml Milk, 3/4 Cup Muesli, 2 tbsp PB, 1 XL Banana, 1-2 tbsp Honey'],
    tip: 'Meal + shake together. Drink after dinner. Mandatory for caloric surplus.',
    vegAlternatives: [
      'Soya Keema: 100g Soya Granules stir-fry + Mixed Veggies (~50g Protein)',
      'Tofu Steaks: 250g Firm Tofu + Broccoli & Peppers (~36g Protein)',
      'Seitan Stir-fry: 100g Seitan (Wheat Gluten) + Veggies (~70g Protein)',
    ],
  },
  sleep_eve: {
    heading: 'Bedtime Routine',
    items: ['In bed by 11:00 PM', 'No screens 30 mins before sleep', 'Muscles grow during rest!'],
    tip: 'Evening shift: Sleep by 11 PM. Rest day: Skip shake, cut carbs 50%, 20 min walk + stretch.',
  },
};

export const restDayMealDetails: Record<string, MealDetail> = {
  breakfast_rest: {
    heading: 'Breakfast (Rest Day)',
    items: ['4 Eggs + 3 slices Toast', 'OR 4 Egg Omelet + Veggies'],
    tip: 'High protein. No shake on rest day — Recovery Days = No Shake.',
  },
  recovery_walk: {
    heading: 'Casual Walk',
    items: ['20 minutes at easy pace', 'Outdoor walk preferred', 'Aids active recovery & digestion'],
    tip: 'Light movement helps blood flow and reduces soreness. No intense effort needed.',
  },
  recovery_stretch: {
    heading: 'Static Stretching / Foam Rolling',
    items: ['10 minutes of full body stretching', 'Focus on tight areas (hips, hamstrings, shoulders)', 'Foam roll quads, IT band, and upper back'],
    tip: 'Improves flexibility and speeds up recovery between training days.',
  },
  lunch: {
    heading: 'Lunch (Rest Day)',
    items: ['150g Chicken/Veg or Paneer', '2 Rotis', '1 Bowl Thick Dal', 'Salad'],
    tip: 'Focus on high protein and fiber. Recovery Days = No Shake.',
    vegAlternatives: [
      '150g Paneer + Dal + 2 Roti + Salad (~45g Protein)',
      '100g Soya Chunk Curry + Dal + 2 Roti (~55g Protein)',
      '1 Bowl Chole + Greek Yogurt + 2 Roti (~35g Protein)',
    ],
  },
  snack: {
    heading: 'Afternoon Snack',
    items: ['100g Paneer cubes', 'OR Sprouted Moong'],
    tip: 'Light protein to bridge lunch and dinner.',
  },
  dinner: {
    heading: 'Dinner (Rest Day)',
    items: ['150g Grilled Fish + Veggies', 'OR 150g Grilled Chicken + Large Salad'],
    tip: 'Load up on veggies and lean protein. Recovery Days = No Shake.',
    vegAlternatives: [
      '200g Tofu Stir-Fry + Broccoli/Peppers (~36g Protein)',
      '150g Paneer Tikka (Grilled) + Large Salad (~30g Protein)',
      '100g Soya Keema stir-fry + Veggies (~50g Protein)',
    ],
  },
  sleep: {
    heading: 'Bedtime Routine',
    items: ['In bed by 10:30 PM', 'No screens 30 mins before sleep', 'Muscles grow during rest!'],
    tip: 'Quality sleep is even more important on rest days — this is when muscles rebuild.',
  },
};

export const mealOptionsData: Record<string, MealOption[]> = {
  preworkout: [
    { label: 'Banana + 2-3 Dates + Coffee', macros: { calories: 180, protein: 2, carbs: 42, fats: 1 } },
    { label: 'Banana + Coffee only', macros: { calories: 107, protein: 1, carbs: 27, fats: 0 } },
  ],
  workout: [
    { label: 'Workout completed', macros: { calories: 0, protein: 0, carbs: 0, fats: 0 } },
  ],
  postworkout: [
    { label: '5-6 Boiled Egg Whites', macros: { calories: 85, protein: 18, carbs: 1, fats: 0 } },
    { label: '5 Boiled Egg Whites', macros: { calories: 85, protein: 18, carbs: 1, fats: 0 } },
    { label: '4 Boiled Egg Whites', macros: { calories: 68, protein: 14, carbs: 1, fats: 0 } },
  ],
  shake: [
    { label: 'Upgraded Muscle Shake (350ml Milk, 3/4 Cup Muesli, 2 tbsp PB, 1 XL Banana, 1-2 tbsp Honey)', macros: { calories: 750, protein: 22, carbs: 110, fats: 26 } },
    { label: 'Light Shake (Milk, Banana, Honey)', macros: { calories: 355, protein: 11, carbs: 59, fats: 10 } },
  ],
  lunch: [
    { label: '200g Chicken Curry + 3 Roti + Dal + Dahi + Salad', macros: { calories: 950, protein: 82, carbs: 95, fats: 22 } },
    { label: '120g Soya Chunks Curry + 1 Bowl Thick Dal (Soya Power Mix)', macros: { calories: 580, protein: 58, carbs: 55, fats: 12 } },
    { label: '200g Paneer Bhurji + Dahi + 3 Roti', macros: { calories: 820, protein: 48, carbs: 78, fats: 32 } },
    { label: '2 Moong Dal Chillas stuffed with 100g Paneer (Stuffed Chilla)', macros: { calories: 540, protein: 42, carbs: 48, fats: 20 } },
    { label: '100g Soya Chunk Curry + Dal + 2 Roti', macros: { calories: 620, protein: 55, carbs: 72, fats: 10 } },
  ],
  snack: [
    { label: '100g Paneer cubes (sautéed)', macros: { calories: 321, protein: 21, carbs: 3, fats: 25 } },
    { label: 'Sprouted Moong', macros: { calories: 100, protein: 8, carbs: 15, fats: 1 } },
    { label: '100g Paneer + Sprouted Moong', macros: { calories: 421, protein: 29, carbs: 18, fats: 26 } },
  ],
  dinner: [
    { label: '150g Grilled Fish + 1 Roti + Mixed Sabzi', macros: { calories: 359, protein: 46, carbs: 31, fats: 5 } },
    { label: '150g Grilled Chicken + 1 Roti + Sabzi', macros: { calories: 412, protein: 52, carbs: 31, fats: 7 } },
    { label: '100g Soya Keema stir-fry + Mixed Veggies', macros: { calories: 350, protein: 50, carbs: 25, fats: 8 } },
    { label: '250g Firm Tofu + Broccoli & Peppers (Tofu Steaks)', macros: { calories: 380, protein: 36, carbs: 18, fats: 20 } },
    { label: '100g Seitan Stir-fry + Veggies', macros: { calories: 320, protein: 70, carbs: 20, fats: 6 } },
    { label: '2 Besan Chillas + Paneer', macros: { calories: 400, protein: 28, carbs: 30, fats: 20 } },
  ],
  sleep: [],
};

export const eveningMealOptions: Record<string, MealOption[]> = {
  breakfast: [
    { label: '4 Eggs Bhurji + 3 Brown Bread + Dahi', macros: { calories: 520, protein: 30, carbs: 42, fats: 22 } },
    { label: '4 Eggs Omelet + 3 Brown Bread + Dahi', macros: { calories: 510, protein: 29, carbs: 41, fats: 21 } },
  ],
  lunch: [
    { label: '200g Chicken Curry + 3 Roti + Dal + Dahi + Salad', macros: { calories: 950, protein: 82, carbs: 95, fats: 22 } },
    { label: '120g Soya Chunks Curry + 1 Bowl Thick Dal (Soya Power Mix)', macros: { calories: 580, protein: 58, carbs: 55, fats: 12 } },
    { label: '200g Paneer Bhurji + Dahi + 3 Roti', macros: { calories: 820, protein: 48, carbs: 78, fats: 32 } },
    { label: '2 Moong Dal Chillas stuffed with 100g Paneer', macros: { calories: 540, protein: 42, carbs: 48, fats: 20 } },
  ],
  preworkout_eve: [
    { label: 'Banana + Coffee + 2-3 Dates', macros: { calories: 180, protein: 2, carbs: 42, fats: 1 } },
    { label: 'Banana + Coffee only', macros: { calories: 107, protein: 1, carbs: 27, fats: 0 } },
  ],
  workout_eve: [
    { label: 'Workout completed', macros: { calories: 0, protein: 0, carbs: 0, fats: 0 } },
  ],
  postworkout_eve: [
    { label: '5-6 Boiled Egg Whites', macros: { calories: 85, protein: 18, carbs: 1, fats: 0 } },
    { label: '5 Boiled Egg Whites', macros: { calories: 85, protein: 18, carbs: 1, fats: 0 } },
    { label: '4 Boiled Egg Whites', macros: { calories: 68, protein: 14, carbs: 1, fats: 0 } },
  ],
  dinner_eve: [
    { label: '150g Fish/Chicken + 1 Roti + Veggies + Upgraded Muscle Shake', macros: { calories: 900, protein: 68, carbs: 105, fats: 32 } },
    { label: '150g Fish/Chicken + Veggies + Shake (No Roti)', macros: { calories: 770, protein: 63, carbs: 74, fats: 30 } },
    { label: '100g Soya Keema + Veggies + Shake', macros: { calories: 730, protein: 60, carbs: 80, fats: 24 } },
    { label: '250g Tofu Steaks + Veggies + Shake', macros: { calories: 800, protein: 58, carbs: 85, fats: 30 } },
  ],
  sleep_eve: [],
};

export const restDayMealOptions: Record<string, MealOption[]> = {
  breakfast_rest: [
    { label: '4 Eggs + 3 slices Toast', macros: { calories: 420, protein: 26, carbs: 38, fats: 18 } },
    { label: '4 Egg Omelet + Veggies (No Bread)', macros: { calories: 280, protein: 24, carbs: 6, fats: 18 } },
    { label: '4 Egg Bhurji + Veggies (No Bread)', macros: { calories: 290, protein: 25, carbs: 7, fats: 19 } },
  ],
  recovery_walk: [
    { label: '20 min walk completed', macros: { calories: 0, protein: 0, carbs: 0, fats: 0 } },
  ],
  recovery_stretch: [
    { label: 'Stretching / Foam rolling done', macros: { calories: 0, protein: 0, carbs: 0, fats: 0 } },
  ],
  lunch: [
    { label: '150g Chicken/Veg + Dal + 2 Roti + Salad', macros: { calories: 600, protein: 58, carbs: 55, fats: 18 } },
    { label: '150g Paneer + Dal + 2 Roti + Salad', macros: { calories: 620, protein: 48, carbs: 52, fats: 28 } },
    { label: '100g Soya Chunk Curry + Dal + 2 Roti', macros: { calories: 580, protein: 55, carbs: 65, fats: 10 } },
    { label: '1 Bowl Chole + Greek Yogurt + 2 Roti', macros: { calories: 530, protein: 35, carbs: 70, fats: 12 } },
  ],
  snack: [
    { label: '100g Paneer cubes (sautéed)', macros: { calories: 321, protein: 21, carbs: 3, fats: 25 } },
    { label: 'Sprouted Moong', macros: { calories: 100, protein: 8, carbs: 15, fats: 1 } },
  ],
  dinner: [
    { label: '150g Grilled Fish + Veggies / Large Salad', macros: { calories: 255, protein: 43, carbs: 10, fats: 4 } },
    { label: '150g Grilled Chicken + Large Salad', macros: { calories: 308, protein: 49, carbs: 10, fats: 6 } },
    { label: '200g Tofu Stir-Fry + Veggies', macros: { calories: 350, protein: 36, carbs: 15, fats: 18 } },
    { label: '150g Paneer Tikka + Large Salad', macros: { calories: 380, protein: 30, carbs: 8, fats: 26 } },
    { label: '100g Soya Keema stir-fry + Veggies', macros: { calories: 350, protein: 50, carbs: 25, fats: 8 } },
  ],
  sleep: [],
};
