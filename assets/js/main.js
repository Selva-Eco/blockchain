/* Importações */
import { abi, endereco } from "./scripts/contract.js";
import { conectar } from "./scripts/conect.js";

/* Conexão com a carteira Metamask */
conectar();

let registerContract = new web3.eth.Contract(abi, endereco);
let account = window.sessionStorage.getItem("account");

function desactiveCheck(el) {
    el.checked = false;
}

// Monitorar o evento nUser
registerContract.events.nUser()
.on('data', function(event) {
    $("#load").hide();
    $("#container").show();
    $("#modalHash").removeClass("d-none");
    document.getElementById("hashText").innerHTML = window.sessionStorage.getItem("hashText");
    $("#modalButton").click();
    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("numberAddress").value = "";
    document.getElementById("nameAddress").value = "";
    document.getElementById("districtAddress").value = "";
    document.getElementById("cityUfAddress").value = "";
    desactiveCheck(document.querySelector("#acceptTerms"));
})
.on('error', function(error) {
    $("#load").hide();
    $("#container").show();
    iziToast.error({
        title: "Erro",
        message: "Falha na transação",
        position: "topRight"
    });
});

registerContract.events.nProductor()
.on('data', function(event) {
    $("#load").hide();
    $("#container").show();
    iziToast.success({
        title: 'Sucesso',
        message: 'Produtor Cadastrado com sucesso!',
        position: "topRight"
    });
    let hash = document.getElementById("hashId").value;
    window.sessionStorage.setItem("productRefresh", hash);
    window.location.reload();
    document.getElementById("nameCompany").value = "";
    document.getElementById("cooperative").value = "";
    document.getElementById("cnpj").value = "";

    let hashId = $("#hashId").val();
    registerContract.methods.getUser(hashId).call({ from: account })
    .then(function(result) {
        let name = "";
        let lastName = "";
        if(result.name.split(" ").length <= 2) {
            name = result.name.split(" ")[0];
            lastName = result.name.split(" ")[1] || "";
        } else {
            name = result.name.split(" ")[0];
            let nameLength = result.name.split(" ")[0].length;
            lastName = result.name.substr(nameLength)
        }

        // Atualiza a interface com os dados do usuário
        document.getElementById("ConsultaPesquisa").style.display = "none";
        document.getElementById("informacaousuario").style.display = "block";
        
        document.getElementById("nameConsulta").value = name;
        document.getElementById("lastnameConsulta").value = lastName;
        document.getElementById("cpfConsulta").value = result.cpf;
        document.getElementById("phoneConsulta").value = result.numberPhone;
        document.getElementById("cepConsulta").value = result.addressMap.cep;
        document.getElementById("numberAddressConsulta").value = result.addressMap.numberAddress;
        document.getElementById("nameAddressConsulta").value = result.addressMap.nameAddress;
        document.getElementById("districtAddressConsulta").value = result.addressMap.districtAddress;
        document.getElementById("cityUfAddressConsulta").value = result.addressMap.cityUfAddress;
        document.getElementById("hashConsulta").value = hashId;

        let productor = false;
        registerContract.methods.listAllProductors().call()
        .then(function(result) {
            result.map((pro) => {
                if(pro.idAddress == hashId) {
                    productor = true;
                }
            });

            if(productor) {
                document.getElementById("UpProdutorButton").style.display = "none";
                document.getElementById("showProductsDiv").style.display = "block";
            } else {
                document.getElementById("showProductsDiv").style.display = "none";
                document.getElementById("UpProdutorButton").style.display = "block";
            }
        })
        .catch(function(error) {});
    })
    .catch(function(error) {
        iziToast.error({
            title: 'Erro',
            message: 'Erro ao pesquisar usuário!',
            position: "topRight"
        });
    });
})
.on('error', function(error) {
    $("#load").hide();
    $("#container").show();
    iziToast.error({
        title: "Erro",
        message: "Falha na transação",
        position: "topRight"
    });
})

// Função para gerar o hash
async function generateHash(data) {
    try {
        // Concatenando os dados em uma única string
        const concatenatedData = `${data.name}${data.lastname}${data.cpf}${data.phone}${data.cep}${data.numberAddress}${data.nameAddress}${data.districtAddress}${data.cityUfAddress}`;
        
        // Convertendo a string para um ArrayBuffer
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(concatenatedData);
        
        // Gerando o hash SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        
        // Convertendo o ArrayBuffer do hash para uma string hexadecimal
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    } catch (error) {
        console.error("Erro ao gerar o hash:", error);
        throw error; // Propaga o erro para ser tratado no catch do caller
    }
}

