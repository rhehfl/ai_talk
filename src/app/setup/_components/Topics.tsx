'use client';

import { TOPICS_EXAMPLES } from '@/app/setup/constants';

export default function Topics() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {TOPICS_EXAMPLES.map((topic) => (
        <button
          key={topic.id}
          className="cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-purple-50 dark:hover:bg-zinc-800 transition"
        >
          <span className="text-2xl mb-2">{topic.emoji}</span>
          <span className="text-sm font-medium">{topic.label}</span>
        </button>
      ))}
    </div>
  );
}
