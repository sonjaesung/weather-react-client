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
                    <img className="updateImg" id="updateImg" />
                </div>
                <div className="bucketCenterContainer">
                    <input
                        type="file"
                        id="real-input"
                        className="image_inputType_file"
                        accept="img/*"
                        required
                        multiple
                        onChange={readInputFile}
                    />
                </div>
                <div className="bucketBottomContainer"></div>
            </div>
        </Fragment>
    );
};

export default Bucketlist;
