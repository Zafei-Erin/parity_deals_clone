import { db } from "@/drizzle/db";
import { ProductTable, UserSubscriptionTable } from "@/drizzle/schema";
import { CACHE_TAGS, revalidateDbCache } from "@/lib/cache";
import { eq } from "drizzle-orm";

export async function deleteUser(clerkUserId: string) {
  // roll back if any of these is failed
  // other table will be cascadely deleted as well, as defined in schema
  const [userSubscriptions, products] = await db.batch([
    db
      .delete(UserSubscriptionTable)
      .where(eq(UserSubscriptionTable.clerkUserId, clerkUserId))
      .returning({ id: UserSubscriptionTable.id }),
    db
      .delete(ProductTable)
      .where(eq(ProductTable.clerkUserId, clerkUserId))
      .returning({ id: ProductTable.id }),
  ]);

  userSubscriptions.forEach((sub) =>
    revalidateDbCache({
      tag: CACHE_TAGS.subscription,
      id: sub.id,
      userId: clerkUserId,
    })
  );

  products.forEach((product) =>
    revalidateDbCache({
      tag: CACHE_TAGS.products,
      userId: clerkUserId,
      id: product.id,
    })
  );

  return [userSubscriptions, products];
}
