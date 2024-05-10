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
      "shadow-inner border-dashed border rounded-lg p-6 bg-secondary",
      className,
    )}
  >
    {children}
  </div>
);

const CustomSecondaryBackgroundCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "bg-background p-4 rounded-lg shadow border border-border",
      className,
    )}
  >
    {children}
  </div>
);

export { CustomDashedCard, CustomSecondaryBackgroundCard };
