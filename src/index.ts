import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import "dotenv/config";

async function main() {
  console.log("ENV", process.env.SECRET);
  var tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

  const signer = await InMemorySigner.fromSecretKey(process.env.SECRET);

  const pkh = await signer.publicKeyHash();
  console.log(pkh);

  tezosToolkit.setProvider({ signer });

  const op = await tezosToolkit.contract.transfer({
    to: "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
    amount: 1,
  });
  await op.confirmation();

  console.log(op.hash);
}

main().catch(console.error);
