'use client';
import { useGemini } from '@/app/hooks/useGemini';

export default function Home() {
  const { textList: devAList, loading: loadingA } = useGemini(
    '안녕하세요! 오늘의 개발 주제는 무엇인가요?',
    'devA'
  );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="w-full max-w-xl bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Gemini 개발 커피챗 (AI 2명 역할별 시스템 프롬프트)
        </h1>
        <div className="h-96 overflow-y-auto border rounded p-4 bg-gray-100 mb-4">
          <div className="mb-3 flex justify-start">
            <div className="px-4 py-2 rounded-lg max-w-xs bg-blue-100 text-blue-900">
              <span className="block text-xs font-semibold mb-1">devA</span>
              <span>{devAList[0]}</span>
            </div>
          </div>
          <div className="mb-3 flex justify-end">
            <div className="px-4 py-2 rounded-lg max-w-xs bg-green-100 text-green-900">
              <span className="block text-xs font-semibold mb-1">devB</span>
            </div>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 w-full mb-2"
          disabled
        >
          AI 역할별 대화 예시
        </button>
      </div>
    </main>
  );
}
