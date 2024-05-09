import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Blog() {
  return (
    <div className="px-6">
      <div className="py-8 flex flex-col gap-y-4">
        <div className="p-4 border-border border shadow-sm border-dashed rounded-lg bg-zinc-100">
          IMAGE GOES HERE
        </div>
        <div>
          <h2 className="text-2xl font-medium tracking-tight">
            Announcing the launch of Volaired
          </h2>
          <span className="text-muted-foreground text-sm font-medium">
            May 20, 2024
          </span>
          <p className="text-muted-foreground pt-4">
            We are excited to announce the release of Volaired.
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1612832380301-1d4c7b0f8c0e?auto=format&fit=crop&w=800&q=60"
              alt="Avatar of the author"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-sm tracking-tight">Juan Deez</span>
        </div>
      </div>
      <Separator className="-mx-6 w-screen" />
    </div>
  );
}
