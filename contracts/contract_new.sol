// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountSELVA {

    address public owner;

    // CONSTRUCTOR inicializando ao fazer deploy do contrato
    constructor() {
        owner = msg.sender;
    }

    // CONDICIONAL = MODIFICADOR 
    modifier onlyOwner {
        require(msg.sender == owner, "Acesso negado: Somente o proprietario pode realizar esta acao.");
        _;
    }

    // Usuário
    struct User {
        string idAddress; // User ID Address
        string name; // UserName
        string numberPhone; // User Number Phone
        string cpf; // User CPF
        string coordinates; // User's Delivery Address
        uint256 createDate; // Account Creation Date
        bool statusAccount; // Account Status (true = Active and false = Inactive)
    }

    // Produtor
    struct Productor {
        string idAddressUser;
        string nameCompany;
        string cnpj;
        string cooperative;
        string product;
        uint256 valueProduct;
        uint256 stock;
        string unitMeasurement;
    }

    // EVENTOS
    event nUser (
        string name,
        string numberPhone,
        string cpf,
        string coordinates
    );

    event nProductor (
        string product,
        string cooperative
    );

    mapping(string => User) private userMapping;
    mapping(string => Productor) private productorMapping;

    // Função Registrar Usuário
    function registerUser(string memory _name, string memory _numberPhone, string memory _cpf, string memory _coordinates, string memory _idAddress) public onlyOwner {
        require(bytes(_idAddress).length > 0, "ID Address e obrigatorio.");

        User memory newUser;
        newUser.idAddress = _idAddress;
        newUser.name = _name;
        newUser.numberPhone = _numberPhone;
        newUser.cpf = _cpf;
        newUser.coordinates = _coordinates;
        newUser.createDate = block.timestamp;
        newUser.statusAccount = true;

        userMapping[_idAddress] = newUser;

        emit nUser(_name, _numberPhone, _cpf, _coordinates);
    }

    // Função Capturar Usuário pelo IdAddress
    function getUser(string memory _id) public view returns (string memory name, string memory numberPhone, string memory cpf, string memory coordinates, bool statusAccount, uint256 createDate) {
        User memory c = userMapping[_id];
        require(bytes(c.name).length != 0, "Conta nao encontrada");
        return (c.name, c.numberPhone, c.cpf, c.coordinates, c.statusAccount, c.createDate);
    }

    // Função Criar Produtor (a partir de um usuário)
    function upProductor(string memory _idAddressUser, string memory _nameCompany, string memory _CNPJ, string memory _cooperative, string memory _product, uint256 _valueProduct, uint256 _stock, string memory _unitMeasurement) public onlyOwner {
        require(bytes(_idAddressUser).length > 0, "ID Address do usuario e obrigatorio.");

        Productor memory newProductor;
        newProductor.idAddressUser = _idAddressUser;
        newProductor.nameCompany = _nameCompany;
        newProductor.cnpj = _CNPJ;
        newProductor.cooperative = _cooperative;
        newProductor.product = _product;
        newProductor.valueProduct = _valueProduct;
        newProductor.stock = _stock;
        newProductor.unitMeasurement = _unitMeasurement;

        productorMapping[_idAddressUser] = newProductor;

        emit nProductor(_product, _cooperative);
    }

    // Função Capturar Produtor pelo IdAddressUser
    function getProductor(string memory _id) public view returns (string memory nameCompany, string memory cnpj, string memory product, uint256 valueProduct, uint256 stock, string memory unitMeasurement, string memory cooperative) {
        Productor memory c = productorMapping[_id];
        require(bytes(c.product).length != 0, "Produtor nao encontrado!");
        return (c.nameCompany, c.cnpj, c.product, c.valueProduct, c.stock, c.unitMeasurement, c.cooperative);
    }
}
