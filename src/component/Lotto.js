import React, { Fragment, useState, useEffect } from "react";

import "../css/Lotto.css";
import config from "../config/config";

import axios from "axios";
import Cookies from "universal-cookie";

const Lotto = () => {
    const cookies = new Cookies();

    useEffect(() => {
        let headerTitle = document.querySelector(".headTitle");
        headerTitle.innerText = "로또 당첨 조회";
        renderLotto();
    }, []);

    const renderLotto = async () => {
        try {
            await axios
                .get(config.webHost + "/lotto" /*"http://localhost:3000/lotto"*/, {
                    params: {
                        token: cookies.get("user"),
                    },
                })
                .then(function (res) {
                    console.log(res);
                });
        } catch (err) {
            alert("로그인 이후 사용 가능합니다");
            window.location.href = "./";
        }
    };

    const searchLotto = async () => {
        let drawNo = document.getElementById("lottoInput").value;
        document.getElementById("lottoInput").value = "";

        await axios.get(`https://www.geniecontents.com/api/v1/lotto?drawNo=${drawNo}`).then(function (res) {
            let result = res.data.body;
            let lottoDiv = document.querySelector(".lottoNumDiv");
            let lottoCountTitle = document.getElementById("lottoCountTitle");
            let lottoDate = document.getElementById("lottoDate");
            let num1 = document.getElementById("num1");
            let num2 = document.getElementById("num2");
            let num3 = document.getElementById("num3");
            let num4 = document.getElementById("num4");
            let num5 = document.getElementById("num5");
            let num6 = document.getElementById("num6");
            let num7 = document.getElementById("num7");

            lottoDiv.style.display = "flex";
            lottoCountTitle.innerText = `${result.drawNo}회차 당첨번호`;
            lottoDate.innerText = `추첨 : ${result.drawDate}`;
            num1.innerText = result.num1;
            num1.style.backgroundColor = circleColor(result.num1);
            num2.innerText = result.num2;
            num2.style.backgroundColor = circleColor(result.num2);
            num3.innerText = result.num3;
            num3.style.backgroundColor = circleColor(result.num3);
            num4.innerText = result.num4;
            num4.style.backgroundColor = circleColor(result.num4);
            num5.innerText = result.num5;
            num5.style.backgroundColor = circleColor(result.num5);
            num6.innerText = result.num6;
            num6.style.backgroundColor = circleColor(result.num6);
            num7.innerText = result.bonusNum;
            num7.style.backgroundColor = circleColor(result.num7);
        });
    };

    const circleColor = (number) => {
        let color0 = "#f29d21";
        let color1 = "#f29d21";
        let color2 = "#3f55ac";
        let color3 = "#6e7795";
        let color4 = "#02c241";

        if (number < 10) {
            return color0;
        } else if (number < 20) {
            return color1;
        } else if (number < 30) {
            return color2;
        } else if (number < 40) {
            return color3;
        } else {
            return color4;
        }
    };

    return (
        <Fragment>
            <div className="lottoDiv">
                <div className="lottoHeadfContainer">
                    <h2>조회할 로또 회차를 입력하세요</h2>
                    <input className="lottoInput" id="lottoInput"></input>
                    <button className="lottoBtn" onClick={searchLotto}>
                        조회
                    </button>
                </div>
                <div className="lottoCenterContainer">
                    <div className="lottoTitleDiv">
                        <h3 id="lottoCountTitle"></h3>
                        <span id="lottoDate"></span>
                    </div>
                    <div className="lottoNumDiv">
                        <span id="num1"></span>
                        <span id="num2"></span>
                        <span id="num3"></span>
                        <span id="num4"></span>
                        <span id="num5"></span>
                        <span id="num6"></span>
                        <label>+</label>
                        <span id="num7"></span>
                    </div>
                </div>
                <div className="lottoBottomContainer"></div>
            </div>
        </Fragment>
    );
};

export default Lotto;
