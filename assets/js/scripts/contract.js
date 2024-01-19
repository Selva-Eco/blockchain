//Declaração das 2 variáveis mais significativa para conexão com o contrato, fiquem atentos!!!!
//endereco muda a cada deploy  
//==============ALTERAR==============
// export const endereco = '0x9aC37eec8C2Bb777dD77f5B78093D653C6CDF7e4';
export const endereco = '0x46EbBC48dd1db9310B8Cea03D25e7Ee1e87e594b';
//ABI: o contrato vem no formato JSON para que possa ser interpretado
//==============P/ ALTERAR, DEPENDE DA MODIFICAÇÃo DO CONTRATO PARA TESTE==============
//dados(endereco e ABI) do contrato se matém inalterados após o DEPLOY, pois o contrato não poderá sofre mais alterações
export const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"name": "userObtido",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "allUsers",
		"outputs": [
			{
				"name": "length",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"name": "productor",
		"outputs": [
			{
				"name": "idAddressUser",
				"type": "string"
			},
			{
				"name": "nameCompany",
				"type": "string"
			},
			{
				"name": "cnpj",
				"type": "string"
			},
			{
				"name": "cooperative",
				"type": "string"
			},
			{
				"name": "product",
				"type": "string"
			},
			{
				"name": "valueProduct",
				"type": "uint256"
			},
			{
				"name": "stock",
				"type": "uint256"
			},
			{
				"name": "unitMeasurement",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getProductor",
		"outputs": [
			{
				"name": "productorObtido",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_numberPhone",
				"type": "string"
			},
			{
				"name": "_cpf",
				"type": "string"
			},
			{
				"name": "_coordinates",
				"type": "string"
			},
			{
				"name": "_idAddress",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idAddressUser",
				"type": "string"
			},
			{
				"name": "_nameCompany",
				"type": "string"
			},
			{
				"name": "_CNPJ",
				"type": "string"
			},
			{
				"name": "_cooperative",
				"type": "string"
			},
			{
				"name": "_product",
				"type": "string"
			},
			{
				"name": "_valueProduct",
				"type": "uint256"
			},
			{
				"name": "_stock",
				"type": "uint256"
			},
			{
				"name": "_unitMeasurement",
				"type": "string"
			}
		],
		"name": "upProductor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "allProductors",
		"outputs": [
			{
				"name": "length",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"name": "user",
		"outputs": [
			{
				"name": "idAddress",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "numberPhone",
				"type": "string"
			},
			{
				"name": "cpf",
				"type": "string"
			},
			{
				"name": "coordinates",
				"type": "string"
			},
			{
				"name": "createDate",
				"type": "string"
			},
			{
				"name": "statusAccount",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "numberPhone",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "cpf",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "coordinates",
				"type": "string"
			}
		],
		"name": "nUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "product",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "cooperative",
				"type": "string"
			}
		],
		"name": "nProductor",
		"type": "event"
	}
]