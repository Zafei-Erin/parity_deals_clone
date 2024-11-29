import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";
import { CaretLeftIcon } from "@radix-ui/react-icons";

type Props = {
  backButtonHref: string;
  pageTitle: string;
  children: ReactNode;
};

export const PageWithBackButton: React.FC<Props> = ({
  backButtonHref,
  pageTitle,
  children,
}) => {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-8">
      <Button size="icon" variant="outline" asChild className="rounded-full">
        <Link href={backButtonHref}>
          <div className="sr-only">Back</div>
          <CaretLeftIcon className="size-8" />
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold self-center">{pageTitle}</h1>
      <div className="col-start-2">{children}</div>
    </div>
  );
};
