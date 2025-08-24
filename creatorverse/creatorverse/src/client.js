import { createClient } from '@supabase/supabase-js';

const URL = 'https://ltkchdomhtlfmehyuxhq.supabase.co';
const API_KEY = 'sb_publishable_2Z1Z78eYPoHaOHy6-4rr2g_3zU8Q8pg';

export const supabase = createClient(URL, API_KEY);

