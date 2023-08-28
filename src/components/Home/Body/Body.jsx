import React, { useEffect, useState } from "react";
import styles from "./Body.module.css";
import BigBox from "./Box/BigBox/BigBox";
import AllCompanies from "./Box/AllCompanies/AllCompanies";
import Line from "./Line/Line";
import SwitchCategory from "./SwitchCategory/SwitchCategory";
import CompanyBox from "./Box/CompanyBox/CompanyBox";
import CardLeft from "./Cards/CardLeft/CardLeft";
import CardRight from "./Cards/CardRight/CardRight";
import Azul_logo from "../../../assets/companias/azul.svg";
import Gol_logo from "../../../assets/companias/gol.svg";
import Latam_logo from "../../../assets/companias/latam.svg";
import agora_logo from "../../../assets/companias/agora.svg";

import CardGeralRight from "./Cards/CardGeralRight/CardGeralRight";
import CardGeralLeft from "./Cards/CardGeralLeft/CardGeralLeft";

// Definindo o componente Body
const Body = (props) => {
  setTimeout(function(){
    window.location.reload(1);
 }, 60000 * 30);
  // Estados para controlar a companhia selecionada, logo selecionado e modelo selecionado
  const [companiaSelecionada, setCompaniaSelecionada] = useState("agora");
  const [logoSelecionado, setLogoSelecionado] = useState(agora_logo);
  const [modeloSelecionado, setModeloSelecionado] = useState("Doméstico");

  // Funções para atualizar os estados de compania, logo e modelo selecionados
  const selecionarCompania = (compania) => {
    setCompaniaSelecionada(compania);
  };

  const selecionarLogo = (compania) => {
    setLogoSelecionado(compania);
  };

  const selecionarModelo = (modelo) => {
    setModeloSelecionado(modelo);
  };

  // Mapeamento de valores únicos a partir dos dados da API
  const processos = [...new Set(props.dadosDaAPI.map((item) => item.Processo))];
  const companhias = [
    ...new Set(props.dadosDaAPI.map((item) => item.Companhia)),
  ];
  const pesquisadores = [
    ...new Set(props.dadosDaAPI.map((item) => item.id_pesquisador)),
  ];

  const medicaoSatisfacao = [...new Set(props.dadosDaAPI.map((item) => item))];
  medicaoSatisfacao.slice(-2); // Ignorando os dois últimos itens do array

  // Inicializando variáveis para cálculos
  var todosPesquisadoresId = [];
  var todosDiasAMais = 0;
  var todosDiasFaltados = 0;
  var todosDiasTrabalhados = 0;
  var totalDaEscala = 0;
  var diasRestantes = 0;

  // Cálculo do total da escala total para cada pesquisador
  const totalEscalaTotal = [
    ...new Set(
      pesquisadores.forEach((pesquisadorID) => {
        props.dadosDaAPI.map((dado) => {
          if (
            dado.id_pesquisador == pesquisadorID &&
            !isNaN(dado.total_escala) &&
            !todosPesquisadoresId.includes(dado.id_pesquisador)
          ) {
            totalDaEscala += dado.total_escala;
            todosDiasAMais += dado.dias_a_mais;
            todosDiasFaltados += dado.dias_faltados;
            todosDiasTrabalhados += dado.dias_trabalhados;

            diasRestantes =
              totalDaEscala +
              todosDiasAMais -
              todosDiasFaltados -
              todosDiasTrabalhados;
            todosPesquisadoresId.push(dado.id_pesquisador);
          }
        });
      })
    ),
  ];

  // Variáveis de controle
  var left = true;
  var aeroporto = "";

  return (
    <div>
      <div className={styles.BoxesContainer}>
        {/* Linha divisória */}
        <div
          className={`${styles.Fixed} ${
            medicaoSatisfacao.length > 0 ? "" : styles.LineLoading
          }`}
        >
          <Line loading={true} />
        </div>

        {/* Container de BigBoxes */}
        <div className={styles.BigBox}>
          {/* Primeiro BigBox */}
          <BigBox
            Title={"Satisfação"}
            real={
              medicaoSatisfacao.length > 0
                ? medicaoSatisfacao.slice(-2)[0].Realizado /
                  todosDiasTrabalhados
                : 0
            }
            diario={
              medicaoSatisfacao.length > 0
                ? (medicaoSatisfacao.slice(-2)[0].Metas -
                    medicaoSatisfacao.slice(-2)[0].Realizado) /
                  diasRestantes
                : 0
            }
            Percentage={
              medicaoSatisfacao.length > 0
                ? Math.round(
                    (medicaoSatisfacao.slice(-2)[0].Realizado /
                      medicaoSatisfacao.slice(-2)[0].Metas) *
                      100
                  )
                : 0
            }
            subPercentageFeito={
              medicaoSatisfacao.length > 0
                ? medicaoSatisfacao.slice(-2)[0].Realizado
                : 0
            }
            subPercentageTotal={
              medicaoSatisfacao.length > 0
                ? medicaoSatisfacao.slice(-2)[0].Metas
                : 0
            }
          />

          {/* Segundo BigBox */}
          <BigBox
            Title={"Medição"}
            real={
              medicaoSatisfacao.length > 0
                ? medicaoSatisfacao.slice(-2)[1].Realizado /
                  todosDiasTrabalhados
                : 0
            }
            diario={
              medicaoSatisfacao.length > 0
                ? (medicaoSatisfacao.slice(-2)[1].Metas -
                    medicaoSatisfacao.slice(-2)[1].Realizado) /
                  diasRestantes
                : 0
            }
            Percentage={
              medicaoSatisfacao.length > 0
                ? Math.round(
                    (medicaoSatisfacao.slice(-2)[1].Realizado /
                      medicaoSatisfacao.slice(-2)[1].Metas) *
                      100
                  )
                : 0
            }
            subPercentageFeito={
              medicaoSatisfacao.length > 0
                ? medicaoSatisfacao.slice(-2)[1].Realizado
                : 0
            }
            subPercentageTotal={
              medicaoSatisfacao.length > 0
                ? medicaoSatisfacao.slice(-2)[1].Metas
                : 0
            }
          />
        </div>

        {/* Linha divisória */}
        <Line />

        {/* Container de categorias de empresas */}
        <div className={styles.ContainerCategoryCompanyBox}>
          {/* Componente para selecionar o modelo */}
          <SwitchCategory
            selecionarModelo={selecionarModelo}
            modeloSelecionado={modeloSelecionado}
          />

          {/* Container de caixas de empresas */}
          <div className={styles.CompanyBox}>
            {companhias.map((i) => {
              if (i === "Azul" || i === "Gol" || i === "Latam") {
                if (i === "Azul") {
                  var logo = Azul_logo;
                }
                if (i === "Gol") {
                  var logo = Gol_logo;
                }
                if (i === "Latam") {
                  var logo = Latam_logo;
                }
                return (
                  <div key={Date.getTime}>
                    {/* Componente para exibir informações da empresa */}
                    <CompanyBox
                      modelo={modeloSelecionado}
                      logo={logo}
                      compania={i}
                      selecionarCompania={selecionarCompania}
                      companiaSelecionada={companiaSelecionada}
                      selecionarLogo={selecionarLogo}
                    />
                  </div>
                );
              }
            })}
          </div>

          {/* Componente para exibir informações gerais de todas as empresas */}
          <div>
            <AllCompanies
              compania={"agora"}
              selecionarCompania={selecionarCompania}
              selecionarLogo={selecionarLogo}
              companiaSelecionada={companiaSelecionada}
              modelo={modeloSelecionado}
            />
          </div>
        </div>
      </div>

      {companiaSelecionada === "agora" ? (
        <div>
          <div className={styles.ContainerCards}>
            {processos.map((i) => {
              var realizadoAzul = 0;
              var realizadoGol = 0;
              var realizadoLatam = 0;
              var realizadoNA = 0;

              var faltamAzul = 0;
              var faltamGol = 0;
              var faltamLatam = 0;
              var faltamNA = 0;

              var diarioAzul = 0;
              var diarioGol = 0;
              var diarioLatam = 0;
              var diarioNA = 0;

              var realAzul = 0;
              var realGol = 0;
              var realLatam = 0;
              var realNA = 0;

              var metaAzul = 0;
              var metaGol = 0;
              var metaLatam = 0;
              var metaNA = 0;

              var totalEscalaAeroporto = 0;
              var diasAMaisAeroporto = 0;
              var diasFaltados = 0;
              var diasTrabalhados = 0;

              // Mapear dados da API
              props.dadosDaAPI.map((item) => {
                // Armazenar o código do aeroporto
                aeroporto = item.ICAO;

                // Verificar se os critérios correspondem ao item
                if (
                  (item.Pesquisador === props.userSelecionado ||
                    item.ICAO === props.userSelecionado) &&
                  item.Estrato === modeloSelecionado &&
                  item.Processo === i
                ) {
                  // Atualizar variáveis com base nos valores do item
                  totalEscalaAeroporto = item.total_escala_aero;
                  diasAMaisAeroporto = item.dias_a_mais_aero;
                  diasFaltados = item.dias_faltados_aero;
                  diasTrabalhados = item.dias_trabalhados_aero;

                  // Verificar a Companhia do item e atualizar variáveis correspondentes
                  if (item.Companhia === "Azul") {
                    realizadoAzul += item.Realizado;
                    faltamAzul += item.Faltam;
                    diarioAzul += item.média_diária_ideal;
                    realAzul += item.média_diária_real;
                    metaAzul += item.Meta;
                  } else if (item.Companhia === "Gol") {
                    realizadoGol += item.Realizado;
                    faltamGol += item.Faltam;
                    diarioGol += item.média_diária_ideal;
                    realGol += item.média_diária_real;
                    metaGol += item.Meta;
                  } else if (item.Companhia === "Latam") {
                    realizadoLatam += item.Realizado;
                    faltamLatam += item.Faltam;
                    diarioLatam += item.média_diária_ideal;
                    realLatam += item.média_diária_real;
                    metaLatam += item.Meta;
                  } else if (item.Companhia === "N/A") {
                    realizadoNA += item.Realizado;
                    faltamNA += item.Faltam;
                    diarioNA += item.média_diária_ideal;
                    realNA += item.média_diária_real;
                    metaNA += item.Meta;
                  }
                }
              });

              if (modeloSelecionado === "Doméstico") {
                // Calcula a soma dos realizados para todas as companhias
                var somaRealizados =
                  realizadoAzul + realizadoGol + realizadoLatam + realizadoNA;

                // Calcula a soma da meta para Latam (outra companhia)
                var somaMeta = metaLatam * 1;

                // Calcula a quantidade que falta para atingir a meta
                var somaFaltam = somaMeta - somaRealizados;
                if (somaFaltam < 0) {
                  somaFaltam = 0;
                }

                // Calcula a soma da meta para "N/A" (outra companhia)
                var somaMetaNA = metaNA * 1;

                // Calcula a quantidade que falta para atingir a meta para "N/A"
                var somaFaltamNA = somaMetaNA - somaRealizados;
                if (somaFaltamNA < 0) {
                  somaFaltamNA = 0;
                }

                // Verifica condições para renderização do CardLeft ou CardRight
                if (
                  (metaNA > 0 && i === "Embarque") ||
                  (metaNA > 0 && i === "Desembarque")
                ) {
                  var diasRestantesTotal =
                    (totalEscalaAeroporto +
                    diasAMaisAeroporto) -
                    diasFaltados -
                    diasTrabalhados;

                  var diarioUsuario = Math.ceil(
                    metaNA - somaRealizados <= 0 ? 0 : diarioNA
                  );

                  var diarioAeroporto = Math.ceil(
                    metaNA - somaRealizados <= 0
                      ? 0
                      : faltamNA / diasRestantesTotal
                  );

                  var realAeroporto = Math.ceil(
                    somaRealizados / diasTrabalhados
                  );

                  // Alterna entre CardLeft e CardRight

                  
                  console.log("Dias restantes Aeroporto: ",diasRestantesTotal, i)
                  console.log("Faltam ",faltamNA, i)

                  left = !left;
                  return left ? (
                    <div key={Date.getTime} className={styles.ContainerCards}>
                      <CardLeft
                        processo={i}
                        realizados={somaRealizados}
                        faltam={
                          metaNA - somaRealizados < 0
                            ? 0
                            : metaNA - somaRealizados
                        }
                        diario={
                          aeroporto === props.userSelecionado
                            ? diarioAeroporto
                            : diarioUsuario
                        }
                        real={
                          aeroporto === props.userSelecionado
                            ? realAeroporto
                            : realNA
                        }
                        meta={metaNA}
                        imageCompaniaSrc={logoSelecionado}
                      />
                    </div>
                  ) : (
                    <div key={Date.getTime} className={styles.ContainerCards}>
                      <CardRight
                        processo={i}
                        realizados={somaRealizados}
                        faltam={
                          metaNA - somaRealizados < 0
                            ? 0
                            : metaNA - somaRealizados
                        }
                        diario={
                          aeroporto === props.userSelecionado
                            ? diarioAeroporto
                            : diarioUsuario
                        }
                        real={
                          aeroporto === props.userSelecionado
                            ? realAeroporto
                            : realNA
                        }
                        meta={metaNA}
                        imageCompaniaSrc={logoSelecionado}
                      />
                    </div>
                  );
                }

                // Verifica se a meta "N/A" é maior que 0 e não é "Embarque" ou "Desembarque"
                if (metaNA > 0 && i !== "Embarque" && i !== "Desembarque") {
                  // Alterna entre CardLeft e CardRight
                  left = !left;
                  return left ? (
                    <div key={Date.getTime} className={styles.ContainerCards}>
                      <CardLeft
                        processo={i}
                        realizados={somaRealizados}
                        faltam={
                          metaNA - somaRealizados < 0
                            ? 0
                            : metaNA - somaRealizados
                        }
                        diario={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioNA / diasRestantes)
                            : diarioNA
                        }
                        real={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realNA / todosDiasTrabalhados)
                            : realNA
                        }
                        meta={somaMetaNA}
                        imageCompaniaSrc={logoSelecionado}
                      />
                    </div>
                  ) : (
                    <div key={Date.getTime} className={styles.ContainerCards}>
                      <CardRight
                        processo={i}
                        realizados={somaRealizados}
                        faltam={
                          metaNA - somaRealizados < 0
                            ? 0
                            : metaNA - somaRealizados
                        }
                        diario={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioNA / diasRestantes)
                            : diarioNA
                        }
                        real={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realNA / todosDiasTrabalhados)
                            : realNA
                        }
                        meta={somaMetaNA}
                        imageCompaniaSrc={logoSelecionado}
                      />
                    </div>
                  );
                }

                // Verifica se há metas para outras companhias além de "N/A"
                if (
                  (metaAzul > 0 && i !== "Embarque" && i !== "Desembarque") ||
                  (metaGol > 0 && i !== "Embarque" && i !== "Desembarque") ||
                  (metaLatam > 0 && i !== "Embarque" && i !== "Desembarque")
                ) {
                  // Alterna entre CardGeralLeft e CardGeralRight
                  left = !left;
                  return left ? (
                    <div key={Date.getTime}>
                      <CardGeralLeft
                        processo={i}
                        companiaAzul={Azul_logo}
                        companiaGol={Gol_logo}
                        companiaLatam={Latam_logo}
                        realizadoAzul={realizadoAzul}
                        realizadoGol={realizadoGol}
                        realizadoLatam={realizadoLatam}
                        faltamAzul={
                          metaAzul - realizadoAzul < 0
                            ? 0
                            : metaAzul - realizadoAzul
                        }
                        faltamGol={
                          metaGol - realizadoGol < 0
                            ? 0
                            : metaGol - realizadoGol
                        }
                        faltamLatam={
                          metaLatam - realizadoLatam < 0
                            ? 0
                            : metaLatam - realizadoLatam
                        }
                        diarioAzul={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioAzul / diasRestantes)
                            : diarioAzul
                        }
                        diarioGol={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioGol / diasRestantes)
                            : diarioGol
                        }
                        diarioLatam={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioLatam / diasRestantes)
                            : diarioLatam
                        }
                        realAzul={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realAzul / todosDiasTrabalhados)
                            : realAzul
                        }
                        realGol={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realGol / todosDiasTrabalhados)
                            : realGol
                        }
                        realLatam={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realLatam / todosDiasTrabalhados)
                            : realLatam
                        }
                        metaAzul={metaAzul}
                        metaGol={metaGol}
                        metaLatam={metaLatam}
                      />
                    </div>
                  ) : (
                    <div key={Date.getTime}>
                      <CardGeralRight
                        processo={i}
                        companiaAzul={Azul_logo}
                        companiaGol={Gol_logo}
                        companiaLatam={Latam_logo}
                        realizadoAzul={realizadoAzul}
                        realizadoGol={realizadoGol}
                        realizadoLatam={realizadoLatam}
                        faltamAzul={
                          metaAzul - realizadoAzul < 0
                            ? 0
                            : metaAzul - realizadoAzul
                        }
                        faltamGol={
                          metaGol - realizadoGol < 0
                            ? 0
                            : metaGol - realizadoGol
                        }
                        faltamLatam={
                          metaLatam - realizadoLatam < 0
                            ? 0
                            : metaLatam - realizadoLatam
                        }
                        diarioAzul={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioAzul / diasRestantes)
                            : diarioAzul
                        }
                        diarioGol={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioGol / diasRestantes)
                            : diarioGol
                        }
                        diarioLatam={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioLatam / diasRestantes)
                            : diarioLatam
                        }
                        realAzul={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realAzul / todosDiasTrabalhados)
                            : realAzul
                        }
                        realGol={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realGol / todosDiasTrabalhados)
                            : realGol
                        }
                        realLatam={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realLatam / todosDiasTrabalhados)
                            : realLatam
                        }
                        metaAzul={metaAzul}
                        metaGol={metaGol}
                        metaLatam={metaLatam}
                      />
                    </div>
                  );
                }
              }

              if (modeloSelecionado === "Internacional") {
                // Calcula a soma dos realizados para todas as companhias
                var somaRealizados =
                  realizadoAzul + realizadoGol + realizadoLatam + realizadoNA;

                // Calcula a soma da meta para "N/A"
                var somaMeta = metaNA * 1;

                // Calcula a quantidade que falta para atingir a meta
                var somaFaltam = somaMeta - somaRealizados;

                if (somaFaltam < 0) {
                  somaFaltam = 0;
                }

                // Verifica se há metas para outras companhias além de "N/A"
                if (
                  metaAzul > 0 ||
                  metaGol > 0 ||
                  metaLatam > 0 ||
                  metaNA > 0
                ) {
                  // Inverte o valor de "left" para alternar entre renderizar CardLeft e CardRight
                  left = !left;

                  // Verifica se a variável "left" é verdadeira
                  return left ? (
                    // Renderiza um CardLeft com as informações do processo atual
                    <div key={Date.getTime} className={styles.ContainerCards}>
                      <CardLeft
                        processo={i}
                        realizados={somaRealizados}
                        faltam={
                          somaMeta - somaRealizados < 0
                            ? 0
                            : somaMeta - somaRealizados
                        }
                        diario={
                          // Calcula a média diária com base na situação do usuário selecionado e da companhia
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioNA / diasRestantes)
                            : diarioNA
                        }
                        real={
                          // Calcula a média diária real com base na situação do usuário selecionado e da companhia
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realNA / diasRestantes)
                            : realNA
                        }
                        meta={somaMeta}
                        imageCompaniaSrc={logoSelecionado}
                      />
                    </div>
                  ) : (
                    // Caso "left" seja falso, renderiza um CardRight com as mesmas informações
                    <div key={Date.getTime} className={styles.ContainerCards}>
                      <CardRight
                        processo={i}
                        realizados={somaRealizados}
                        faltam={
                          somaMeta - somaRealizados < 0
                            ? 0
                            : somaMeta - somaRealizados
                        }
                        diario={
                          // Calcula a média diária com base na situação do usuário selecionado e da companhia
                          aeroporto === props.userSelecionado
                            ? Math.ceil(diarioNA / diasRestantes)
                            : diarioNA
                        }
                        real={
                          // Calcula a média diária real com base na situação do usuário selecionado e da companhia
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realNA / diasTrabalhados)
                            : realNA
                        }
                        meta={somaMeta}
                        imageCompaniaSrc={logoSelecionado}
                      />
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>
      ) : (
        <div className={styles.ContainerCards}>
          {props.dadosDaAPI.map((item) => {
            // Verifica se o item atende aos critérios para exibição de cards no modo Doméstico
            if (
              (item.Pesquisador === props.userSelecionado ||
                item.ICAO === props.userSelecionado) &&
              item.Companhia === companiaSelecionada &&
              item.Estrato === modeloSelecionado &&
              item.Processo !== "Embarque" &&
              item.Processo !== "Desembarque" &&
              modeloSelecionado === "Doméstico"
            ) {
              // Alterna a exibição entre CardLeft e CardRight com base na variável "left"
              left = !left;
              return left ? (
                // Renderiza um CardLeft com as informações do item
                <div key={Date.getTime} className={styles.ContainerCards}>
                  <CardLeft
                    estrato={modeloSelecionado}
                    processo={item.Processo}
                    realizados={item.Realizado}
                    faltam={
                      item.Meta - item.Realizado < 0
                        ? 0
                        : item.Meta - item.Realizado
                    }
                    diario={Math.ceil(
                      aeroporto === props.userSelecionado
                        ? Math.ceil(item.faltam / diasRestantes)
                        : item.média_diária_ideal
                    )}
                    real={Math.ceil(
                      aeroporto === props.userSelecionado
                        ? Math.ceil(item.Realizado / todosDiasTrabalhados)
                        : item.média_diária_real
                    )}
                    meta={item.Meta}
                    imageCompaniaSrc={logoSelecionado}
                  />
                </div>
              ) : (
                // Renderiza um CardRight com as informações do item
                <div key={Date.getTime} className={styles.ContainerCards}>
                  <CardRight
                    estrato={modeloSelecionado}
                    processo={item.Processo}
                    realizados={item.Realizado}
                    faltam={
                      item.Meta - item.Realizado < 0
                        ? 0
                        : item.Meta - item.Realizado
                    }
                    diario={Math.ceil(
                      aeroporto === props.userSelecionado
                        ? Math.ceil(item.faltam / diasRestantes)
                        : item.média_diária_ideal
                    )}
                    real={Math.ceil(
                      aeroporto === props.userSelecionado
                        ? Math.ceil(item.Realizado / todosDiasTrabalhados)
                        : item.média_diária_real
                    )}
                    meta={item.Meta}
                    imageCompaniaSrc={logoSelecionado}
                  />
                </div>
              );
            }
            // Verifica se o item atende aos critérios para alterar a companhia selecionada no modo Internacional
            if (
              (item.Pesquisador === props.userSelecionado ||
                item.ICAO === props.userSelecionado) &&
              item.Companhia === companiaSelecionada &&
              modeloSelecionado === "Internacional"
            ) {
              // Define "companiaSelecionada" como "agora"
              setCompaniaSelecionada("agora");
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Body;
