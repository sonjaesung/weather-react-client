import React, { Fragment, useState, useEffect } from "react";

import "../css/English.css";
import config from '../config/config';

import axios from "axios";
import Cookies from 'universal-cookie';

const TodayEnglish = () => {
    const [todayEnglish, setTodayEnglis] = useState("");
    const [englishArray, setEnglishArray] = useState([]);
    const cookies = new Cookies();

    const setLocalStorage = (data) => {
        localStorage.setItem("english", JSON.stringify(data));
    };

    const setTodayEnglish = () => {
        if (localStorage.getItem("english") !== null && JSON.parse(localStorage.getItem("english")).length !== 0) {
            let localStorageobj = JSON.parse(localStorage.getItem("english"));
            let lastContent = localStorageobj[localStorageobj.length - 1].content;
            document.querySelector("#todayEnglish").innerText = lastContent;
        } else {
            document.querySelector("#todayEnglish").innerText = "오늘의 영문장을 입력하세요";
        }
    };

    useEffect(() => {
        let headerTitle = document.querySelector(".headTitle");
        headerTitle.innerText = "오늘의 영어";
    });

    useEffect(() => {
        renderTodayEnglish();
    }, [todayEnglish]);

    /*
    useEffect(() => {
        if (englishArray.length !== 0) {
            setLocalStorage(englishArray);
        }
        renderTodayEnglishList();
    }, [englishArray]);
    */

    const cleanEnglish = () => {
        document.getElementById("englishTextArea").value = "";
    };

    const textAreaValidation = (text) => {
        if (text.length === 0) {
            return false;
        } else {
            return true;
        }
    };

    const writeEnglish = async () => {
        const text = document.getElementById("englishTextArea").value;
        if (!textAreaValidation(text)) {
            alert("내용을 입력하세요");
            return;
        }

        
        let tempArr = new Array();
        const textObj = {
            date: new Date(),
            content: text,
            id: Date.now(),
            check: false,
        };

        if (localStorage.getItem("english") !== null) {
            tempArr = JSON.parse(localStorage.getItem("english"));
        }
        
        await axios
            .post(config.webHost + "/todayEnglish" /*'http://localhost:3000/todayEnglish'*/, {
                token: cookies.get('user'),
                content: text
            })
            .then(function (res) {
                let result = res.data;
                console.log(result);
            });
            

        tempArr.push(textObj);
        setEnglishArray(tempArr);
        setTodayEnglis(text);
        
        document.getElementById("englishTextArea").value = "";
    };

    const renderTodayEnglish = async () => {
        let englishList;

        try{   
            await axios
            .get(config.webHost + "/todayEnglish" /*'http://localhost:3000/todayEnglish'*/, {
                params: {
                    token: cookies.get('user'),
                }
            })
            .then(function (res) {
                englishList = res.data;
            });
        } catch (err) {
            alert('로그인 이후 사용 가능합니다');
            window.location.href = './';
        }

        if (englishList.length !== 0) {
            document.querySelector("#todayEnglish").innerText = englishList[0].content;
            renderTodayEnglishList(englishList);

        } else {
            setTodayEnglish();
        }
    };

    const renderTodayEnglishList = (englishList) => {
        let englishBottomContainer = document.querySelector(".englishBottomContainer");
        englishBottomContainer.innerText = "";

        if (englishList.length !== 0) {
            englishList.map((data) => {
                const containerDiv = document.createElement("div");
                const contentDiv = document.createElement("div");
                const btnDiv = document.createElement("div");

                const checkBtn = document.createElement("button");
                const span = document.createElement("span");
                const deleteBtn = document.createElement("button");

                containerDiv.style.display = "flex";
                contentDiv.style.display = "flex";
                contentDiv.style.flex = "5";
                btnDiv.style.display = "flex";
                btnDiv.style.flex = "1";

                containerDiv.style.marginTop = "10px";
                containerDiv.style.marginBottom = "10px";
                containerDiv.id = data.seq;
                containerDiv.className = "containerDiv";

                contentDiv.className = "contentDiv";
                btnDiv.className = "btnDiv";

                span.className='contentSpan';
                span.innerText = data.content;

                checkBtn.style.height = "fit-content";
                checkBtn.className = "checkBtn";
                checkBtn.innerText = "√";
                checkBtn.addEventListener("click", clickCheckBtn);

                deleteBtn.style.height = "fit-content";
                deleteBtn.className = "deleteBtn";
                deleteBtn.innerText = "X";
                deleteBtn.addEventListener("click", clickDeleteBtn);

                if (data.check) {
                    span.style.textDecoration = "line-through";
                    span.style.color = "red";
                    deleteBtn.style.display = "inline";
                } else {
                    deleteBtn.style.display = "none";
                }

                containerDiv.appendChild(contentDiv);
                containerDiv.appendChild(btnDiv);
                contentDiv.appendChild(span);
                btnDiv.appendChild(checkBtn);
                btnDiv.appendChild(deleteBtn);
                englishBottomContainer.appendChild(containerDiv);
            });
        }
    };

    const clickCheckBtn = (e) => {
        const span = e.target.parentNode.parentNode.querySelector(".contentDiv").querySelector("span");
        const delBtn = e.target.parentNode.querySelector(".deleteBtn");
        const tempArry = JSON.parse(localStorage.getItem("english"));

        tempArry.map((data, count) => {
            if (data.id === parseInt(e.target.parentNode.parentNode.id)) {
                tempArry[count].check = !tempArry[count].check;

                span.style.textDecoration = tempArry[count].check ? "line-through" : "none";
                span.style.color = tempArry[count].check ? "red" : "white";
                delBtn.style.display = tempArry[count].check ? "inline" : "none";
            }
        });
        setLocalStorage(tempArry);
    };

    const clickDeleteBtn = (e) => {
        const id = parseInt(e.target.parentNode.parentNode.id);
        const tempArry = JSON.parse(localStorage.getItem("english"));

        let newLocalArray = tempArry.filter((data) => data.id !== id);

        setEnglishArray(newLocalArray);
        setLocalStorage(newLocalArray);
        setTodayEnglish();
    };

    return (
        <Fragment>
            <div className="englishDiv">
                <div className="englishHeadfContainer">
                    <h2 id="todayEnglish">something img</h2>
                </div>
                <div className="englishCenterContainer">
                    <textarea
                        rows="5"
                        className="englishTextArea"
                        placeholder="오늘의 영문장을 작성하세요"
                        id="englishTextArea"
                    ></textarea>
                    <div className="englishBtnDiv">
                        <button className="englishBtn" onClick={cleanEnglish}>
                            글 지우기
                        </button>
                        <button className="englishBtn" onClick={writeEnglish}>
                            글 등록
                        </button>
                    </div>
                </div>
                <div className="englishBottomContainer"></div>
            </div>
        </Fragment>
    );
};

export default TodayEnglish;
