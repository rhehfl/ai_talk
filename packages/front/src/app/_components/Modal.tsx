"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleBackgroundClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={handleBackgroundClick}
    >
      {children}
    </div>
  );
}
