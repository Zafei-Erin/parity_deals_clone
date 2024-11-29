import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddToSiteProductModalContent } from "./AddToSiteProductModalContent";
import { DeleteProductAlertDialogContent } from "./DeleteProductAlertDialogContent";

export const ProductGrid = ({
  products,
}: {
  products: {
    id: string;
    name: string;
    clerkUserId: string;
    url: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export const ProductCard = ({
  id,
  name,
  clerkUserId,
  url,
  description,
  createdAt,
  updatedAt,
}: {
  id: string;
  name: string;
  clerkUserId: string;
  url: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-end gap-2 justify-between">
          <CardTitle>
            <Link href={`/dashboard/products/${id}/edit`}>{name}</Link>
          </CardTitle>

          <Dialog>
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="size-8 p-0" variant="outline">
                    <div className="sr-only">Action Menu</div>
                    <DotsHorizontalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/products/${id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>Add To Site</DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />

                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <DeleteProductAlertDialogContent id={id} />
            </AlertDialog>

            <AddToSiteProductModalContent id={id} />
          </Dialog>
        </div>
        <CardDescription>{url}</CardDescription>
      </CardHeader>

      {description && <CardContent>{description}</CardContent>}
    </Card>
  );
};
