import { cn } from "@/lib/utils";

const CustomDashedCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "shadow-sm border-dashed border rounded-lg p-4 bg-secondary",
      className
    )}
  >
    {children}
  </div>
);

export { CustomDashedCard };
