import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterContract } from "../target/types/counter_contract";
import { expect } from "chai";
describe("counter-contract", () => {
  // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.counterContract as Program<CounterContract>;
  const counter = anchor.web3.Keypair.generate();
  it("Is initialized! ✅", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({ counter: counter.publicKey })
      .signers([counter])
      .rpc();
   
    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(0);

    console.log("\nYour transaction signature", tx);
    console.log("\nCounter is",account.count);


  });

  it("Incremented the count ✅", async () => {
    const tx = await program.methods
      .increment()
      .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey })
      .rpc();
   
    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(1);
  
    console.log("\nYour transaction signature", tx);
    console.log("\nCounter is",account.count);


  });

  it("Decrement the count ✅", async () => {
    const tx = await program.methods
      .decrement()
      .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey })
      .rpc();
   
    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(0);
    console.log("\nYour transaction signature", tx);
    console.log("\nCounter is",account.count);
    

  });

  
});
