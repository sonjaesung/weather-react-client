import React, { Fragment, useState, useEffect } from "react";

import "../css/BucketList.css";

const Bucketlist = () => {
    useEffect(() => {
        let headerTitle = document.querySelector(".headTitle");
        headerTitle.innerText = "버킷리스트";
    });

    const readInputFile = (e) => {
        let updateImg = document.getElementById("updateImg");
        let file = e.target.files;
        let fileArray = Array.prototype.slice.call(file);

        fileArray.forEach((element) => {
            let reader = new FileReader();

            reader.onload = function (e) {
                updateImg.src = e.target.result;
            };
            reader.readAsDataURL(element);
        });
    };

    return (
        <Fragment>
            <div className="bucketListDiv">
                <div className="bucketHeadContainer">
                    <button className="bucketBtn">사진 추가</button>
                    <button className="bucketBtn">내가 올린 사진</button>
                </div>
                <div className="bucketCenterContainer">
                <img className="updateImg" id="updateImg" />
                    <input
                        type="file"
                        id="real-input"
                        className="bucketBtn"
                        accept="img/*"
                        required
                        multiple
                        onChange={readInputFile}
                    />
                </div>
                <div className="bucketBottomContainer">
                </div>
            </div>
        </Fragment>
    );
};

export default Bucketlist;
