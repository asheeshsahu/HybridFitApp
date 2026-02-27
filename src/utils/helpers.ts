export const getReminderColor = (id: string): string => {
  switch (id) {
    case 'preworkout': return '#f59e0b';
    case 'workout': return '#7c3aed';
    case 'postworkout': return '#22c55e';
    case 'shake': return '#06b6d4';
    case 'lunch': return '#f97316';
    case 'snack': return '#eab308';
    case 'dinner': return '#ef4444';
    case 'sleep': return '#6366f1';
    case 'recovery_walk': return '#64748b';
    case 'recovery_stretch': return '#8b5cf6';
    case 'breakfast': return '#f59e0b';
    case 'breakfast_rest': return '#f59e0b';
    case 'preworkout_eve': return '#f59e0b';
    case 'workout_eve': return '#7c3aed';
    case 'postworkout_eve': return '#22c55e';
    case 'dinner_eve': return '#ef4444';
    case 'sleep_eve': return '#6366f1';
    default: return '#7c3aed';
  }
};

export const getNotificationBody = (id: string): string => {
  switch (id) {
    case 'preworkout': return '1 Banana + 2-3 Dates + Black Coffee ☕';
    case 'workout': return 'Time to train! Hydrate with 500ml-1L water during session 💪';
    case 'postworkout': return '5-6 Boiled Egg Whites - immediate protein hit! 🥚';
    case 'shake': return 'Upgraded Muscle Shake: 350ml Milk, 3/4 Cup Muesli, 2 tbsp PB, 1 XL Banana! 🥤';
    case 'lunch': return '200g Chicken Curry + 3 Rotis + Dal + Dahi + Salad 🍗';
    case 'snack': return '100g Paneer cubes or Sprouted Moong! 🧀';
    case 'dinner': return '150g Grilled Fish + 1 Roti + Mixed Sabzi 🐟';
    case 'sleep': return 'Wind down for quality sleep - in bed by 10:30 PM! 😴';
    case 'breakfast': return '4 Eggs (Bhurji/Omelet) + 3 Brown Bread + Dahi 🍳';
    case 'breakfast_rest': return '4 Eggs + 3 Toast (Morning) or 4 Eggs + 2 Toast (Evening rest) 🍳';
    case 'preworkout_eve': return '1 Banana + 2-3 Dates + Black Coffee ☕';
    case 'workout_eve': return 'Evening training! Hydrate with 1L water during session 💪';
    case 'postworkout_eve': return '5-6 Boiled Egg Whites - rapid protein! 🥚';
    case 'dinner_eve': return 'Recovery Feast: Fish/Chicken + Veggies + Upgraded Muscle Shake! 🍽️';
    case 'sleep_eve': return 'Wind down - in bed by 11:00 PM! 😴';
    default: return 'HybridFit Reminder';
  }
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};
