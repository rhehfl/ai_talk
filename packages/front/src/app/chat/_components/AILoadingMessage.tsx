import LoadingSpinner from "@/app/_icons/LoadingSpinner.";

export default function AILoadingMessage() {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner />
      <span>잠시만 기다려주세요....</span>
    </div>
  );
}
