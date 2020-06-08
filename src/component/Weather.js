import React, {useEffect} from "react";
import { Gradient } from "react-gradient";
import "../css/Weather.css";

import config from '../config/config';

import axios from "axios";
import Cookies from 'universal-cookie';

let weatherOption = {
    Thunderstorm: {
        gradient: [["#544a7d", "#ffd452"]],
        title: "태풍",
        subTitle: "외출을 자제하세요",
        icon: "Thunderstorm.png",
    },
    Drizzle: {
        gradient: [["#373b44", "#4286f4"]],
        title: "이슬비",
        subTitle: "우산을 챙기세요",
        icon: "Rain.png",
    },
    Rain: {
        gradient: [["#2980b9", "#6dd5fa"]],
        title: "비",
        subTitle: "우산을 챙기세요",
        icon: "Rain.png",
    },
    Snow: {
        gradient: [["#005aa7", "#fffde4"]],
        title: "눈",
        subTitle: "우산을 챙기세요",
        icon: "Snow.png",
    },
    Clear: {
        gradient: [["#ff512f", "#f09819"]],
        title: "맑음",
        subTitle: "화창한 날씨입니다",
        icon: "Clear.png",
    },
    Clouds: {
        gradient: [["#304352", "#d7d2cc"]],
        title: "흐림",
        subTitle: "우산을 챙기면 유용합니다",
        icon: "Clouds.png",
    },
    Atmosphere: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "Atmosphere",
        subTitle: "가시거리에 주의하세요",
        icon: "Haze.png",
    },
    Mist: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "안개",
        subTitle: "가시거리에 주의하세요",
        icon: "Haze.png",
    },
    Haze: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "안개",
        subTitle: "가시거리에 주의하세요",
        icon: "Haze.png",
    },
    Mist: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "안개",
        subTitle: "가시거리에 주의하세요",
        icon: "Haze.png",
    },
    Smoke: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "안개",
        subTitle: "가시거리에 주의하세요",
        icon: "Haze.png",
    },
    Dust: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "미세먼지",
        subTitle: "마스크를 착용하세요",
        icon: "Sand.png",
    },
    Fog: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "안개",
        subTitle: "가시거리에 주의하세요",
        icon: "Haze.png",
    },
    Sand: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "황사",
        subTitle: "마스크를 착용하세요",
        icon: "Sand.png",
    },
    Ash: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "안개",
        subTitle: "가시거리에 주의하세요",
        icon: "Haze.png",
    },
    Squall: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "돌풍",
        subTitle: "바람에 주의하세요",
        icon: "Haze.png",
    },
    Tornado: {
        gradient: [["#bdc3c7", "#2c3e50"]],
        title: "안개",
        subTitle: "토네이도!! 외출 금지!!",
        icon: "Tornado.png",
    },
};

export default function Weather({ temp, weather, country, temp_max, temp_min, humidity, feels_like }) {
    const cookies = new Cookies();
    
    useEffect(() => {
        let headerTitle = document.querySelector('.headTitle');
        headerTitle.innerText = '오늘의 날씨';
        renderWeather();
    });

    const renderWeather = async () => {
        try{   
            await axios
            .get(config.webHost + "/weather" /*'http://localhost:3000/weather'*/, {
                params: {
                    token: cookies.get('user'),
                }
            })
            .then(function (res) {
                console.log(res);
            });
        } catch (err) {
            alert('로그인 이후 사용 가능합니다');
            window.location.href = './';
        }
        
        let currentTemp = document.querySelector('.temp');
        let tempHtml = '';
        const { innerWidth: width } = window;

        if(width>414)
        {
            tempHtml =`현재기온: ${temp}℃ <br />
            최저기온: ${temp_min}℃ / 최대기온: ${temp_max}℃ <br />
            습도: ${humidity}% <br /><br />
            체감온도: ${feels_like}℃`;
            currentTemp.innerHTML=tempHtml;
        }
        else
        {
            tempHtml = `${temp}℃`;
            currentTemp.innerHTML=tempHtml;
        }
    }

    return (
        <Gradient
            gradients={weatherOption[weather].gradient} // required
            className="weatherGradient"
        >
            <div className="harfContainer">
                <div>
                    <img src={require(`../img/${weatherOption[weather].icon}`)} height="60" width="60" />
                </div>
                <span className="temp">{temp}℃</span>
            </div>
            <div className="harfContainer">
                <span className="country">{country}</span>
            </div>
            <div className="harfContainer bottom">
                <span className="title">{weatherOption[weather].title}</span>
                <span className="subTitle">{weatherOption[weather].subTitle}</span>
            </div>
        </Gradient>
    );
}
