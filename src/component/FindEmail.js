import React, {useState, useEffect, Fragment} from "react";
import config from '../config/config';

//import "../css/Join.css";

import axios from "axios";

 const FindEmail = () => {

    useEffect(() => {
        let headerTitle = document.querySelector('.headTitle');
        headerTitle.innerText = '이메일찾기';
    });

    const clickFindBtn = async () => {
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

        if(!validation(name, phone, gender))
        {
            return ;
        }   

       await axios
       .post(config.webHost + "/find-email" /*'http://localhost:3000/find-email'*/, {
           name,
           phone,
           gender
       })
       .then(function (res) {
           let result = res.data;
           console.log(result);

           if(result)
           {
                alert(`회원님의 이메일은 [${result}] 입니다.`);
                window.location.href = './';
           }
           else
           {
                alert('일치하는 회원정보가 없습니다.');
           }
       });
    }

    const validation = (name, phone, gender) => {
        if(name === "")
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
                    <span className='findSpan'>해당 페이지는 회원가입에 이용한 이메일을 찾을 수 있는 페이지 입니다.</span>
                    <input placeholder='이름을 입력하세요' type='text' className='joinInput' id='joinName' />
                    <input placeholder='전화버호를 (-)없이 입력하세요' type='number' className='joinInput' id='joinPhone' maxLength='11' onChange={phoneMaxLength} />
                    <div className='genderDiv'>
                        <fieldset className='genderFieldset'>
                        <legend>성별</legend>
                        <label>
                            <input type="radio" name="gender" value='1' /> 남자
                        </label>
                        <label>
                            <input type="radio" name="gender" value='0' /> 여자
                        </label>
                        </fieldset>
                    </div>
                </div>
                <div className='joinContainerBottom'>
                    <button className='joinBtn' onClick={clickFindBtn}>
                        이메일 찾기
                    </button>
                </div>
            </div>
        </Fragment>
    );
    
}

export default FindEmail;