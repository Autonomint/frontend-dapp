import { useMutation, useQueryClient } from "@tanstack/react-query";

type withdrawData = {
  address: `0x${string}` | undefined;
  index: number;
  chainId:number;
  borrowDebt: string;
  withdrawTime: string;
  withdrawAmount: string;
  amountYetToWithdraw: string;
  noOfAbond: string;
};
async function withdrawFromBackend(data: withdrawData) {
  let bodyValue = JSON.stringify({
    ...data,
  });
  console.log(bodyValue);
  const response = await fetch("http://43.204.73.16:3000/borrows/withdraw", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: bodyValue,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export const useWithdrawFromBackend = () => {
  const queryClient = useQueryClient();

  return useMutation<withdrawData, Error, withdrawData>(withdrawFromBackend, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["depositorsData"] });
      queryClient.invalidateQueries({ queryKey: ["deposits"] });
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });
};