$("#copyHash").click(async function() {
    navigator.clipboard.writeText(window.sessionStorage.getItem("hashText"));
    document.getElementById("copyHash").innerHTML = `Copiado!`;
    setTimeout(() => {
        document.getElementById("copyHash").innerHTML = "Copiar";
    }, 1000);
})

/* Cadastro Usuário */
$("#CadastroButton").click(function() {
    if(
        document.getElementById("name").value.length == 0 ||
        document.getElementById("lastname").value.length == 0 ||
        document.getElementById("cpf").value.length == 0 ||
        document.getElementById("phone").value.length == 0
    ) {
        iziToast.warning({
            title: 'Aviso',
            message: 'Preencha todos os campos...',
            position: "topRight"
        });
    } else {
        let userData = {
            name: $("#name").val() + " " + $("#lastname").val(),
            phone: $("#phone").val(),
            cpf: $("#cpf").val(),
            cep: $("#cep").val(),
            numberAddress: $("#numberAddress").val(),
            nameAddress: $("#nameAddress").val(),
            districtAddress: $("#districtAddress").val(),
            cityUfAddress: $("#cityUfAddress").val()
        }
        generateHash(userData).then(hashResult => {
            $("#load").show();
            $("#container").hide();

            registerContract.methods.registerUser(
                userData.name,
                userData.phone,
                userData.cpf,
                hashResult,
                userData.cep,
                userData.numberAddress,
                userData.nameAddress,
                userData.districtAddress,
                userData.cityUfAddress,
            ).send({ from: account })  // 'account' já contém a conta conectada
            .on('transactionHash', function(hash) {})
            .on('receipt', function(receipt) {
                window.sessionStorage.setItem("hashText", hashResult);
            })
            .on('error', function(error, receipt) {});
        }).catch((err) => {
            iziToast.warning({
                title: 'Aviso',
                message: 'O usuário precisa ter um Hash para continuar...',
                position: "topRight"
            });
        })
    }
});

/* Leitura Usuário */
$("#PesquisaButton").click(function() {
    let hashId = $("#hashId").val();
    registerContract.methods.getUser(hashId).call({ from: account })
    .then(function(result) {
        let name = "";
        let lastName = "";
        if(result.name.split(" ").length <= 2) {
            name = result.name.split(" ")[0];
            lastName = result.name.split(" ")[1] || "";
        } else {
            name = result.name.split(" ")[0];
            let nameLength = result.name.split(" ")[0].length;
            lastName = result.name.substr(nameLength)
        }

        // Atualiza a interface com os dados do usuário
        document.getElementById("ConsultaPesquisa").style.display = "none";
        document.getElementById("informacaousuario").style.display = "block";
        
        document.getElementById("nameConsulta").value = name;
        document.getElementById("lastnameConsulta").value = lastName;
        document.getElementById("cpfConsulta").value = result.cpf;
        document.getElementById("phoneConsulta").value = result.numberPhone;
        document.getElementById("cepConsulta").value = result.addressMap.cep;
        document.getElementById("numberAddressConsulta").value = result.addressMap.numberAddress;
        document.getElementById("nameAddressConsulta").value = result.addressMap.nameAddress;
        document.getElementById("districtAddressConsulta").value = result.addressMap.districtAddress;
        document.getElementById("cityUfAddressConsulta").value = result.addressMap.cityUfAddress;
        document.getElementById("hashConsulta").value = hashId;

        let productor = false;
        registerContract.methods.listAllProductors().call()
        .then(function(result) {
            result.map((pro) => {
                if(pro.idAddress == hashId) {
                    productor = true;
                }
            });

            if(productor) {
                document.getElementById("UpProdutorButton").style.display = "none";
                document.getElementById("showProductsDiv").style.display = "block";
            } else {
                document.getElementById("showProductsDiv").style.display = "none";
                document.getElementById("UpProdutorButton").style.display = "block";
            }
        })
        .catch(function(error) {});
    })
    .catch(function(error) {
        iziToast.error({
            title: 'Erro',
            message: 'Erro ao pesquisar usuário!',
            position: "topRight"
        });
    });
});

$("#hashConsulta").click(function() {
    navigator.clipboard.writeText($("#hashConsulta").val());
    iziToast.success({
        title: 'Hash do Usuário',
        message: 'Copiado com sucesso para área de transferência!',
        position: "topRight"
    });
});

