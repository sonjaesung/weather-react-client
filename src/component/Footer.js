import React, { Component, Fragment } from "react";
import "../css/Footer.css";

export default class Footer extends Component {
    render() {
        return (
            // react 16 기술. dom 에 추가노드를 생성하지 않음.
            <Fragment>
                <div className="footerDiv">
                    <span>Footer</span>
                </div>
            </Fragment>
        );
    }
}
