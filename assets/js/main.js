/* Importações */
import { abi, endereco } from "./scripts/contract.js";
import { conectar } from "./scripts/conect.js";

/* Conexão com a carteira Metamask */
conectar();

/* GoogleMaps */
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
({
    key: "AIzaSyC-nctXG4OzcCDi0dJdm2D3W-Q1n2yls4c",
    v: "beta"
});

let map, infoWindow, marker;
async function initMap(lat = -3.1319155, lng = -60.0079888) {
    const { Map } = await google.maps.importLibrary("maps");
    let myLatLng = { lat: lat, lng: lng };
    map = new Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 15,
        mapId: "DEMO_MAP_ID",
    });
    marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                draggable: true,
                title: 'Você está aqui!',
            });

    let locationButton = document.getElementById("locationButton")

    infoWindow = new google.maps.InfoWindow();
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Você está aqui!");
                    infoWindow.open(map);
                    marker.setPosition(pos);
                    map.setCenter(pos);
                    let lat = document.getElementById('latitude').value = marker.getPosition().lat()
                    let lng = document.getElementById('longitude').value = marker.getPosition().lng()
                    return {
                        lat, lng
                    }
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
            } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    marker.addListener('dragend', () => {
        let lat = document.getElementById('latitude').value = marker.getPosition().lat()
        let lng = document.getElementById('longitude').value = marker.getPosition().lng()
        return {
            lat, lng
        }
    });

    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Você está aqui!");
                    infoWindow.open(map);
                    marker.setPosition(pos);
                    map.setCenter(pos);
                    let lat = document.getElementById('latitude').value = marker.getPosition().lat()
                    let lng = document.getElementById('longitude').value = marker.getPosition().lng()
                    return {
                        lat, lng
                    }
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
            } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
}

initMap();


let registerContract = web3.eth.contract(abi);
let register = registerContract.at(endereco);
let registerEvent = register.nUser();

/* Cadastro Usuário */
$("#CadastroButton").click(function() {
    if (document.getElementById("hash").value.length == 0) {
        iziToast.warning({
            title: 'Aviso',
            message: 'O usuário precisa ter um Hash para continuar...',
        });
    } else {
        $("#load").show();
        $("#container").hide();
        let name = $("#name").val() + " " + $("#lastname").val();
        let cpf = $("#cpf").val();
        let phoneNumber = $("#phone").val();
        let coordinates = $("#latitude").val() + ", " + $("#longitude").val();
        let hash = $("#hash").val();
        register.registerUser(name, phoneNumber, cpf, coordinates, hash, function(error, result) {
            if(!error) {
                $("#load").hide();
                $("#container").show();
                registerEvent.watch(function(err, result) {
                    if(!err) {
                        iziToast.success({
                            title: 'Sucesso',
                            message: 'Cadastro efetuado com sucesso!',
                        });
                        document.getElementById("name").value = "";
                        document.getElementById("lastname").value = "";
                        document.getElementById("cpf").value = "";
                        document.getElementById("phone").value = "";
                        document.getElementById("latitude").value = "";
                        document.getElementById("longitude").value = "";
                        document.getElementById("hash").value = "";
                    }
                });
            } else {
                console.log(error);
                document.getElementById("name").value = "";
                document.getElementById("#lastname").value = "";
                document.getElementById("#cpf").value = "";
                document.getElementById("#phone").value = "";
                document.getElementById("#latitude").value = "";
                document.getElementById("#longitude").value = "";
                document.getElementById("#hash").value = "";
                iziToast.error({
                    title: 'Erro',
                    message: 'Erro ao Cadastrar Usuário!',
                });
            }
        });
    }
});

/* Leitura Usuário */
$("#PesquisaButton").click(function() {
    let hashId = $("#hashId").val();
    register.getUser(hashId, function(error, result) {
        if(!error) {
            document.getElementById("ConsultaPesquisa").style.display = "none";
            document.getElementById("informacaousuario").style.display = "block";
            let data = result.split(",");
            let name = data[0].split(" ");
            document.getElementById("nameConsulta").value = name[0];
            document.getElementById("lastnameConsulta").value = name[1];
            document.getElementById("cpfConsulta").value = data[2];
            document.getElementById("phoneConsulta").value = data[1];
            document.getElementById("hashConsulta").value = document.getElementById("hashId").value;
            document.getElementById("UpProdutorButton").style.display = "block";
        } else {
            iziToast.error({
                title: 'Erro',
                message: 'Erro ao Pesquisar Usuário!',
            });
        }
    })
});

/* Cadastro Produtor e Produto */
$("#UpgradeProdutorButton").click(function() {
    if (document.getElementById("hashId").value.length == 0) {
        iziToast.warning({
            title: 'Aviso',
            message: "O produtor precisa ser um usuário para continuar...",
        });
    } else {
        $("#load").show();
        $("#container").hide();
        let nameCompany = document.getElementById("nameCompany").value;
        let cooperative = document.getElementById("cooperative").value;
        let cnpj = document.getElementById("cnpj").value;
        let produto = document.getElementById("product").value;
        let valorProduto = document.getElementById("valueProduct").value;
        let estoque = document.getElementById("stock").value;
        let uniMedida = document.getElementById("uniMedida").value;
        let hash = document.getElementById("hashId").value;
        register.upProductor(hash, nameCompany, cnpj, cooperative, produto, valorProduto, estoque, uniMedida, function(error, result) {
            if(!error) {
                $("#load").hide();
                $("#container").show();
                registerEvent.watch(function(err, result) {
                    if(!err) {
                        iziToast.success({
                            title: 'Sucesso',
                            message: 'Produtor Cadastrado com sucesso!',
                        });
                        document.getElementById("nameCompany").value = "";
                        document.getElementById("cooperative").value = "";
                        document.getElementById("cnpj").value = "";
                        document.getElementById("product").value = "";
                        document.getElementById("valueProduct").value = "";
                        document.getElementById("stock").value = "";
                        document.getElementById("uniMedida").value = "";
                    }
                })
            } else {
                console.log(error);
                document.getElementById("nameCompany").value = "";
                document.getElementById("cooperative").value = "";
                document.getElementById("cnpj").value = "";
                document.getElementById("product").value = "";
                document.getElementById("valueProduct").value = "";
                document.getElementById("stock").value = "";
                document.getElementById("uniMedida").value = "";
                iziToast.success({
                    title: 'Erro',
                    message: 'Erro ao cadastrar produtor',
                });
            }
        });
    }
});

/* Leitura Produtor */
$("#PesquisaButton").click(function() {
    let hashId = $("#hashId").val();
    register.getProductor(hashId, function(error, result) {
        if(!error) {
            document.getElementById("ConsultaPesquisa").style.display = "none";
            document.getElementById("informacaousuario").style.display = "block";
            document.getElementById("produtoLabel").style.display = "block";
            let data = result.split(",");
            document.getElementById("produtoLabel").value = data[0], data[1] + ",00/" + data[2];
            document.getElementById("UpProdutorButton").style.display = "none";
        }
    });
});