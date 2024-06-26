//Para o produtor rural, 
// cujo gestão da propriedade rural é precária e analógica. 
// O SELVA
// é uma plataforma digital 
// que promove a gestão digital e comercial da produção rural,
// diferentemente da ONISAFRA. 
// O nosso produto torna os dados dos ativos amazônicos imutáveis, perenes, auditáveis e rastreáveis. 


pragma solidity ^0.5.11;

// Contrato Conta SELVA
contract  ContratoContaSELVA {
    
    // Estrutura com dados do cliente
    struct produtor {
        string nome; // Nome usuário
        string produtoRural; // Nome do produto que vende
        string local; // Endereço de Coleta
        uint CPF;
        uint valor; //valor do produto que vende
        uint saldo;     // Saldo correntista
        uint criacao;   // UNIX Timestamp criação da conta
        uint ultima;    // UNIX Timestamp última movimentação da conta
        bool status;    // Status da conta (true = ativo e false = inativo)
    
        
    }

    // Armazena dados dos clientes    
    mapping (address => produtor) produtores;

    // Eventos para controlar o que está acontencendo
    event aplicou(string nome, uint saldo);
    event resgatou(string nome, uint saldo);
    event transferiu(string remetente, string destinatario, uint valor);

    modifier ativo(address conta) {
        require(produtores[conta].status, "Conta não existe ou está inativa.");
        _;
    }

    // Função que permite criar uma conta se não existe conta com saldo
    function criar(string memory nome) public {
        require(produtores[msg.sender].saldo == 0, "Conta já se encontra em uso.");
        produtores[msg.sender].nome = nome;
        produtores[msg.sender].criacao = now; 
        produtores[msg.sender].ultima = produtores[msg.sender].criacao;
        produtores[msg.sender].status = true;
        produtores[msg.sender].saldo = 0;
    }
    
    // Função que permite aplicar na conta
    function aplicar() payable ativo(msg.sender) public{
        produtores[msg.sender].saldo += msg.value;
        emit aplicou(produtores[msg.sender].nome, produtores[msg.sender].saldo);
        produtores[msg.sender].ultima = now;
    }

    // Função que permite resgatar da conta
    function resgatar(uint valor) ativo(msg.sender) public returns(uint saldo) {
        require(valor <= produtores[msg.sender].saldo, "Saldo insuficiente!");
        produtores[msg.sender].saldo -= valor;
        msg.sender.transfer(valor);
        emit resgatou(produtores[msg.sender].nome, produtores[msg.sender].saldo);
        produtores[msg.sender].ultima = now;
        return produtores[msg.sender].saldo;
    }
    
    // Função que transfere da conta do solicitante para outra indicada
    function transferir(address destinatario, uint valor) 
        ativo(msg.sender) ativo(destinatario) public {
        require(valor <= produtores[msg.sender].saldo, "Saldo insuficiente!");
        produtores[msg.sender].saldo -= valor;
        produtores[destinatario].saldo += valor;
        emit transferiu(produtores[msg.sender].nome, 
                        produtores[destinatario].nome,
                        valor);
    }

    // Função que consulta o saldo da conta
    function consultarMeuSaldo() view public returns(uint saldo) {
        return produtores[msg.sender].saldo;
    }
    
    // Função que consulta dados da conta
    function consultarProdutor(address conta) ativo(conta) view public 
            returns(string memory, uint, uint, bool, uint) {
        return (
            produtores[conta].nome,
            produtores[conta].criacao,
            produtores[conta].ultima,
            produtores[conta].status,
            produtores[conta].saldo
        );
    }
    
}
