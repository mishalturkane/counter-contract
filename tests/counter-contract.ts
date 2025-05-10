import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterContract } from "../target/types/counter_contract";
import { expect } from "chai";
describe("counter-contract", () => {
  // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
   anchor.setProvider(provider);

  const program = anchor.workspace.counterContract as Program<CounterContract>;

   const [counterPda, _bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter"), provider.publicKey.toBuffer()],
    program.programId
  );

 
  it("Is initialized! ✅", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({ user:provider.wallet.publicKey,counter: counterPda })
     
      .rpc();
   
    const account = await program.account.counter.fetch(counterPda);
    expect(account.count.toNumber()).to.equal(0);

    console.log("\nYour transaction signature", tx);
    console.log("\nCounter is",account.count);


  });

  it("Incremented the count ✅", async () => {
    const tx = await program.methods
      .increment()
      .accounts({ counter: counterPda, user: provider.wallet.publicKey })
      .rpc();
   
    const account = await program.account.counter.fetch(counterPda);
    expect(account.count.toNumber()).to.equal(1);
  
    console.log("\nYour transaction signature", tx);
    console.log("\nCounter is",account.count);


  });

  it("Decrement the count ✅", async () => {
    const tx = await program.methods
      .decrement()
      .accounts({ counter: counterPda, user: provider.wallet.publicKey })
      .rpc();
   
    const account = await program.account.counter.fetch(counterPda);
    expect(account.count.toNumber()).to.equal(0);
    console.log("\nYour transaction signature", tx);
    console.log("\nCounter is",account.count);
    

  });

  
});
