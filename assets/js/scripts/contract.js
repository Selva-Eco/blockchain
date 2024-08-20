//Declaração das 2 variáveis mais significativa para conexão com o contrato, fiquem atentos!!!!
//endereco muda a cada deploy  
//==============ALTERAR==============
// export const endereco = '0x9aC37eec8C2Bb777dD77f5B78093D653C6CDF7e4';
export const endereco = '0xcED65284084a77B8ba0dB46cbeFA5D26511d3dc0';
//ABI: o contrato vem no formato JSON para que possa ser interpretado
//==============P/ ALTERAR, DEPENDE DA MODIFICAÇÃo DO CONTRATO PARA TESTE==============
//dados(endereco e ABI) do contrato se matém inalterados após o DEPLOY, pois o contrato não poderá sofre mais alterações
export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "nameCompany",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "cooperative",
				"type": "string"
			}
		],
		"name": "nProductor",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "numberPhone",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "cpf",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "cep",
				"type": "string"
			}
		],
		"name": "nUser",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_idAddressUser",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_productName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_stock",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_unitMeasurement",
				"type": "string"
			}
		],
		"name": "addProductToProductor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getProductor",
		"outputs": [
			{
				"internalType": "string",
				"name": "nameCompany",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cnpj",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cooperative",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "unitMeasurement",
						"type": "string"
					}
				],
				"internalType": "struct AccountSELVA.Product[]",
				"name": "products",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "numberPhone",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cpf",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "cep",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "numberAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nameAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "districtAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cityUfAddress",
						"type": "string"
					}
				],
				"internalType": "struct AccountSELVA.AddressMap",
				"name": "addressMap",
				"type": "tuple"
			},
			{
				"internalType": "bool",
				"name": "statusAccount",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "createDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listAllProductors",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "idAddress",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "nameCompany",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "cnpj",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "cooperative",
								"type": "string"
							},
							{
								"components": [
									{
										"internalType": "string",
										"name": "name",
										"type": "string"
									},
									{
										"internalType": "uint256",
										"name": "value",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "stock",
										"type": "uint256"
									},
									{
										"internalType": "string",
										"name": "unitMeasurement",
										"type": "string"
									}
								],
								"internalType": "struct AccountSELVA.Product[]",
								"name": "products",
								"type": "tuple[]"
							}
						],
						"internalType": "struct AccountSELVA.Productor",
						"name": "productor",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "numberPhone",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "cpf",
								"type": "string"
							},
							{
								"components": [
									{
										"internalType": "string",
										"name": "cep",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "numberAddress",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "nameAddress",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "districtAddress",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "cityUfAddress",
										"type": "string"
									}
								],
								"internalType": "struct AccountSELVA.AddressMap",
								"name": "addressMap",
								"type": "tuple"
							},
							{
								"internalType": "uint256",
								"name": "createDate",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "statusAccount",
								"type": "bool"
							}
						],
						"internalType": "struct AccountSELVA.User",
						"name": "user",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "value",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "stock",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "unitMeasurement",
								"type": "string"
							}
						],
						"internalType": "struct AccountSELVA.Product[]",
						"name": "products",
						"type": "tuple[]"
					}
				],
				"internalType": "struct AccountSELVA.ProductorInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listAllProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "unitMeasurement",
						"type": "string"
					}
				],
				"internalType": "struct AccountSELVA.Product[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listAllUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "idAddress",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "numberPhone",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "cpf",
								"type": "string"
							},
							{
								"components": [
									{
										"internalType": "string",
										"name": "cep",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "numberAddress",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "nameAddress",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "districtAddress",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "cityUfAddress",
										"type": "string"
									}
								],
								"internalType": "struct AccountSELVA.AddressMap",
								"name": "addressMap",
								"type": "tuple"
							},
							{
								"internalType": "uint256",
								"name": "createDate",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "statusAccount",
								"type": "bool"
							}
						],
						"internalType": "struct AccountSELVA.User",
						"name": "user",
						"type": "tuple"
					}
				],
				"internalType": "struct AccountSELVA.UserInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_numberPhone",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cpf",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_idAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cep",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_numberAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nameAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_districtAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cityUfAddress",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_idAddressUser",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nameCompany",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_CNPJ",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cooperative",
				"type": "string"
			}
		],
		"name": "upProductor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]