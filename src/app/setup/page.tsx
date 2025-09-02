import Topics from '@/app/setup/_components/Topics';

export default function SetupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">CoffeeChat ☕</h1>
        <p className="text-center text-gray-500 mb-6">
          오늘 어떤 주제로 이야기할까요?
        </p>
        <Topics />
        <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-md">
          채팅 시작하기
        </button>
      </div>
    </div>
  );
}
