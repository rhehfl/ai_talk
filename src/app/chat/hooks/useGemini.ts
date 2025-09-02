import { fetchGemini } from '@/app/chat/lib';
import { useEffect, useState } from 'react';

export function useGemini(prompt: string, role: 'devA' | 'devB') {
  const [textList, setTextList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGeminiResponse = async () => {
      try {
        setLoading(true);
        const response = await fetchGemini({ prompt, role });
        setTextList((prev) => [...prev, response]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getGeminiResponse();
  }, [prompt, role]);

  return { prompt, loading, error, textList };
}
