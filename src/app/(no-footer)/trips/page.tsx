import { Sidebar } from "@/components/layout/sidebar";

export default function TripsPage() {
  return (
    <div className="h-screen -mx-6 -my-6 flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4"></div>
    </div>
  );
}
