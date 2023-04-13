import {
  useState,
  useRef,
  useCallback,
  RefObject,
  ChangeEvent,
  useEffect,
} from "react";
import styled from "styled-components";
import { BiImageAdd } from "react-icons/bi";

const TextEditor = ({
  editorRef,
  handleFileUpload,
  handleContextChange,
  context,
}: {
  editorRef: RefObject<HTMLDivElement>;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleContextChange: (content: string) => void;
  context: string;
}) => {
  const [textContext, setTextContext] = useState("");
  const applyFormat = useCallback((tag: string, type?: string) => {
    document.execCommand(tag, false, type);
  }, []);

  const handleChange = () => {
    if (editorRef.current) {
      const value = editorRef.current.innerHTML;
      console.log("content", value);
      setTextContext(value);
      handleContextChange(value);
    }
  };
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = context ?? "";
    }
  }, []);

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
          multiple
        />
      </ToolbarContainer>
      <EditorContainer>
        <EditorContent
          ref={editorRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleChange}
          // dangerouslySetInnerHTML={{ __html: context }}
        />
        {/* <div
          ref={editorRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleChange}
          dangerouslySetInnerHTML={{ __html: textContext }}
        /> */}
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
