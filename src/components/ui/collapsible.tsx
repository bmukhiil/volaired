"use client";

import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type CollapsibleProps = {
  open?: boolean;
  children: React.ReactNode;
  className?: string;
};

type CollapsibleHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

type CollapsibleBodyProps = {
  children: React.ReactNode;
  className?: string;
};

type CollapsibleContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CollapsibleContext = createContext<CollapsibleContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

const Collapsible = ({ open, children, className }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(open || false);

  return (
    <CollapsibleContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        className={cn(
          "border-dashed border p-4 flex flex-col gap-y-2",
          className,
        )}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
};

const CollapsibleHeader = ({ children, className }: CollapsibleHeaderProps) => {
  const { isOpen, setIsOpen } = useContext(CollapsibleContext);

  return (
    <motion.div
      className="flex items-center gap-x-2"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="hover:bg-background p-1 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fill-rule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <h2 className="font-semibold text-2xl">{children}</h2>
    </motion.div>
  );
};

const CollapsibleBody = ({ children, className }: CollapsibleBodyProps) => {
  const { isOpen } = useContext(CollapsibleContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          //   className="mx-10 flex flex-col gap-y-8"
          className={cn("mx-10 flex flex-col gap-y-8", className)}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
            opacity: { duration: 0.2 },
            height: { duration: 0.3 },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Collapsible, CollapsibleHeader, CollapsibleBody };
