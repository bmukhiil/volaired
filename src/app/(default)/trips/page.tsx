import { Sidebar } from "@/components/layout/sidebar";
import { Skeleton } from "@/components/ui/skeleton"


export default function TripsPage() {
  return (
    <div className="h-screen bg-gray-100">
      <Sidebar />
      <div className="flex h-screen justify-center">
        <div className="bg-white p-7 rounded-lg w-11/12 h-5/6 shadow-md ">
          <h3 className="text-3xl font-semibold"> 
          Trip Plans 
          </h3>
          <div className="flex h-screen p-3 space-x-7">
          <Skeleton className=" h-4/6 flex-1 max-w-96 bg-gray-100 border border-gray-200"/>
          <Skeleton className=" h-4/6 flex-1 max-w-96 bg-gray-100 border border-gray-200"/>
          </div>
        </div>
      </div>
    </div>
  );
}
