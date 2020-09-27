export const getVaultWithAlias = vault => {
  const vaultSymbolAliases = {
    '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c': 'yUSD',
  };
  const symbolAlias = vaultSymbolAliases[vault.address];
  const newVault = vault;
  if (symbolAlias) {
    newVault.symbol = symbolAlias;
  }
  return newVault;
};
