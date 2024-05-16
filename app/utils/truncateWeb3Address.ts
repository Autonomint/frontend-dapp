function truncateWeb3WalletAddress(address: `0x${string}` | undefined): string {
  if(!address) return "";
  return `${address?.substring(2, 8)}...${address?.substring(
    address.length - 6
  )}`;
}
export default truncateWeb3WalletAddress;