const tableListAllUsers = document.getElementById("tableListAllUsers");
$("#BuscaTodosUsers").click(function() {
    registerContract.methods.listAllUsers().call()
    .then(function(result) {
        document.getElementById("ConsultaPesquisa").style.display = "none";
        document.getElementById("imageBlockchain").style.display = "none";
        document.getElementById("tableListAllUsers").style.display = "block";
        document.getElementById("tableListAllUsers").classList.remove("col-md-6");
        document.getElementById("tableListAllUsers").classList.add("col-md-12");
        let idx = 1;
        let tbody = ``;
        tbody = result.map((info) => {
            return `
                <tr>
                    <th scope="row">${idx++}</th>
                    <td>${info.user.name}</td>
                    <td>${info.idAddress}</td>
                </tr>
            `
        }).join("");

        const table = `
            <div class="title text-start greeDark mb-7">
                <p style="cursor: pointer;" onclick="navConsulta(2)"><i class="bi bi-arrow-left"></i> voltar</p>
            </div>
            <table class="g-3 mt-5" style="width: 100%">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Hash</th>
                    </tr>
                </thead>
                <tbody>${tbody}</tbody>
            </table>
        `;

        tableListAllUsers.innerHTML = table;
    })
    .catch(function(error) {
        iziToast.error({
            title: 'Erro',
            message: 'Erro ao listar usuários!',
            position: "topRight"
        });
    });
});

/* Cadastro Produtor e Produto */
$("#UpgradeProdutorButton").click(function() {
    if (document.getElementById("hashId").value.length == 0) {
        iziToast.warning({
            title: 'Aviso',
            message: "O produtor precisa ser um usuário para continuar...",
            position: "topRight"
        });
    } else {
        $("#load").show();
        $("#container").hide();
        let hashId = document.getElementById("hashId").value;
        let nameCompany = document.getElementById("nameCompany").value;
        let cooperative = document.getElementById("cooperative").value;
        let cnpj = document.getElementById("cnpj").value;

        registerContract.methods.upProductor(
            hashId,
            nameCompany,
            cnpj,
            cooperative
        ).send({ from: account })
        .on('transactionHash', function(hash) {})
        .on('receipt', function(receipt) {})
        .on('error', function(error, receipt) {
            $("#load").hide();
            $("#container").show();
            iziToast.error({
                title: "Erro",
                message: "Falha na transação",
                position: "topRight"
            });
        });
    }
});

const listProducts = document.getElementById("listProducts");
$("#ShowProductsButton").click(function() {
    document.getElementById("modalProducts").classList.remove("d-none");
    document.getElementById("modalProductsButton").click();
    document.getElementById("formAddProducts").style.display = "none";
    document.getElementById("listProducts").style.display = "flex";
			document.getElementById("formAddProducts").classList.add("d-none");

    let hashId = $("#hashId").val();
    registerContract.methods.getProductor(hashId).call({ from: account })
    .then(function(result) {
        document.getElementById("listProducts").style.display = "block";
        let idx = 1;
        let tbody = `Sem ativos cadastrados`;
        if(result?.products.length > 0) {
            tbody = result.products.map((info) => {
                return `
                    <tr>
                        <th scope="row">${idx++}</th>
                        <td>${info.name}</td>
                        <td>${info.value}/${info.unitMeasurement}</td>
                        <td>${info.stock}</td>
                    </tr>
                `
            }).join("");
    
            const table = `
                <table class="g-3" style="width: 100%">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Estoque</th>
                        </tr>
                    </thead>
                    <tbody>${tbody}</tbody>
                </table>
            `;
            listProducts.innerHTML = table;
        } else {
            listProducts.innerHTML = tbody;
        }

    })
    .catch(function(error) {
        iziToast.error({
            title: 'Erro',
            message: 'Erro ao listar ativos!',
            position: "topRight"
        });
    });
});

$("#buttonAddProducts").click(function() {
    if (document.getElementById("hashId").value.length == 0) {
        iziToast.warning({
            title: 'Aviso',
            message: "O produtor precisa ser um usuário para continuar...",
            position: "topRight"
        });
    } else {
        let hashId = document.getElementById("hashId").value;
        let nameProduct = document.getElementById("nameProduct").value;
        let valueProduct = document.getElementById("valueProduct").value;
        let unitMeasurementProduct = document.getElementById("unitMeasurementProduct").value;
        let stockProduct = document.getElementById("stockProduct").value;

        registerContract.methods.addProductToProductor(
            hashId,
            nameProduct,
            valueProduct,
            stockProduct,
            unitMeasurementProduct,
        ).send({ from: account })
        .on('transactionHash', function(hash) {})
        .on('receipt', function(receipt) {
            document.getElementById("closeModalProducts").click();
            iziToast.success({
                title: "Transação bem sucedida",
                message: "Ativo adicionado com sucesso!",
                position: "topRight"
            });
            document.getElementById("buttonAddProducts").classList.add("d-none");
            document.getElementById("showFormAddProducts").classList.remove("d-none");
        })
        .on('error', function(error, receipt) {
            $("#load").hide();
            $("#container").show();
            iziToast.error({
                title: "Erro",
                message: "Falha na transação",
                position: "topRight"
            });
        });
    }
});