import { ethers } from "ethers";
import Web3Modal from "web3modal";

export async function ethConnect() {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const erc20 = "0x4eCbbb31f25b5CE1500A69e6E48bd93927145000";
  const lottery = "0xA2090Bccdd80Edf0eF9d7651A3324ec3Cba1eA46";
  return { signer, erc20, lottery };
}
