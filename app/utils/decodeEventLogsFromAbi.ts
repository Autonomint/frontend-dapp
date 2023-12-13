import { decodeEventLog } from "viem";

interface EventLogs {
  eventName: string;
  args: unknown;
}

export default function decodeEventLogsFromAbi(
  contractAbi: any,
  topics: [] | [`0x${string}`, ...`0x${string}`[]],
  eventNameToFilter: string,
  data?: `0x${string}`,
): EventLogs {
  try {
    const { eventName, args } = decodeEventLog({
      abi: contractAbi,
      topics: topics,
      eventName: eventNameToFilter,
      data:data,
    });
    return { eventName, args };
  } catch (error) {
    console.log(error);
  }
  return { eventName: "", args: {} };
}
