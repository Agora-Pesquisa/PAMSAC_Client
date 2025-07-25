import React, { useState } from "react";
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

const Body = (props) => {
  setTimeout(function () {
    window.location.reload(1);
  }, 60000 * 30);
  const [companiaSelecionada, setCompaniaSelecionada] = useState("agora");
  const [logoSelecionado, setLogoSelecionado] = useState(agora_logo);
  const [modeloSelecionado, setModeloSelecionado] = useState("Doméstico");

  const selecionarCompania = (compania) => {
    setCompaniaSelecionada(compania);
  };

  const selecionarLogo = (compania) => {
    setLogoSelecionado(compania);
  };

  const selecionarModelo = (modelo) => {
    setModeloSelecionado(modelo);
  };

  const processos = [...new Set(props.dadosDaAPI.map((item) => item.Processo))];
  const companhias = [
    ...new Set(props.dadosDaAPI.map((item) => item.Companhia)),
  ];
  const pesquisadores = [
    ...new Set(props.dadosDaAPI.map((item) => item.id_pesquisador)),
  ];

  const dataMedicaoSatisfacao = [
    ...new Set(props.dadosDaAPI.map((item) => item)),
  ].slice(-3);

  const dataAtualizacao = dataMedicaoSatisfacao[0];
  const medicao = dataMedicaoSatisfacao[2];
  const satisfacao = dataMedicaoSatisfacao[1];

  // console.log("User Selecionado: ",props.userSelecionado);
  // console.log("Data Medição e Satisfação: ", dataMedicaoSatisfacao);
  // console.log("Medição e Satisfação:", medicao, satisfacao);

  var todosPesquisadoresId = [];
  var todosDiasAMais = 0;
  var todosDiasFaltados = 0;
  var todosDiasTrabalhados = 0;
  var totalDaEscala = 0;
  var diasRestantes = 0;

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

  var left = true;
  var aeroporto = "";

  return (
    <div>
      <div className={styles.BoxesContainer}>
        {/* Linha divisória */}
        <div
          className={`${styles.Fixed} ${
            dataMedicaoSatisfacao.length > 0 ? "" : styles.LineLoading
          }`}
        >
          <Line loading={true} />
        </div>

        {/* Container de BigBoxes */}
        <div className={styles.BigBox}>
          {/* Primeiro BigBox */}
          <BigBox
            Title={"Medição"}
            real={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === satisfacao["ICAO"]
                  ? satisfacao.realizado_aero / todosDiasTrabalhados
                  : satisfacao.realizado_pesquisador / todosDiasTrabalhados
                : 0
            }
            diario={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === satisfacao["ICAO"]
                  ? (satisfacao.meta_aero - satisfacao.realizado_aero) /
                    diasRestantes
                  : (satisfacao.meta_pesq - satisfacao.realizado_pesquisador) /
                    diasRestantes
                : 0
            }
            Percentage={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === satisfacao["ICAO"]
                  ? Math.round(
                      (satisfacao.realizado_aero / satisfacao.meta_aero) * 100
                    )
                  : Math.round(
                      (satisfacao.realizado_pesquisador /
                        satisfacao.meta_pesq) *
                        100
                    )
                : 0
            }
            subPercentageFeito={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === satisfacao["ICAO"]
                  ? satisfacao.realizado_aero
                  : satisfacao.realizado_pesquisador
                : 0
            }
            subPercentageTotal={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === satisfacao["ICAO"]
                  ? satisfacao.meta_aero
                  : satisfacao.meta_pesq
                : 0
            }
          />

          {/* Segundo BigBox */}
          <BigBox
            Title={"Satisfação"}
            real={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === medicao["ICAO"]
                  ? medicao.realizado_aero / todosDiasTrabalhados
                  : medicao.realizado_pesquisador / todosDiasTrabalhados
                : 0
            }
            diario={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === medicao["ICAO"]
                  ? (satisfacao.meta_aero - medicao.realizado_aero) /
                    diasRestantes
                  : (medicao.meta_pesq - medicao.realizado_pesquisador) /
                    diasRestantes
                : 0
            }
            Percentage={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === medicao["ICAO"]
                  ? Math.round(
                      (medicao.realizado_aero / medicao.meta_aero) * 100
                    )
                  : Math.round(
                      (medicao.realizado_pesquisador / medicao.meta_pesq) * 100
                    )
                : 0
            }
            subPercentageFeito={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === medicao["ICAO"]
                  ? medicao.realizado_aero
                  : medicao.realizado_pesquisador
                : 0
            }
            subPercentageTotal={
              dataMedicaoSatisfacao.length > 0
                ? props.userSelecionado === medicao["ICAO"]
                  ? medicao.meta_aero
                  : medicao.meta_pesq
                : 0
            }
          />
        </div>

        {/* Linha divisória */}
        <Line />

        <div className={styles.ContainerCategoryCompanyBox}>
          {/* Componente para selecionar a categoria */}
          <SwitchCategory
            selecionarModelo={selecionarModelo}
            modeloSelecionado={modeloSelecionado}
          />

          {/* Container com as companias */}
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
              var metaAzul = 0;
              var metaGol = 0;
              var metaLatam = 0;
              var metaNA = 0;

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

              var totalEscalaAeroporto = 0;
              var diasAMaisAeroporto = 0;
              var diasFaltados = 0;
              var diasTrabalhados = 0;

              props.dadosDaAPI.map((item) => {
                aeroporto = item.ICAO;

                if (
                  (item.Pesquisador === props.userSelecionado ||
                    item.ICAO === props.userSelecionado) &&
                  item.Estrato === modeloSelecionado &&
                  item.Processo === i
                ) {
                  totalEscalaAeroporto = item.total_escala_aero;
                  diasAMaisAeroporto = item.dias_a_mais_aero;
                  diasFaltados = item.dias_faltados_aero;
                  diasTrabalhados = item.dias_trabalhados_aero;
                  
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
                var somaRealizados =
                  realizadoAzul + realizadoGol + realizadoLatam + realizadoNA;
                var somaFaltam = metaLatam - somaRealizados;
                if (somaFaltam < 0) {
                  somaFaltam = 0;
                }
                var somaMetaNA = metaNA * 1;
                var somaFaltamNA = somaMetaNA - somaRealizados;
                if (somaFaltamNA < 0) {
                  somaFaltamNA = 0;
                }
                if (
                  (metaNA > 0 && i === "Embarque") ||
                  (metaNA > 0 && i === "Desembarque")
                ) {
                  var diasRestantesTotal =
                    totalEscalaAeroporto +
                    diasAMaisAeroporto -
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
                
                if (metaNA > 0 && i !== "Embarque" && i !== "Desembarque") {
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
                if (
                  (metaAzul > 0 && i !== "Embarque" && i !== "Desembarque") ||
                  (metaGol > 0 && i !== "Embarque" && i !== "Desembarque") ||
                  (metaLatam > 0 && i !== "Embarque" && i !== "Desembarque")
                ) {
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
                var somaRealizados =
                  realizadoAzul + realizadoGol + realizadoLatam + realizadoNA;
                var somaFaltam = metaNA - somaRealizados;

                if (somaFaltam < 0) {
                  somaFaltam = 0;
                }
                if (
                  metaAzul > 0 ||
                  metaGol > 0 ||
                  metaLatam > 0 ||
                  metaNA > 0
                ) {
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
                            ? Math.ceil(realNA / diasRestantes)
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
                            ? Math.ceil(diarioNA / diasRestantes)
                            : diarioNA
                        }
                        real={
                          aeroporto === props.userSelecionado
                            ? Math.ceil(realNA / diasTrabalhados)
                            : realNA
                        }
                        meta={metaNA}
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
            if (
              (item.Pesquisador === props.userSelecionado ||
                item.ICAO === props.userSelecionado) &&
              item.Companhia === companiaSelecionada &&
              item.Estrato === modeloSelecionado &&
              item.Processo !== "Embarque" &&
              item.Processo !== "Desembarque" &&
              modeloSelecionado === "Doméstico"
            ) {
              left = !left;
              return left ? (
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
            if (
              (item.Pesquisador === props.userSelecionado ||
                item.ICAO === props.userSelecionado) &&
              item.Companhia === companiaSelecionada &&
              modeloSelecionado === "Internacional"
            ) {
              setCompaniaSelecionada("agora");
            }
          })}
        </div>
      )}
      <div className={styles.ultimaAtualizacao}>
          Última Atualização : {dataMedicaoSatisfacao.length > 0
            ? props.userSelecionado === dataAtualizacao["ICAO"]
              ? dataAtualizacao["data_fim_aero"]
              : dataAtualizacao["data_fim_pesq"]
            : 0}
      </div>
    </div>
  );
};

export default Body;
