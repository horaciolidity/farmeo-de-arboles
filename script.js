 let web3;
            let account;

            async function connectWallet() {
                if (window.ethereum) {
                    try {
                        await window.ethereum.request({ method: 'eth_requestAccounts' });
                        web3 = new Web3(window.ethereum);
                        const accounts = await web3.eth.getAccounts();
                        account = accounts[0];
                        document.getElementById('balance').innerText = 'Conectado: ' + account;
                        getBalance();
                    } catch (error) {
                        console.error("Error connecting to MetaMask:", error);
                    }
                } else {
                    alert('MetaMask no está instalado');
                }
            }

            async function getBalance() {
                const contractAddress = '0xYourContractAddress';
                const contractABI = [
                    // ABI del contrato
                ];

                const contract = new web3.eth.Contract(contractABI, contractAddress);
                const balance = await contract.methods.balanceOf(account).call();
                document.getElementById('balance').innerText = 'Saldo: ' + web3.utils.fromWei(balance, 'ether') + ' WAVE';
            }

            document.getElementById('connectButton').addEventListener('click', connectWallet);
