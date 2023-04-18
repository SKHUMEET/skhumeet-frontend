import { ConvertKorean, Status } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import Btn from "./Btn";
import { ThemeContext } from "styled-components";

type StatusBtnProps = {
  status: Status;
  onClick: () => void;
};

//todo: 모집중, 모집완료, 홍보, 활동 색깔 다 다르게
const StatusBtn = ({ status, onClick }: StatusBtnProps) => {
  const theme = useContext(ThemeContext);
  const [color, setColor] = useState(theme.color.main);

  useEffect(() => {
    switch (status) {
      case "recruiting":
      case "activity":
        setColor(theme.color.main);
        break;
      case "promotion":
      case "recruitment_deadline":
        setColor(theme.color.light);
        break;
    }
  }, [status]);

  return (
    <Btn
      onClick={onClick}
      color={color}
      // css={`
      //   &:hover:not(:disabled) {
      //     background-color: ${color};
      //   }
      // `}
      disabled={true}
    >
      {ConvertKorean[status]}
    </Btn>
  );
};

export default StatusBtn;
