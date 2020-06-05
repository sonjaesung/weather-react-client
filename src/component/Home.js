import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';

import config from '../config/config';

import "../css/Home.css";

const Home = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const cookies = new Cookies();


    useEffect(() => {
        let headerTitle = document.querySelector(".headTitle");
        headerTitle.innerText = "Home";

        var timerID = setInterval(() => getTime(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const getTime = () => {
        setCurrentTime(new Date());
    };

    const clickLogin = async () => {
        const email = document.getElementById("email").value;
        const pw = document.getElementById("pw").value;

        if (!validation(email, pw)) {
            return;
        }

        await axios
            .post(config.webHost + "/login" /*'http://localhost:3000/login'*/, {
                email,
                pw,
            })
            .then(function (res) {
                let result = res.data;
                console.log(res);

                if(result === null)
                {
                    alert('로그인실패!! 다시 입력해 주세요');
                }
                else{
                    cookies.set('user', result.token);
                    alert(result.user.name + '님 환영합니다!!');
                }
            });
    };

    const validation = (email, pw) => {
        if (email === "") {
            alert("E-mail 을 입력하세요.");
            return false;
        } else if (pw === "") {
            alert("비밀번호를 입력하세요.");
            return false;
        } else {
            return true;
        }
    };

    return (
        <Fragment>
            <div className="homeDiv">
                <div className="homeContainerHeader">
                    <div className="clock">
                        <span className="clockSpan">{currentTime.toLocaleTimeString()}</span>
                    </div>
                </div>
                <div className="homeContainerCenter">
                    <input placeholder="E-Mail 을 입력하세요" type="email" className="homeInput" id="email" />
                    <input placeholder="비밀번호를 입력하세요" type="password" className="homeInput" id="pw" />
                    <button className="loginBtn" onClick={clickLogin}>
                        Login
                    </button>
                    <div className="homeBtnDiv">
                        <Link className="linkStyle" to="/Join">
                            <button className="btn">회원가입</button>
                        </Link>
                        <Link className="linkStyle" to="/Find-Email">
                            <button className="btn">이메일 찾기</button>
                        </Link>
                        <Link className="linkStyle" to="/Reset-Pw">
                            <button className="btn">비밀번호 재설정</button>
                        </Link>
                    </div>
                </div>
                <div className="homeContainerBottom"></div>
            </div>
        </Fragment>
    );
};

export default Home;
