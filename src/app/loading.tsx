import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-screen h-[90vh] flex justify-center items-center">
      <Loader2 className="text-indigo-500 animate-spin w-8 h-8" />
    </div>
  );
}
