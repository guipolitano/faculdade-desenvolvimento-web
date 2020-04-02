import React, { useEffect, useState } from "react";
import { Row, Card, Col, Tabs } from "antd";
import imgMao from "./img/img1-maos.png";
import imgTosse from "./img/img2-tosse.png";
import imgPessoas from "./img/img3-pessoas.png";
import imgJanela from "./img/img4-janela.png";
import imgObjetos from "./img/img5-objetos.png";
import axios from "axios";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts"
import "./App.css";
var moment = require("moment");
require("moment/locale/pt-br");
const { TabPane } = Tabs;
const columnStyle = {
  display:"flex", 
  flexDirection:"column", 
  justifyContent: "center", 
  alignItems: "center",
  fontSize: "18px"
}
const App = () => {  
  const [resultado, setResultado] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {      
      let codes = ["BR", "CN", "IT", "ES", "US"];
      const arrayResult = await fetchPais(codes);
      tratarResposta(arrayResult);      
    }       
    fetchData();
  }, []);

  const fetchPais = async codesFiltrado => {
    let result = [];
    for (const code in codesFiltrado) {
      if (codesFiltrado.hasOwnProperty(code)) {
        const e = codesFiltrado[code];
        let res = await axios(`https://corona-api.com/countries/${e}`);
        result.push(res.data.data);
      }
    }
    return result;
  }; 

  const tratarResposta = (data) => {
    let arrayData = [];
    let arrayDias = [];

    data.map((e)=>{
      e.timeline.map((el) => {
        el.date = moment(el.date).toDate();
        if (!arrayDias.includes(moment(el.date).format("DD/MM/YYYY"))) {
          arrayDias.push(moment(el.date).format("DD/MM/YYYY"));
          arrayData.push({ dia: el.date });
        }
        const temp = arrayData.find((ele)=>moment(ele.dia).format("DD/MM/YYYY") === moment(el.date).format("DD/MM/YYYY"));
        const indexof = arrayData.indexOf(temp);
        arrayData[indexof] = { ...temp, [`confirmados${e.name}`]: el.confirmed };
        return el;
      })
      return e;
    })    
    let newArray = [...arrayData].sort((a,b)=>{
      if (moment(a.dia).toDate() < moment(b.dia).toDate()) return 1;
      if (moment(b.dia).toDate() < moment(a.dia).toDate()) return -1;
      return 0;
    }).map(e=>({...e, dia: moment(e.dia).format("DD/MM/YYYY")}))
    .map(el=>{
      // debugger;
      if(!el.confirmadosBrazil){
        el.confirmadosBrazil = 0;
      }
      if(!el.confirmadosChina){
        el.confirmadosChina = 0;
      }
      if(!el.confirmadosUSA){
        el.confirmadosUSA = 0;
      }
      if(!el.confirmadosItaly){
        el.confirmadosItaly = 0;
      }
      if(!el.confirmadosSpain){
        el.confirmadosSpain = 0;
      }
      return el;
    })
    setResultado(newArray);
  }
  return (
    <React.Fragment>
      <Row style={{ marginTop: "40px" }} align="middle" justify="center">
        <Col span={20} align="center">
          <Card>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={resultado}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="dia" reversed />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="linear"
                  dataKey="confirmadosBrazil"
                  stroke="#1fd551"
                  connectNulls
                />
                <Line
                  type="linear"
                  dataKey="confirmadosSpain"
                  stroke="#d27808"
                  connectNulls
                />
                <Line
                  type="linear"
                  dataKey="confirmadosItaly"
                  stroke="#800080"
                  connectNulls
                />
                <Line
                  type="linear"
                  dataKey="confirmadosChina"
                  stroke="#b30000"
                  connectNulls
                />
                <Line
                  type="linear"
                  dataKey="confirmadosUSA"
                  stroke="#2881d8"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }} align="middle" justify="center">
        <Col span={20}>
          <Card>
            <Tabs type="card">
              <TabPane tab="O que é a COVID-19" key="1">
                <p style={{ fontSize: "30px" }}>
                  Coronavírus é uma família de vírus que causam infecções
                  respiratórias. O novo agente do coronavírus foi descoberto em
                  31/12/19 após casos registrados na China. Provoca a doença
                  chamada de coronavírus (COVID-19). Os primeiros coronavírus
                  humanos foram isolados pela primeira vez em 1937. No entanto,
                  foi em 1965 que o vírus foi descrito como coronavírus, em
                  decorrência do perfil na microscopia, parecendo uma coroa. A
                  maioria das pessoas se infecta com os coronavírus comuns ao
                  longo da vida, sendo as crianças pequenas mais propensas a se
                  infectarem com o tipo mais comum do vírus. Os coronavírus mais
                  comuns que infectam humanos são o alpha coronavírus 229E e
                  NL63 e beta coronavírus OC43, HKU1...
                </p>
              </TabPane>
              <TabPane tab="Como Prevenir" key="2">
                <Row gutter={8} align="middle" justify="center">
                  <Col sm={24} lg={4} style={columnStyle}>
                    <img src={imgMao} style={{height: "140px"}} alt="Imagem mãos"></img>
                    <p>Lave as mãos com água e sabão ou use álcool em gel.</p>
                  </Col>
                  <Col sm={24} lg={4} style={columnStyle}>
                    <img src={imgTosse} style={{height: "140px"}} alt="Imagem tosse"></img>
                    <p>Cubra o nariz e boca ao espirrar ou tossir.</p>
                  </Col>
                  <Col sm={24} lg={4} style={columnStyle}>
                    <img src={imgPessoas} style={{height: "140px"}} alt="Imagem pessoas"></img>
                    <p>Evite aglomerações se estiver doente.</p>
                  </Col>
                  <Col sm={24} lg={4} style={columnStyle}>
                    <img src={imgJanela} style={{height: "140px"}} alt="Imagem janela"></img>
                    <p>Mantenha os ambientes bem ventilados.</p>
                  </Col>
                  <Col sm={24} lg={4} style={columnStyle}>
                    <img src={imgObjetos} style={{height: "140px"}} alt="Imagem objetos"></img>
                    <p>Não compartilhe objetos pessoais.</p>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default App;
