require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
  const rpcUrl = process.env.RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;

  if (!rpcUrl || !privateKey) {
    throw new Error("RPC_URL or PRIVATE_KEY is missing from .env");
  }

  // ✅ v6 style
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  // Read ABI + bytecode
  // If your .abi file is JSON, parse it. If it's already plain ABI text, remove JSON.parse.
  const abi = JSON.parse(fs.readFileSync("./note_sol_Note.abi", "utf8"));
  const bytecode = fs.readFileSync("./note_sol_Note.bin", "utf8").toString().trim();

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  console.log("Deploying contract...");
  const contract = await factory.deploy();          // send tx

  // ✅ v6 way to wait for deployment
  const tx = contract.deploymentTransaction();
  console.log("Deployment tx:", tx.hash);

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Contract deployed at address:", address);

  const curNote = await contract.getNote();
  console.log(`Current Note: ${curNote}`);
}

main()
  .then(() => {
    console.log("Deployment script finished.");
  })
  .catch((err) => {
    console.error("Deployment error:", err);
    process.exit(1);
  });
