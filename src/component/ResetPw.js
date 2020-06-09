import React, {useState, useEffect, Fragment} from "react";
import config from '../config/config';

import "../css/Join.css";

import axios from "axios";

 const ResetPw = () => {

    useEffect(() => {
        let headerTitle = document.querySelector('.headTitle');
        headerTitle.innerText = '비밀번호재설정';
    });

    const clickResetBtn = async () => {
        let email = document.getElementById('joinEmail').value;
        let pw = document.getElementById('joinPw').value;
        let pwAgain = document.getElementById('joinPwCheck').value;
        let name = document.getElementById('joinName').value;

        if(!validation(email, pw, pwAgain, name))
        {
            return ;
        }   

       await axios
       .post(config.webHost + "/reset-pw" /*'http://localhost:3000/reset-pw'*/, {
           email,
           pw,
           name,
       })
       .then(function (res) {
           let result = res.data;

           if(result)
           {
                alert('비밀번호 재설정을 완료하였습니다.');
                window.location.href = './';
           }
           else
           {
                alert('일치하는 회원정보가 없습니다.');
           }
       });
    }

    const validation = (email, pw, pwAgain, name) => {
        if(email === "")
        {
            alert('email을 입력해 주세요.');
            return false;
        }
        else if(name === "")
        {
            alert('이름을 입력해 주세요.');
            return false;
        }
        else if(pw === "")
        {
            alert('비밀번호를 입력해 주세요.');
            return false;
        }
        else if(pw !== pwAgain)
        {
            alert('비밀번호가 일치하지않습니다.');
            return false;
        }

        return true;
    }

    return (
        <Fragment>
            <div className='joinDiv'>
                <div className='joinContainerTop'>
                    <span className='findSpan'>해당 페이지는 회원가입에 이용한 비밀전호를 재설정할 수 있는 페이지 입니다.</span>
                    <input placeholder='E-Mail을 입력하세요' type='email' className='joinInput' id='joinEmail' />
                    <input placeholder='이름을 입력하세요' type='text' className='joinInput' id='joinName' />
                    <input placeholder='변경할 비밀번호를 입력하세요' type='password' className='joinInput' id='joinPw' />
                    <input placeholder='비밀번호를 확인하세요' type='password' className='joinInput' id='joinPwCheck' />
                </div>
                <div className='joinContainerBottom'>
                    <button className='joinBtn' onClick={clickResetBtn}>
                        비밀번호 재설정
                    </button>
                </div>
            </div>
        </Fragment>
    );
    
}

export default ResetPw;