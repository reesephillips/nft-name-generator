import { useEffect, useState } from "react";
import {
  connectWallet,
  mintNFT,
} from "./util/interact.js";


const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("")
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    getCurrentWalletConnected()
  }, [])
  

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          setWallet(addressArray[0])
        } else {
          setWallet("")
        }
      } catch (err) {
        console.log(err.message)
      }
    } else {
      console.log("You must install metamask")
    }
  };
  

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    setShowAnimation(true)
    const { status } = await mintNFT();
    setShowAnimation(false)
    setStatus(status)
  };

  return (
    <div className="Minter">
      {
        showAnimation ? (
          <div className={`animation ${showAnimation ? "visible" : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)" }}>
              <p>Minting...</p>
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
            </div>
          </div>
        ) : null
      }
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">Generate a random phrase on-chain</h1>
      <p>
        Connect your wallet and press mint to generate a fully on-chain NFT
      </p>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p>{status}</p>
      <footer>Built with buildspace @buildspace</footer>
    </div>
  );
};

export default Minter;
