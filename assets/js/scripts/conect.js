export function conectar () {
    //momento de conexão com a rede 
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }

    //verifica se alguma carteira digital está conectada     
    web3.eth.getAccounts(function(err, accounts) {
        if (err) {
            console.log("Erro ao acessar contas:", err);
        } else if (accounts.length === 0) {
            // Caso não encontre carteiras
            console.log('MetaMask está bloqueado ou não há conta conectada');
        } else {
            // Conecta a conta de posição "0"
            web3.eth.defaultAccount = accounts[0];
            console.log("Conta conectada");
            window.sessionStorage.setItem("account", web3.eth.defaultAccount);
        }
    });
}