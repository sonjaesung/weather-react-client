import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import "../css/Header.css";

const Header = () => {
    const changeMenuCheck = () => {
        const { innerWidth: width } = window;
        let leftMenu = document.querySelector(".leftMenuDiv");
        if(width>414)
        {
            leftMenu.style.width = "500px";
        }
        else
        {
            leftMenu.style.width = "80%";
        }
    };

    return (
        // react 16 기술. dom 에 추가노드를 생성하지 않음.
        <Fragment>
            <div className="headerDiv">
                <div className="leftHead">
                    <button className="menuBtn" onClick={changeMenuCheck}>
                        <img className="menuImg" src={require(`../img/Menu.png`)} />
                    </button>
                </div>
                <div className="cetnerHead">
                    <span className="headTitle">오늘의 날씨</span>
                </div>
                <div className="rightHead">
                    <Link to="/">
                        <button className="menuBtn">
                            <img className="homeImg" src={require(`../img/Home.png`)} />
                        </button>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default Header;
