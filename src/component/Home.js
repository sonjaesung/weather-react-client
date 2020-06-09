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

        let timerID = setInterval(() => getTime(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    useEffect(() => {
        checkLogin();
    }, []);

    const getTime = () => {
        setCurrentTime(new Date());
    };

    const clickLogin = async () => {
        const email = document.getElementById("email").value;
        const pw = document.getElementById("pw").value;
        let loginDiv = document.querySelector(".login");
        let noneLoginDiv = document.querySelector(".noneLogin");
        let userName = document.querySelector('#nameSpan');

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

                if(result === null)
                {
                    alert('로그인실패!! 다시 입력해 주세요');
                    loginDiv.style.display = 'none';
                    noneLoginDiv.style.display = 'flex';
                }
                else{
                    cookies.set('user', result.token);
                    alert(result.user.name + '님 환영합니다!!');
                    loginDiv.style.display = 'flex';
                    noneLoginDiv.style.display = 'none';
                    userName.innerText = `${result.user.name}님 환영합니다!`;
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

    const checkLogin = async () => {
        
        let loginDiv = document.querySelector(".login");
        let noneLoginDiv = document.querySelector(".noneLogin");
        let userName = document.querySelector('#nameSpan');

        try{
            await axios
                .get(config.webHost + "/login" /*'http://localhost:3000/login'*/, {
                    params: {
                        token: cookies.get('user'),
                    }
                })
                .then(function (res) {
                    loginDiv.style.display = 'flex';
                    noneLoginDiv.style.display = 'none';
                    userName.innerText = `${res.data}님 환영합니다!`;
                });
        }
        catch (err) {
            loginDiv.style.display = 'none';
            noneLoginDiv.style.display = 'flex';
        }
        
    }

    return (
        <Fragment>
            <div className="homeDiv">
                <div className="homeContainerHeader">
                    <div className="clock">
                        <span className="clockSpan">{currentTime.toLocaleTimeString()}</span>
                    </div>
                </div>
                <div className="homeContainerCenter">
                    <div className="noneLogin">
                        <input placeholder="E-Mail 을 입력하세요" type="email" className="homeInput" id="email" />
                        <input placeholder="비밀번호를 입력하세요" type="password" className="homeInput" id="pw" />
                        <button className="loginBtn" onClick={clickLogin}>
                            Login
                        </button>
                        <div className="homeBtnDiv">
                            <Link className="linkStyle" to="/join">
                                <button className="btn">회원가입</button>
                            </Link>
                            <Link className="linkStyle" to="/find-email">
                                <button className="btn">이메일 찾기</button>
                            </Link>
                            <Link className="linkStyle" to="/reset-pw">
                                <button className="btn">비밀번호 재설정</button>
                            </Link>
                        </div>
                    </div>
                    <div className="login">
                        <span id='nameSpan' className='nameSpan'></span>
                        <span>해당 웹 페이지는 포트폴리오 작성으로 업데이트 진행중입니다.</span>
                        <span>아래 내용의 기능들을 사용하실 수 있습니다.</span>
                        <div className="listDiv">
                            <li>오늘의 날씨</li>
                            <li>오늘의 영어</li>
                        </div>
                    </div>
                </div>
                <div className="homeContainerBottom"></div>
            </div>
        </Fragment>
    );
};

export default Home;
