"use client";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomToast from "@/components/CustomUI/CustomToast";
import { toast } from "sonner";
export default function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 1000,
          
          },
          mutations:{
            onError(error) {
              toast.custom(
                (t) => {
                  return (
                    <div>
                      <CustomToast
                        key={2}
                        props={{
                          t,
                          toastMainColor: "#B43939",
                          headline: `Uhh Ohh! ${error.name}`,
                          toastClosebuttonHoverColor: "#e66d6d",
                          toastClosebuttonColor: "#C25757",
                        }}
                      />
                    </div>
                  );
                },
                { duration: 5000 }
              );
            },
          }
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
