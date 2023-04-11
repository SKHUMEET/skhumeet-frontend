import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

const AlertModal = {
  Container: styled.div<{ showModal: boolean }>`
    position: fixed;
    top: -100px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: all 0.1s ease-in-out;

    ${({ showModal }) =>
      showModal &&
      css`
        top: 0;
        opacity: 1;
        pointer-events: auto;
      `}
  `,

  Content: styled.div`
    margin: 20px;
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    width: 100%;
    height: 5rem;
    position: relative;
    /* ::before {
      content: "";
      top: 0;
      border-radius: 8px 8px 0 0;
      position: absolute;
      width: 100%;
      height: 1rem;
      background-color: red;
    } */
  `,

  Message: styled.div`
    font-size: 1.2rem;
    margin-bottom: 16px;
  `,
};

interface CustomAlertProps {
  message: string;
  onConfirm: () => void;
}

const CustomAlert = ({ message, onConfirm }: CustomAlertProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
    setTimeout(() => onConfirm(), 1);
  };

  useEffect(() => {
    setTimeout(() => setShowModal(true), 1);
  }, []);
  return (
    <>
      <AlertModal.Container showModal={showModal}>
        <AlertModal.Content>
          <AlertModal.Message>{message}</AlertModal.Message>
          <button onClick={handleConfirm}>확인</button>
        </AlertModal.Content>
      </AlertModal.Container>
    </>
  );
};

const customAlert = (message: string) => {
  const handleConfirm = () => {
    const modalRoot = document.getElementById("modal-alert-portal-wrapper");
    if (modalRoot) modalRoot.remove();
    console.log("모달이 확인되었습니다.");
  };
  if (typeof window !== "undefined") {
    const subDiv = document.createElement("div");
    subDiv.id = "modal-alert-portal-wrapper";
    document.body.appendChild(subDiv);
    ReactDOM.render(
      <>
        <CustomAlert message={message} onConfirm={handleConfirm} />
      </>,
      subDiv
    );
  }
};

export default customAlert;
