"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonProps {
  targetPath?: string;
  label?: string;
}

export default function BackButton({
  targetPath,
  label = "뒤로가기",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (targetPath) {
      router.push(targetPath);
    } else {
      router.back();
    }
  };

  return (
    <div className="bg-blue-100 rounded-xl px-5 py-3 inline-block cursor-pointer hover:bg-blue-200 transition">
      <button
        onClick={handleBack}
        className="flex cursor-pointer"
        aria-label={label}
        role="button "
      >
        <FaArrowLeft className="w-6 h-6 mr-2" aria-hidden="true" />
        <span>{label}</span>
      </button>
    </div>
  );
}
