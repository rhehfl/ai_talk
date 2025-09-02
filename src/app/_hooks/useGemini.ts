<<<<<<<< HEAD:src/app/chat/hooks/useGemini.ts
import { fetchGemini } from '@/app/chat/lib';
========
import { fetchGemini } from '@/app/_lib';
>>>>>>>> e94ef3104e5e709c982fbe2b7d3cf8744577a29e:src/app/_hooks/useGemini.ts
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
