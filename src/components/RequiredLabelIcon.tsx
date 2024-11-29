import { ComponentPropsWithoutRef } from "react";
import { AsteriskIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const RequiredLabelIcon = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AsteriskIcon>) => {
  return (
    <AsteriskIcon
      {...props}
      className={cn("text-destructive inline size-3 align-top", className)}
    />
  );
};
