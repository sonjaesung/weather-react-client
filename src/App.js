import React, { Fragment, useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";

import Header from "./component/Header";
import LeftMenu from "./component/LeftMenu";
import Footer from "./component/Footer";

import Home from "./component/Home";
import Join from "./component/Join";
import FindEmail from './component/FindEmail';
import ResetPw from './component/ResetPw';
import Loading from "./component/Loading";
import Weahter from "./component/Weather";
import TodayEnglish from "./component/TodayEnglish";
import Bucketlist from "./component/Bucketlist";

import axios from "axios";

let weatherAPIkey = "f5743327496c233e8201e58a2c6235c2";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [temp, setTemp] = useState("");
    const [weather, setWeather] = useState("");
    const [country, setCountry] = useState("");
    const [temp_max, setTemp_max] = useState("");
    const [temp_min, setTemp_min] = useState("");
    const [humidity, setHumidity] = useState("");
    const [feels_like, setFeels_like] = useState("");

    /*
    state = {
        isLoading: true,
    };
    */

    const getWeather = async (latitude, longitude) => {
        let {
            data: {
                main: { temp, temp_max, temp_min, humidity, feels_like },
                weather,
                sys: { country },
            },
            data,
        } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIkey}&units=metric`
        );

        setTemp(temp);
        setWeather(weather[0].main);
        setCountry(country);
        setTemp_max(temp_max);
        setTemp_min(temp_min);
        setHumidity(humidity);
        setFeels_like(feels_like);
        setIsLoading(false);
        /*
        this.setState({
            isLoading: false,
            temp: temp,
            weather: weather[0].main,
            country: country,
        });
        */
    };

    const getLocation = () => {
        try {
            // http 에서 불가능하기때문에 일단 고정좌표로 출력하고 https 로 변경하거나 좌표리스트 작성예정.
            /*
            navigator.geolocation.getCurrentPosition(async (position) => {
                let {
                    coords: { latitude, longitude },
                } = position;

                console.log(latitude, longitude);
                getWeather(latitude, longitude);
            });
            */
           getWeather(37.5, 127.1);
        } catch (err) {
            alert(err);
        }
    };

    /*
    componentDidMount() {
        getLocation();
    }
    */

    // componentDidMount, componentDidUpdate와 같은 방식으로
    // isLoading 가 변경될 때만 적용.
    useEffect(() => {
        getLocation();
    }, [isLoading]);

    /*
    render() {
        let { isLoading, temp, weather, country } = this.state;
        return (
            <Fragment>
                <Header />
                {isLoading ? <Loading /> : <Weahter temp={temp} weather={weather} country={country} />}
                <Footer />
            </Fragment>
        );
    }
    */

    // react hooks 이용.
    return (
        <Fragment>
            <HashRouter>
                <Header />
                <LeftMenu />
                <Route path="/" component={Home} exact={true} />
                <Route path="/join" component={Join} exact={true} />
                <Route path="/find-email" component={FindEmail} exact={true} />
                <Route path="/reset-pw" component={ResetPw} exact={true} />
                <Route
                    path="/weather"
                    render={() =>
                        isLoading ? (
                            <Loading />
                        ) : (
                            <Weahter
                                temp={temp}
                                weather={weather}
                                country={country}
                                temp_max={temp_max}
                                temp_min={temp_min}
                                humidity={humidity}
                                feels_like={feels_like}
                            />
                        )
                    }
                    exact={true}
                />
                <Route path="/todayEnglish" component={TodayEnglish} exact={true} />
                {/*isLoading ? <Loading /> : <Weahter temp={temp} weather={weather} country={country} />*/}
                <Route path="/bucketList" component={Bucketlist} exact={true} />
                <Footer />
            </HashRouter>
        </Fragment>
    );
};

export default App;
