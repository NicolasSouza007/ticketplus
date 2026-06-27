"use client";

import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export function Buttonrefresh() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.refresh()}
      className="bg-blue-500 px-4 py-1 rounde "
    >
      <FiRefreshCcw size={24} color="#fff" />
    </button>
  );
}
