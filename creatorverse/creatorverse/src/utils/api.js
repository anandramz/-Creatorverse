const API_BASE_URL = 'https://ltkchdomhtlfmehyuxhq.supabase.co/rest/v1';
const API_KEY = 'sb_publishable_2Z1Z78eYPoHaOHy6-4rr2g_3zU8Q8pg';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'apikey': API_KEY,
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
};

export const getCreatorsEndpoint = () => `${API_BASE_URL}/creators`;
export const getCreatorEndpoint = (name) => `${API_BASE_URL}/creators?name=eq.${encodeURIComponent(name)}`;
