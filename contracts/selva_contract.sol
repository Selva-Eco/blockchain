pragma solidity >=0.4.22 <0.6.0;

import "./strings.sol";

contract AccountSELVA {

	address owner;

	// CONSTRUCTOR inicializando ao dazer deploy do contrato
	constructor() public {
		owner = msg.sender;
	}

	// CONDICIONAL = MODIFICADOR 
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // Usuário
	struct User {
		string idAddress; // User ID Address
		string name; // UserName
		string numberPhone; // User Number Phone
		string cpf; // User CPF
		string coordinates; // User's Delivery Address
		string createDate; // Account Creation Date
		/* string editCreate; // Account Last Moviment */
		bool statusAccount; // Account Status (true = Active and false = Inactive)
	}

	// Produtor
	struct Productor {
		string idAddressUser;
		string nameCompany;
		string cnpj;
		string cooperative;
		string product;
		uint valueProduct;
		uint stock;
		string unitMeasurement;
		/* uint amount; */
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

	User[] users;
	Productor[] productors;

	mapping(string => User) public user;
	mapping(string => Productor) public productor;

	// Função Registrar Usuário
	function registerUser(string memory _name, string memory _numberPhone, string memory _cpf, string memory _coordinates, string memory _idAddress) public onlyOwner {
		User memory userr;
		userr.idAddress = _idAddress;
		userr.name = _name;
		userr.numberPhone = _numberPhone;
		userr.cpf = _cpf;
		userr.coordinates = _coordinates;
		userr.createDate = "Hoje";
		userr.statusAccount = true;

		user[_idAddress] = userr;
		users.push(userr);

		emit nUser(_name, _numberPhone, _cpf, _coordinates);
	}

	// Função Listar Quantidade de Usuários
	function allUsers() public view returns (uint length) {
		return users.length;
	}

	// Função Capturar Usuário pelo IdAddress
	function getUser(string memory _id) public view returns (string memory userObtido) {
		string memory a;
		User memory c = user[_id];
		bytes memory tempEmptyStringTest = bytes(c.name);
		if(tempEmptyStringTest.length != 0) {
			a = string( string(abi.encodePacked(c.name, ",", c.numberPhone, ",", c.cpf, ",", c.statusAccount, ",", c.createDate)));
		} else {
			a = string ( string(abi.encodePacked("{Error: 'Conta não encontrada'}")));
		}

		return a;
	}

	// Função Criar Produtor (a partir de um usuário)
	function upProductor(string memory _idAddressUser, string memory _nameCompany, string memory _CNPJ, string memory _cooperative, string memory _product, uint _valueProduct, uint _stock, string memory _unitMeasurement) public onlyOwner {
		Productor memory productorr;
		productorr.idAddressUser = _idAddressUser;
		productorr.nameCompany = _nameCompany;
		productorr.cnpj = _CNPJ;
		productorr.cooperative = _cooperative;
		productorr.product = _product;
		productorr.valueProduct = _valueProduct;
		productorr.stock = _stock;
		productorr.unitMeasurement = _unitMeasurement;
		/* productorr.amount = _amount; */

		productor[_idAddressUser] = productorr;
		productors.push(productorr);

		emit nProductor(_product, _cooperative);
	}

	// Função Listar Quantidade de Produtores
	function allProductors() public view returns (uint length) {
		return productors.length;
	}

	// Função Capturar Produtor pelo IdAddressUser
	function getProductor(string memory _id) public view returns (string memory productorObtido) {
		string memory a;
		Productor memory c = productor[_id];
		bytes memory tempEmptyStringTest = bytes(c.product);
		if(tempEmptyStringTest.length != 0) {
			a = string( string(abi.encodePacked(c.product, ",", c.valueProduct, ",", c.unitMeasurement, ",", c.stock, ",", c.cooperative)));
		} else {
			a = string( string(abi.encodePacked(" Produtor não encontrato!")));
		}

		return a;
	}

}