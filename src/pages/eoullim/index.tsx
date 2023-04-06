import React, { useState } from "react";
import styled from "styled-components";

const index = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleAButton = () => {
    setShowAlert(true);
  };

  const handleAlertButton = () => {
    setShowAlert(false);
  };

  return (
    <>
      <button onClick={handleAButton}>custom alert</button>
      {showAlert && (
        <Modal>
          <p>글 작성 됐어요!</p>
          <AlertBtn onClick={handleAlertButton}>닫기</AlertBtn>
        </Modal>
      )}
    </>
  );
};

export default index;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 40vw;
  height: 40vh;
  margin: 0 auto;

  background-color: white;
  border: 1px solid #999999;
`

const AlertBtn = styled.button`
  width: 50%;
`