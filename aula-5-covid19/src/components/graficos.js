import React, { useState, useEffect } from 'react';
import { Row, Card, Col, PageHeader, Statistic, Select, Button } from "antd";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import axios from "axios";

const Graficos = () => {
    const [estatistica, setEstatistica] = useState({
        infectados: 0, 
        mortos: 0, 
        curados: 0
    });
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [paises, setPaises] = useState([]);

    useEffect(()=>{
       fetchApi("all").then((result) => {
            setEstatistica({infectados: result.cases, mortos: result.deaths, curados: result.recovered});
        })
       fetchApi("countries").then((result) => {
            let country = result.map((e, index) => ({
              title: e.country,
              label: e.country,
              value: e.country,
              key: index,
            }));
            setPaises(country);
        })
    }, []);

    const handleSearch = () => {
        let pesquisa = search.toString();
        fetchApi("v2/historical/"+pesquisa).then((result) => {
          let dias = [];
          let tempArray = [];
          let casos = [];
          let count = 0;
          if(!result.length){                
            dias = Object.keys(result.timeline.cases);
            casos = Object.values(result.timeline.cases);
            dias.map((e, index)=>tempArray.push({[result.country]: casos[index], dia: moment(e).format("DD/MM/YYYY")}));
          }else{
            dias = Object.keys(result[0].timeline.cases);
            result.map((e)=>{
              casos = Object.values(e.timeline.cases);
              dias.map((el, index) =>{
                if(count > 0){
                  tempArray[index] = {
                    ...tempArray[index],
                    [e.country]: casos[index],
                  };
                }else{
                  tempArray.push({
                    [e.country]: casos[index],
                    dia: moment(el).format("DD/MM/YYYY"),
                  })}
                  return el;
                }
              );
              count++;
              return e;
            })
          }
          setData(tempArray);
        });        
    }

    const fetchApi = async (param) => {
        const resultado = await axios(`https://corona.lmao.ninja/${param}`);
        return resultado.data;
    }
    const renderLine = () => search.map((e) => <Line type="linear" dataKey={e} stroke={'#'+Math.floor(Math.random()*16777215).toString(16)} connectNulls />);
  return (
    <React.Fragment>
      <Row style={{ marginTop: "40px" }} align="middle" justify="center">
        <Col span={20} align="center">
          <Row gutter={[8, 16]}>
            <Col span={20} align="center">
              <Card>
                <PageHeader title="COVID-19 NO MUNDO">
                  <Row>
                    <Col span={8}>
                      <Statistic
                        title="Infectados"
                        value={estatistica.infectados}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        valueStyle={{ color: "green" }}
                        title="Curados"
                        value={estatistica.curados}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        valueStyle={{ color: "red" }}
                        title="Mortos"
                        value={estatistica.mortos}
                      />
                    </Col>
                  </Row>
                </PageHeader>
              </Card>
            </Col>
          </Row>
          <Row gutter={[8, 16]}>
            <Col span={20} align="center">
              <Card>
                <Row gutter={[6, 16]} justify="start">
                  <Col
                    span={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <label>Selecione os Países</label>
                    <Select
                      options={paises}
                      mode="tags"
                      style={{ width: "100%" }}
                      allowClear
                      tokenSeparators=","
                      onChange={(e) => setSearch(e)}
                    />
                  </Col>
                  <Col
                    span={5}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <br />
                    <Button onClick={handleSearch}>Pesquisar</Button>
                  </Col>
                </Row>
                <Row gutter={[8, 16]}>
                  <Col span={24}>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="dia" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {data.length > 0 && renderLine()}
                      </LineChart>
                    </ResponsiveContainer>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Graficos;