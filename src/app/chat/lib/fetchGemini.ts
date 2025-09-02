import { RoleKey } from '@/app/types';

interface FetchGemini {
  prompt: string;
  role: RoleKey;
}

export const fetchGemini = async ({
  prompt,
  role,
}: FetchGemini): Promise<string> => {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, role }),
  });
  const data = await res.json();
  return data.text;
};
