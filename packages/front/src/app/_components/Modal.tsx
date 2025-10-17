// components/Modal.tsx (use client)

"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCallback } from "react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
}

export default function Modal({ children, title }: ModalProps) {
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

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants: Variants = {
    hidden: {
      y: "-100vh", // 위에서 아래로 내려오는 효과
      opacity: 0,
    },
    visible: {
      y: "0", // 최종 위치
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring", // 스프링 애니메이션
        damping: 25, // 튀는 정도
        stiffness: 500, // 강성
      },
    },
    exit: {
      y: "100vh", // 아래로 사라지는 효과
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    // AnimatePresence를 사용하여 컴포넌트가 마운트/언마운트될 때 애니메이션 적용
    <AnimatePresence
      mode="wait" // 하나가 사라진 후에 다른 것이 나타나도록 대기
      onExitComplete={() => {
        /* 필요한 경우, 모달이 완전히 닫힌 후 처리할 로직 */
      }}
    >
      {/* 배경 오버레이 */}
      {/* initial: 시작 상태, animate: 최종 상태, exit: 사라질 때 상태 */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        onClick={handleBackgroundClick} // 배경 클릭 시 닫기
        initial="hidden"
        animate="visible"
        exit="hidden" // 사라질 때 backdropVariants의 hidden 상태로
        variants={backdropVariants}
        aria-modal="true" // 접근성을 위해 추가
        role="dialog"
      >
        {/* 모달 창 */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl cursor-default relative"
          variants={modalVariants} // 모달 창에 애니메이션 Variants 적용
          onClick={(e) => e.stopPropagation()} // 모달 창 클릭 시 배경 클릭 이벤트 방지
        >
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-3xl leading-none"
            aria-label="모달 닫기"
          >
            &times;
          </button>
          <div className="max-h-[70vh] overflow-y-auto pr-2">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
