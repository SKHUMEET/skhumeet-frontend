import { useState, useRef, useCallback, RefObject, ChangeEvent } from "react";
import styled from "styled-components";
import { BiImageAdd } from "react-icons/bi";

const TextEditor = ({
  editorRef,
  handleFileUpload,
}: {
  editorRef: RefObject<HTMLDivElement>;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const applyFormat = useCallback((tag: string, type?: string) => {
    document.execCommand(tag, false, type);
  }, []);

  // const formatBlock = (tag: string) => {
  //   const range = document.getSelection()?.getRangeAt(0);
  //   if (!range) return;

  //   const newElement = document.createElement(tag);
  //   newElement.innerHTML = range.toString();

  //   range.deleteContents();
  //   range.insertNode(newElement);

  //   const newRange = document.createRange();
  //   newRange.selectNode(newElement);
  //   newRange.collapse(false);

  //   const sel = window.getSelection();
  //   if (sel) {
  //     sel.removeAllRanges();
  //     sel.addRange(newRange);
  //   }
  // };

  return (
    <>
      <ToolbarContainer>
        <BoldButton type="button" onClick={() => applyFormat("bold")}>
          Bold
        </BoldButton>
        <ItalicButton type="button" onClick={() => applyFormat("italic")}>
          Italic
        </ItalicButton>
        <UnderlineButton type="button" onClick={() => applyFormat("underline")}>
          Underline
        </UnderlineButton>
        <ToolbarButton
          type="button"
          onClick={() => applyFormat("formatBlock", "h1")}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => applyFormat("formatBlock", "h2")}
        >
          H2
        </ToolbarButton>
        <ToolbarButton type="button" onClick={() => applyFormat("justifyLeft")}>
          Left
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => applyFormat("justifyCenter")}
        >
          Center
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => applyFormat("justifyRight")}
        >
          Right
        </ToolbarButton>
        <label htmlFor="imageInput">
          <BiImageAdd />
        </label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          hidden
        />
      </ToolbarContainer>
      <EditorContainer>
        <EditorContent
          ref={editorRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
        />
      </EditorContainer>
    </>
  );
};

export default TextEditor;

const EditorContainer = styled.div`
  width: 100%;
  height: 50vh;

  overflow: auto;
  border: none;
  text-align: left;

  outline: none;
`;

const ToolbarContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  height: auto;
`;

const ToolbarButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background-color: #eee;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const BoldButton = styled(ToolbarButton)`
  font-weight: bold;
`;

const ItalicButton = styled(ToolbarButton)`
  font-style: italic;
`;

const UnderlineButton = styled(ToolbarButton)`
  text-decoration: underline;
`;

const EditorContent = styled.div`
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 10px;
  :focus-visible {
    border: 1px dashed ${({ theme }) => theme.color.main};
    border-radius: 3px;
    outline: none;
  }
`;
