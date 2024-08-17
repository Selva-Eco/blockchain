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

    // AddressMap struct
    struct AddressMap {
        string cep;
        string numberAddress;
        string nameAddress;
        string districtAddress;
        string cityUfAddress;
    }

    // Usuário
    struct User {
        string name; // UserName
        string numberPhone; // User Number Phone
        string cpf; // User CPF
        AddressMap addressMap; // User's Address Information
        uint256 createDate; // Account Creation Date
        bool statusAccount; // Account Status (true = Active and false = Inactive)
    }

    // Produto
    struct Product {
        string name; // Nome do produto
        uint256 value; // Valor do produto
        uint256 stock; // Estoque do produto
        string unitMeasurement; // Unidade de medida do produto
    }

    // Produtor
    struct Productor {
        string nameCompany;
        string cnpj;
        string cooperative;
        Product[] products; // Array de produtos
    }

    // Informações do usuário com ID
    struct UserInfo {
        string idAddress;
        User user;
    }

    // EVENTOS
    event nUser (
        string name,
        string numberPhone,
        string cpf,
        string cep
    );

    event nProductor (
        string nameCompany,
        string cooperative
    );

    mapping(string => User) private userMapping;
    mapping(string => Productor) private productorMapping;

    string[] private userKeys; // Lista de chaves de usuários
    string[] private productorKeys; // Lista de chaves de produtores

    // Função Registrar Usuário
    function registerUser(
        string memory _name, 
        string memory _numberPhone, 
        string memory _cpf, 
        string memory _idAddress, 
        string memory _cep, 
        string memory _numberAddress, 
        string memory _nameAddress, 
        string memory _districtAddress, 
        string memory _cityUfAddress
    ) public onlyOwner {
        require(bytes(_idAddress).length > 0, "ID Address e obrigatorio.");

        // Verifique se o usuário já foi registrado
        require(bytes(userMapping[_idAddress].name).length == 0, "Usuario ja registrado.");

        AddressMap memory newAddressMap = AddressMap({
            cep: _cep,
            numberAddress: _numberAddress,
            nameAddress: _nameAddress,
            districtAddress: _districtAddress,
            cityUfAddress: _cityUfAddress
        });

        User memory newUser = User({
            name: _name,
            numberPhone: _numberPhone,
            cpf: _cpf,
            addressMap: newAddressMap,
            createDate: block.timestamp,
            statusAccount: true
        });

        userMapping[_idAddress] = newUser;
        userKeys.push(_idAddress); // Adiciona a chave à lista de chaves

        emit nUser(_name, _numberPhone, _cpf, _cep);
    }

    // Função Capturar Usuário pelo IdAddress
    function getUser(string memory _id) public view returns (
        string memory name, 
        string memory numberPhone, 
        string memory cpf, 
        AddressMap memory addressMap, 
        bool statusAccount, 
        uint256 createDate
    ) {
        User memory c = userMapping[_id];
        require(bytes(c.name).length != 0, "Usuario nao encontrado");
        return (c.name, c.numberPhone, c.cpf, c.addressMap, c.statusAccount, c.createDate);
    }

    // Função Criar Produtor (a partir de um usuário)
    function upProductor(
        string memory _idAddressUser, 
        string memory _nameCompany, 
        string memory _CNPJ, 
        string memory _cooperative
    ) public onlyOwner {
        require(bytes(_idAddressUser).length > 0, "ID Address do usuario e obrigatorio.");

        Productor storage productor = productorMapping[_idAddressUser];
        require(bytes(productor.nameCompany).length == 0, "Produtor ja registrado."); // Verifica se o produtor já foi registrado

        productor.nameCompany = _nameCompany;
        productor.cnpj = _CNPJ;
        productor.cooperative = _cooperative;

        productorKeys.push(_idAddressUser); // Adiciona a chave à lista de chaves

        emit nProductor(_nameCompany, _cooperative);
    }

    // Função para adicionar um produto a um produtor
    function addProductToProductor(
        string memory _idAddressUser,
        string memory _productName,
        uint256 _value,
        uint256 _stock,
        string memory _unitMeasurement
    ) public onlyOwner {
        require(bytes(_idAddressUser).length > 0, "ID Address do usuario e obrigatorio.");
        Productor storage productor = productorMapping[_idAddressUser];
        require(bytes(productor.nameCompany).length != 0, "Produtor nao encontrado!");

        Product memory newProduct = Product({
            name: _productName,
            value: _value,
            stock: _stock,
            unitMeasurement: _unitMeasurement
        });

        productor.products.push(newProduct);
    }

    // Função Capturar Produtor pelo IdAddressUser
    function getProductor(string memory _id) public view returns (
        string memory nameCompany, 
        string memory cnpj, 
        string memory cooperative, 
        Product[] memory products
    ) {
        Productor memory c = productorMapping[_id];
        require(bytes(c.nameCompany).length != 0, "Produtor nao encontrado!");
        return (c.nameCompany, c.cnpj, c.cooperative, c.products);
    }

    // Função para listar todos os usuários
    function listAllUsers() public view returns (UserInfo[] memory) {
        UserInfo[] memory allUsers = new UserInfo[](userKeys.length);
        for (uint256 i = 0; i < userKeys.length; i++) {
            string memory id = userKeys[i];
            allUsers[i] = UserInfo({
                idAddress: id,
                user: userMapping[id]
            });
        }
        return allUsers;
    }

    // Função para listar todos os produtores
    function listAllProductors() public view returns (Productor[] memory) {
        Productor[] memory allProductors = new Productor[](productorKeys.length);
        for (uint256 i = 0; i < productorKeys.length; i++) {
            allProductors[i] = productorMapping[productorKeys[i]];
        }
        return allProductors;
    }

    // Função para listar todos os produtos
    function listAllProducts() public view returns (Product[] memory) {
        uint256 totalProducts = 0;

        for (uint256 i = 0; i < productorKeys.length; i++) {
            Productor memory productor = productorMapping[productorKeys[i]];
            totalProducts += productor.products.length;
        }

        Product[] memory allProducts = new Product[](totalProducts);
        uint256 index = 0;

        for (uint256 i = 0; i < productorKeys.length; i++) {
            Productor memory productor = productorMapping[productorKeys[i]];
            for (uint256 j = 0; j < productor.products.length; j++) {
                allProducts[index] = productor.products[j];
                index++;
            }
        }

        return allProducts;
    }
}
