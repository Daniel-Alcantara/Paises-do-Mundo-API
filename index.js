$(document).ready(function () {

  var QuantidadePais;
  var NomePais;
  var HorarioPais;
  var BandeiraPais;
  var PopulacaoPais;
  var i = 0;

  var PesquisaPais;

  var RegiaoSelecionada_user;

  StartRequest("all")

  // Função para quando filtragem por região
  $(".dropdown-item").click(function (e) {

    RegiaoSelecionada_user = $(this).html()

    $("#dropdownMenuLink").html(RegiaoSelecionada_user + " ")

    StartRequest("Regiao", RegiaoSelecionada_user)

  })

  // Função para quando digitar o nome
  $(".name_pais").focusout(function () {



    PesquisaPais = $(".name_pais").val()

    if (PesquisaPais == "") {

    } else {

      StartRequest("Nome", PesquisaPais)
    }
  })




  // Função global

})

function StartRequest(opcao, nome) {

  $(".conteudo_paises").html("")

  if (opcao == "Regiao") {
    if (nome == "Todos") {

      URLEnvio = "https://restcountries.com/v3.1/all"
      $(".title-regiao h2").html("Todos os Países")

    }
    else {

      $(".title-regiao h2").html(nome)
      if(nome == "Europa"){
        nome = "Europe";
      }
      URLEnvio = "https://restcountries.com/v3.1/region/" + nome     
      

    }
  }
  else if (opcao == "Nome") {

    URLEnvio = "https://restcountries.com/v3.1/name/" + nome

    $("#dropdownMenuLink").html("Filtre pela Região")

  } else if (opcao == "all") {

    URLEnvio = "https://restcountries.com/v3.1/all"
    $(".title-regiao h2").html("Todos os Países")
    $("#dropdownMenuLink").html("Filtre pela Região")

  }

  console.log("URL", URLEnvio)
  $.ajax({

    url: URLEnvio,
    type: "GET"

  }).done(function (response) {



    QuantidadePais = response.length

    for (i = 0; i < QuantidadePais; i++) {

      NomePais = response[i].translations.por.common
      HorarioPais = response[i].timezones[0]
      BandeiraPais = response[i].flags.png
      PopulacaoPais = response[i].population

      if(opcao == "Nome"){
        $(".title-regiao h2").html(NomePais)
      }


      $(".conteudo_paises").append(
        `
          <div class="box_pais mt-5">
            <div class="image_pais">
                <img src="${BandeiraPais}" alt="">
            </div>
            <div class="nome_pais pt-2">
                <h3>${NomePais}</h3>
            </div>
            <div class="info_pais">
                <p>População: ${PopulacaoPais}</p>
                <p>Horario: ${HorarioPais}</p>
            </div>
        </div>
        `

      )
    }

  });

}

//   // Ajax por região selecionada
//   function RegiaoSelecionadaRequest(regiao) {

//     $(".conteudo_paises").html("")

//     if (regiao == "Todos") {
//       $(".title-regiao h2").html("Todos os Países")

//       URLporRegiao = "https://restcountries.com/v3.1/all"
//     }
//     else {

//       $(".title-regiao h2").html(regiao)
//       if (regiao == "Europa") {

//         regiao = "Europe"

//       }

//       URLporRegiao = "https://restcountries.com/v3.1/region/" + regiao

//     }

//     $.ajax({

//       url: URLporRegiao,
//       type: "GET"

//     }).done(function (response) {



//       QuantidadePais = response.length

//       for (i = 0; i < QuantidadePais; i++) {

//         NomePais = response[i].translations.por.common
//         HorarioPais = response[i].timezones[0]
//         BandeiraPais = response[i].flags.png
//         PopulacaoPais = response[i].population




//         $(".conteudo_paises").append(
//           `
//               <div class="box_pais mt-5">
//                 <div class="image_pais">
//                     <img src="${BandeiraPais}" alt="">
//                 </div>
//                 <div class="nome_pais pt-2">
//                     <h3>${NomePais}</h3>
//                 </div>
//                 <div class="info_pais">
//                     <p>População: ${PopulacaoPais}</p>
//                     <p>Horario: ${HorarioPais}</p>
//                 </div>
//             </div>
//             `

//         )
//       }

//     });

//   }


//   // Requisição por Nome informado
//   function PesquisaPaisRequest(nome) {

//     $("#dropdownMenuLink").html("Filtre pela Região")

//     $(".conteudo_paises").html("")

//     URLporNome = "https://restcountries.com/v3.1/name/" + nome


//     $(".name_pais").val("")

//     $.ajax({

//       url: URLporNome,
//       type: "GET"

//     }).done(function (response) {


//       QuantidadePais = response.length

//       for (i = 0; i < QuantidadePais; i++) {

//         NomePais = response[i].translations.por.common
//         HorarioPais = response[i].timezones[0]
//         BandeiraPais = response[i].flags.png
//         PopulacaoPais = response[i].population

//         $(".title-regiao h2").html(NomePais)


//         $(".conteudo_paises").append(
//           `
//             <div class="box_pais mt-5">
//               <div class="image_pais">
//                   <img src="${BandeiraPais}" alt="">
//               </div>
//               <div class="nome_pais pt-2">
//                   <h3>${NomePais}</h3>
//               </div>
//               <div class="info_pais">
//                   <p>População: ${PopulacaoPais}</p>
//                   <p>Horario: ${HorarioPais}</p>
//               </div>
//           </div>
//           `

//         )
//       }

//     });

//   }

// })

$(document).ajaxError(function () {

  $(".title-regiao h2").html("País informado não encontrado");
  $(".title-regiao h2").css("color", "red")
  $(".title-regiao").css("margin-top", "4rem");

  $(".name_pais").val("")
  $(".name_pais").css("border", "1px solid red")

  setTimeout(
    function () {

      $("#dropdownMenuLink").html("Filtre pela Região")
      $(".title-regiao h2").css("color", "black")
      $(".name_pais").css("border", "1px solid #ced4da")
      StartRequest("all", "all")


    }, 2000);
})
