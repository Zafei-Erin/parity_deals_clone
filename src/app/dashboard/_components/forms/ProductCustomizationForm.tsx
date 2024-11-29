"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productCustomizationSchema } from "@/schemas/products";
import { RequiredLabelIcon } from "../../../../components/RequiredLabelIcon";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Banner } from "@/components/Banner";
import { updateProductCustomization } from "@/server/actions/products";
import { useToast } from "@/hooks/use-toast";
import { NoPermissionCard } from "../NoPermissionCard";
type Props = {
  canRemoveBranding: boolean;
  canCustomizeBanner: boolean;
  customization: {
    productId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    classPrefix: string | null;
    locationMessage: string;
    backgroundColor: string;
    textColor: string;
    fontSize: string;
    bannerContainer: string;
    isSticky: boolean;
  };
};

export const ProductCustomizationForm: React.FC<Props> = ({
  canCustomizeBanner,
  canRemoveBranding,
  customization,
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof productCustomizationSchema>>({
    resolver: zodResolver(productCustomizationSchema),
    defaultValues: {
      ...customization,
      classPrefix: customization.classPrefix ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof productCustomizationSchema>) {
    const data = await updateProductCustomization(
      customization.productId,
      values
    );

    if (data.message) {
      toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default",
      });
    }
  }

  const formValues = form.watch();
  return (
    <>
      <div>
        <Banner
          message={formValues.locationMessage}
          mappings={{ country: "India", coupon: "III", discount: "50" }}
          customization={formValues}
          canRemoveBranding={canRemoveBranding}
        />
      </div>

      {!canCustomizeBanner && (
        <div className="mt-8">
          <NoPermissionCard />
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-6 flex-col mt-8"
        >
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="locationMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    PPP Discount Message
                    <RequiredLabelIcon />
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      disabled={!canCustomizeBanner}
                      className="min-h-20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {"Data Parameters: {country}, {coupon}, {discount}"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Background Color
                      <RequiredLabelIcon />
                    </FormLabel>

                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Text Color
                      <RequiredLabelIcon />
                    </FormLabel>

                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Font Size
                      <RequiredLabelIcon />
                    </FormLabel>

                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSticky"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sticky?</FormLabel>

                    <FormControl>
                      <Switch
                        className="block"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!canCustomizeBanner}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bannerContainer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Banner Container
                      <RequiredLabelIcon />
                    </FormLabel>

                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormDescription>
                      HTML container selector where you want to place the
                      banner. Ex: #container, .container, body
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classPrefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CSS Prefix</FormLabel>

                    <FormControl>
                      <Input disabled={!canCustomizeBanner} {...field} />
                    </FormControl>
                    <FormDescription>
                      An optional prefix added to all CSS classes to avoid
                      conflicts
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {canCustomizeBanner && (
            <div className="self-end">
              <Button disabled={form.formState.isSubmitting} type="submit">
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};
