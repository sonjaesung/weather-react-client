import React, { Component, Fragment } from "react";
import { styled, ThemeProvider } from "styled-components";

// 공통의 스타일링 적용 가능.
import theme from "./theme";

import "../css/Loading.css";

export default class Loading extends Component {
    render() {
        return (
            // react 16 기술. dom 에 추가노드를 생성하지 않음.
            <Fragment>
                <ThemeProvider theme={theme}>
                    <div className="loadingDiv">
                        <span className="loadingSpan">Loading Page</span>
                    </div>
                    {/* 이런식으로 가능.
                <DIV>
                    <span>내용</span>
                </DIV>
                 */}
                </ThemeProvider>
            </Fragment>
        );
    }
}

// props 를 전달하여 편집 가능.
/*
let Div = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    // theme의 스타일을 호출 가능.
    background-color: ${props => props.theme.successColor};
`;
*/
