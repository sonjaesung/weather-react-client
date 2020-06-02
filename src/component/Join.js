import React, {useState, useEffect, Fragment} from "react";
import config from '../config/config';

import "../css/Join.css";

import axios from "axios";

 const Join = () => {

    useEffect(() => {
        let headerTitle = document.querySelector('.headTitle');
        headerTitle.innerText = '회원가입';
    });

    const clickJoinBtn = async () => {
        let email = document.getElementById('joinEmail').value;
        let pw = document.getElementById('joinPw').value;
        let pwAgain = document.getElementById('joinPwCheck').value;
        let name = document.getElementById('joinName').value;
        let phone = document.getElementById('joinPhone').value;
        let genderArray = document.getElementsByName('gender');
        let gender;

        genderArray.forEach(data => {
            if(data.checked === true)
            {
                gender = data.value;
            }
        });

        if(!validation(email, pw, pwAgain, name, phone, gender))
        {
            return ;
        }   

       await axios
       .post(config.webHost + "/join", {
           email,
           pw,
           name,
           phone,
           gender
       })
       .then(function (res) {
           let result = res.data;

           if(result)
           {
                alert('회원가입을 정상적으로 완료하였습니다.');
                window.location.href = './';
           }
           else
           {
                alert('회원가입 실패!!');
           }
       });
    }

    const validation = (email, pw, pwAgain, name, phone, gender) => {
        if(email === "")
        {
            alert('email을 입력해 주세요.');
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
        else if(name === "")
        {
            alert('이름을 입력해 주세요.');
            return false;
        }
        else if(phone === "")
        {
            alert('전화번호를 입력해 주세요.');
            return false;
        }
        else if(gender === undefined)
        {
            alert('성별을 정해주세요.');
            return false;
        }

        return true;
    }

    const phoneMaxLength = (e) => {
        if(e.target.value.length > e.target.maxLength)
        {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    }

    return (
        <Fragment>
            <div className='joinDiv'>
                <div className='joinContainerTop'>
                    <input placeholder='E-Mail을 입력하세요' type='email' className='joinInput' id='joinEmail' />
                    <input placeholder='비밀번호를 입력하세요' type='password' className='joinInput' id='joinPw' />
                    <input placeholder='비밀번호를 확인하세요' type='password' className='joinInput' id='joinPwCheck' />
                    <input placeholder='이름을 입력하세요' type='text' className='joinInput' id='joinName' />
                    <input placeholder='전화버호를 (-)없이 입력하세요' type='number' className='joinInput' id='joinPhone' maxLength='11' onChange={phoneMaxLength} />
                    <div className='genderDiv'>
                        <fieldset className='genderFieldset'>
                        <legend>성별</legend>
                        <label>
                            <input type="radio" name="gender" value={true} /> 남자
                        </label>
                        <label>
                            <input type="radio" name="gender" value={false} /> 여자
                        </label>
                        </fieldset>
                    </div>
                </div>
                <div className='joinContainerBottom'>
                    <button className='joinBtn' onClick={clickJoinBtn}>
                        완료
                    </button>
                </div>
            </div>
        </Fragment>
    );
    
}

export default Join;