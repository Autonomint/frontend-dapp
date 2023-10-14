function truncateWeb3WalletAddress(address: string): string {
  if (address.length < 8) {
    return address;
  }

  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4
  )}`;
}
export default truncateWeb3WalletAddress;
