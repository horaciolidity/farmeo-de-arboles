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

                        document.getElementById('buy-wave').addEventListener('click', () => {
                            console.log('Botón de Comprar WAVE presionado');
                            // Aquí puedes agregar la lógica adicional que desees ejecutar cuando se presione el botón
                        });

                    } catch (error) {
                        console.error("Error connecting to MetaMask:", error);
                    }
                } else {
                    alert('MetaMask no está instalado. Por favor, instálalo para usar esta aplicación.');
                }
            });
        });
