export async function fetchAddressTransfers(address) {
  try {
    const response = await alchemy.transfers.getTransfers({
      fromBlock: "0x0",
      toBlock: "latest",
      category: ["external", "erc20"],
      excludeZeroValue: false, // include everything for testnet
    });

    // Filter locally for transfers involving the address
    const arr = response.transfers.filter(
      t => t.from?.toLowerCase() === address.toLowerCase() || t.to?.toLowerCase() === address.toLowerCase()
    );

    return arr;
  } catch (e) {
    console.error("Failed to fetch transfers:", e);
    return [];
  }
}
