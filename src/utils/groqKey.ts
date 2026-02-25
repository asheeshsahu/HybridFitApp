import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROQ_API_KEY } from '../config/nutrition';

const STORAGE_KEY = 'groq_api_key';

/** Get effective API key: env first, then AsyncStorage */
export async function getGroqApiKey(): Promise<string> {
  if (GROQ_API_KEY) return GROQ_API_KEY;
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  return saved ?? '';
}

/** Save API key to AsyncStorage (for when .env is not used) */
export async function setGroqApiKey(key: string): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, key.trim());
}
