"use client";


import { useEditorContext } from "app/context/editorProvider";
import { LuUndo, LuRedo } from "react-icons/lu";
import { FaListOl, FaListUl } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaUnderline, FaBold, FaItalic } from "react-icons/fa";

export function Toolbar() {
  const { currentEditor } = useEditorContext();

  const handleBold = () => {
    if (!currentEditor) return;

    currentEditor.chain().focus().toggleBold().run();
  };
  const handleItalic = () => {
    if (!currentEditor) return;

    currentEditor.chain().focus().toggleItalic().run();
  };

  const handleUnderline = () => {
    if (!currentEditor) return;

    currentEditor.chain().focus().toggleUnderline().run();
  };

  const handleBulletList = () => {
    if (!currentEditor) return;
    currentEditor.chain().focus().toggleBulletList().run();
  };

  const handleOrderedList = () => {
    if (!currentEditor) return;
    currentEditor.chain().focus().toggleOrderedList().run();
  };

  const handleUndo = () => {
    if (!currentEditor) return;
    currentEditor.chain().focus().undo().run();
  };

  const handleRedo = () => {
    if (!currentEditor) return;
    currentEditor.chain().focus().redo().run();
  };

  const handleH1 = () => {
    if (!currentEditor) return;
    console.log("h1");
    currentEditor.chain().focus().toggleHeading({ level: 1 }).run();
  };

  const handleH2 = () => {
    if (!currentEditor) return;
    currentEditor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  const handleH3 = () => {
    if (!currentEditor) return;
    currentEditor.chain().focus().toggleHeading({ level: 3 }).run();
  };

  const handleH4 = () => {
    if (!currentEditor) return;
    currentEditor.chain().focus().toggleHeading({ level: 4 }).run();
  };

  return (
    <div className="flex flex-row gap-3">
      <button
        onClick={handleBold}
        disabled={currentEditor === null}
        className={currentEditor?.isActive("bold") ? "is-active" : ""}
      >
        <FaBold />
      </button>
      <button
        onClick={handleItalic}
        disabled={currentEditor === null}
        className={currentEditor?.isActive("italic") ? "is-active" : ""}
      >
        <FaItalic />
      </button>
      <button
        onClick={handleUnderline}
        disabled={currentEditor === null}
        className={currentEditor?.isActive("underline") ? "is-active" : ""}
      >
        <FaUnderline />
      </button>
      <button
        onClick={handleBulletList}
        disabled={currentEditor === null}
        className={currentEditor?.isActive("bulletList") ? "is-active" : ""}
      >
        <FaListUl />
      </button>
      <button
        onClick={handleOrderedList}
        disabled={currentEditor === null}
        className={currentEditor?.isActive("orderedList") ? "is-active" : ""}
      >
        <FaListOl />
      </button>
      <button onClick={handleUndo} disabled={currentEditor === null}>
        <LuUndo />
      </button>
      <button onClick={handleRedo} disabled={currentEditor === null}>
        <LuRedo />
      </button>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" radius="none" size="sm" className="text-secondaryGray">
            Textstorlek
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            onPress={handleH1}
            isReadOnly={currentEditor === null}
            className={
              currentEditor?.isActive("heading", { level: 1 })
                ? "is-active"
                : ""
            }
          >
            Text
          </DropdownItem>
          <DropdownItem
            onPress={handleH2}
            isReadOnly={currentEditor === null}
            className={
              currentEditor?.isActive("heading", { level: 2 })
                ? "is-active"
                : ""
            }
          >
            <p className="text-lg">Text</p>
          </DropdownItem>
          <DropdownItem
            onPress={handleH3}
            isReadOnly={currentEditor === null}
            className={
              currentEditor?.isActive("heading", { level: 3 })
                ? "is-active"
                : ""
            }
          >
            <p className="text-2xl">Text</p>
          </DropdownItem>
          <DropdownItem
            onPress={handleH4}
            isReadOnly={currentEditor === null}
            className={
              currentEditor?.isActive("heading", { level: 4 })
                ? "is-active"
                : ""
            }
          >
            <p className="text-3xl">Text</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
