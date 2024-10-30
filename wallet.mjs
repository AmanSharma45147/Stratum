import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

// My NEAR Wallet for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const myNearWallet = setupMyNearWallet({
  walletUrl: "https://testnet.mynearwallet.com",
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [myNearWallet],
});
