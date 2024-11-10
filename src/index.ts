import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import "dotenv/config";

async function main() {
  var tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

  const signer = await InMemorySigner.fromSecretKey(process.env.SECRET);

  const pkh = await signer.publicKeyHash();
  const contract = await tezosToolkit.contract.at(
    "KT1JarALvhDLjtFhraeTMGGoeNLUkuL6jGtM"
  );

  tezosToolkit.setProvider({ signer });

  // const op = await tezosToolkit.contract.transfer({
  //   to: "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
  //   amount: 1,
  // });
  const op = await contract.methodsObject
    .mint_artist({
      collection_id: 71947,
      editions: 1,
      metadata_cid:
        "697066733a2f2f516d52325672336775713467594d45366268676b47474a34714656647652786867766e47516d7a6672346d364635",
      target: "tz2DZLWLuDRKUuR4BrWetimZ1C6Pg6pPAo3n",
    })
    .send();
  await op.confirmation();

  console.log(op.hash);
}

main().catch(console.error);
