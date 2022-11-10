import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/actions";
import moment from "moment";

const Main = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.data.data);
  const [key, setKey] = useState()

  const listObj = {};
  const listArrays = [] 

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  function filterList() {
    for (let i = 0; i <= data?.list.length; i++) {

      const date = data.list[i]?.dt_txt?.split(" ")[0];

      if (listObj[date]) {  
        listObj[date].push(data.list[i]);
      } else {
        listObj[date] = [data.list[i]];
      }
    } 

    for (const key of Object.keys(listObj)) {
      const result = listObj[key];
      listArrays.push(result)
    }
  }
  filterList();

  listArrays.pop()

  function showMoreFunc() {
    const filteredData = listArrays?.filter(el => moment(el[0].dt_txt).format("LL") === key)
    return filteredData
  }


  return (
    <Wrapper>
      <div className="weathers-container">
        <div className="todays-weather">
          <p className="date">{moment(data?.list[0].dt_txt).format("LLL")}</p>
          <h4 className="city">{data?.city.name}</h4>
          <p className="degree">{data?.list[0].main.temp.toFixed(0)}℃</p>
          <p className="feelslike">{data?.list[0].weather[0].description}</p>
          <div className="todays-weather_info">
            <div className="line"></div>
            <div className="infos">
              <div>
                <p>{data?.list[0].wind.speed}m/s SW</p>
                <p>Wind Gust: {data?.list[0].wind.gust}</p>
              </div>
              <div>
                <p>Humidity: {data?.list[0].main.humidity}%</p>
                <p>1007hPa</p>
              </div>
              <div>
                <p>Pressure: {data?.list[0].main.pressure}</p>
                <p>Visibility: {data?.list[0].visibility / 1000}km</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="otherdays-weather">
            {listArrays.map((item) => {
              return (
                <div className="otherdays-container"
                    onMouseEnter={() => setKey(moment(item[0].dt_txt).format("LL"))}
                    onMouseLeave={() => setKey()}
                >
                    <p>{moment(item[0].dt_txt).format('ddd')}</p>
                    <img src={`http://openweathermap.org/img/wn/${item[0].weather[0].icon}@2x.png`} alt="" />
                    <p>{item[0]?.main.temp.toFixed(0)}℃</p>
                </div>
              )
            })}
            </div>

            <div className="otherdays-moreinfo">
                {showMoreFunc()[0]?.map(el => {
                  return(
                    <div className="moreinfo-container">
                      <p className="moreinfo-time">{(moment(el.dt_txt).format("LT"))}</p>
                      <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="" />
                      <div className="moreinfo-degree_container">
                        <p className="moreinfo_degree">{el.main.temp_max.toFixed(0)}℃</p> /
                        <p className="moreinfo_degree">{el.main.temp_min.toFixed(0)}℃</p>
                      </div>
                    </div>
                  )
                })} 
            </div> 
        </div>
      </div>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  padding: 50px 70px;
  background-color: #f9f9f9;
  min-height: 100vh;

  .weathers-container {
    display: grid;
    grid-template-columns: 350px auto;
    justify-content: space-between;
    background-color: red;
  }

  .todays-weather { 
    height: 330px;
    padding: 30px 30px 0 30px;
    box-shadow: 0px 5px 8px 0px rgba(34, 30, 30, 0.2);
    /* width: 350px; */

    .date {
    }

    .city {
      margin: 15px 0 25px 0;
      font-size: 25px;
    }

    .degree {
      font-size: 35px;
    }

    .feelslike {
      margin: 10px 0 10px 0;
    }

    .todays-weather_info {
      display: flex;
      gap: 30px;

      .line {
        background-color: orange;
        width: 2px;
        height: 65px;
      }

      .infos {
        div {
          display: flex;
          gap: 30px;
          margin-bottom: 5px;
        }
      }
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .otherdays-weather {
    display: flex;
    gap: 50px;
    
    .otherdays-container {
      width: 120px;
      min-height: 150px;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 15px 20px;
      margin-bottom: 20px;

      cursor: pointer;
      background-color: #fff;
      border: 1px solid white;

      &:hover {
        border: 1px solid #c2c0c0;
      }
    }
  }

  .otherdays-moreinfo {
    display: flex;
    gap: 20px;
    padding: 10px;
    background-color: ${({key}) => (key ? "white" : "transparent")};

      .moreinfo-container {

        .moreinfo-time {
          /* color: white; */
          font-size: 18px;
        }

        .moreinfo-degree_container {
          display: flex;
          gap: 5px;
        }
      }
  }
`;
