import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export { type AuthTokenResponse, type AuthError, type Session } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vqssitxitgwrcisoulgk.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxc3NpdHhpdGd3cmNpc291bGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNDA0NzUsImV4cCI6MjAyOTgxNjQ3NX0.44fQ4I8Pz4CVwKH_FLgcOFZkCMLH8Dbtbc_R7u9iAD0';

export const client = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    detectSessionInUrl: false,
    storage: AsyncStorage,
  },
});
