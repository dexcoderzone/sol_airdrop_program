const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");


   //Generates a new wallet keypair
   const newPair = new Keypair(); // holds the public key and the secret key
   console.log(newPair);

   //Stores the public and private key
   const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
   const secretKey = newPair._keypair.secretKey;

   //Get the wallet Balance
   const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");//connection for devnet
        const myWallet = await Keypair.fromSecretKey(secretKey);// create a wallet object from the secretKey

        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);// converting to SOL from LAMPORTS
    } catch (err) {
        console.log(err);
    }
};

    //Air dropping SOL
    const airDropSol = async () => {
        try {
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            const walletKeyPair = await Keypair.fromSecretKey(secretKey);
            console.log(`-- Airdropping 2 SOL --`);
            const fromAirDropSignature = await connection.requestAirdrop(
                new PublicKey(walletKeyPair.publicKey),
                2 * LAMPORTS_PER_SOL
            );
            await connection.confirmTransaction(fromAirDropSignature);
        } catch (err) {
            console.log(err);
        }
    };

    //STEP-5 Driver function
    const driverFunction = async () => {
        await getWalletBalance();
        await airDropSol();
        await getWalletBalance();
    }

    driverFunction();
