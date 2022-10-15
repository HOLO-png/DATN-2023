import { ethers } from "ethers";
import { openNotification } from "../utils/common";

export const provider = () => {
  if (typeof window !== "undefined") {
    if (window.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    } else {
      openNotification("Error", "Please Install Metamask!");
      return null;
    }
  }
};
