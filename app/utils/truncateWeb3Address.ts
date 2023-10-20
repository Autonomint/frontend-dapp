function truncateWeb3WalletAddress(address: `0x${string}` | undefined): string {
  if(!address) return "";
  return `${address?.substring(0, 4)}...${address?.substring(
    address.length - 4
  )}`;
}
export default truncateWeb3WalletAddress;
