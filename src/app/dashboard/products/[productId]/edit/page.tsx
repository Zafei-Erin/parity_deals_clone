import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { CountryDiscountsForm } from "@/app/dashboard/_components/forms/CountryDiscountsForm";
import { ProductDetailsForm } from "@/app/dashboard/_components/forms/ProductDetailsForm";
import { PageWithBackButton } from "@/app/dashboard/_components/PageWithBackButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getProduct,
  getProductCountryGroups,
  getProductCustomization,
} from "@/server/db/products";
import { canRemoveBranding, canCustomizeBanner } from "@/server/permissions";
import { ProductCustomizationForm } from "@/app/dashboard/_components/forms/ProductCustomizationForm";

export default async function EditProductPage({
  params: { productId },
  searchParams: { tab = "details" },
}: {
  params: { productId: string };
  searchParams: { tab?: string | undefined };
}) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const product = await getProduct({ id: productId, userId });
  if (!product) return notFound();

  return (
    <PageWithBackButton
      backButtonHref="/dashboard/products"
      pageTitle="Edit Product"
    >
      <Tabs defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="country">Country</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <DetailsTab product={product} />
        </TabsContent>
        <TabsContent value="country">
          <CountryTab productId={product.id} userId={product.clerkUserId} />
        </TabsContent>
        <TabsContent value="customization">
          <CustomizationsTab
            productId={product.id}
            userId={product.clerkUserId}
          />
        </TabsContent>
      </Tabs>
    </PageWithBackButton>
  );
}

function DetailsTab({
  product,
}: {
  product: {
    id: string;
    name: string;
    description: string | null;
    url: string;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductDetailsForm product={product} />
      </CardContent>
    </Card>
  );
}

async function CountryTab({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const countryGroup = await getProductCountryGroups({ productId, userId });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Country Discounts</CardTitle>
        <CardDescription>
          Leave this discount field blank if you do not want to display deals
          for any specific parity group.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CountryDiscountsForm
          productId={productId}
          countryGroups={countryGroup}
        />
      </CardContent>
    </Card>
  );
}

async function CustomizationsTab({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const customization = await getProductCustomization({ productId, userId });

  if (!customization) return notFound();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Banner Customization</CardTitle>
      </CardHeader>

      <CardContent>
        <ProductCustomizationForm
          canRemoveBranding={await canRemoveBranding(userId)}
          canCustomizeBanner={await canCustomizeBanner(userId)}
          customization={customization}
        />
      </CardContent>
    </Card>
  );
}
