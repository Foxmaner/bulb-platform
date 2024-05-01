/**
 * MeetingPage Component
 *
 * This component represents the meeting page UI where users can view and edit meeting content.
 * It displays the meeting title, date, catalog, and sections with options to add new sections.
 *
 * Usage:
 * <MeetingPage />
 *
 * Note: This component assumes the usage of Next.js and includes components from the NextUI library.
 */

"use client";

import Quill from "quill";

import {
  Button,
  ScrollShadow,
  ButtonGroup,
  Tooltip,
  Input,
} from "@nextui-org/react";
import { FormEvent, useState, useRef, useEffect } from "react";
import Link from "next/link";

import AddSection from "./defaultAddsection";

import "./meeting.css";
import "react-quill/dist/quill.snow.css";

import SectionForm from "app/components/sectionForm";

import { Section, Paragraph } from "index";

import { useMeetingContext } from "../context/meetingProvider";
import { useRouter } from "next/navigation";
import { useLocalStorageState } from "app/hooks/useLocalStorageState";

type Editable = {
  id: string;
  content: string;
};

export default function MeetingPage({}) {
  const { meeting, setMeeting } = useMeetingContext();
  const meetingContext = useMeetingContext();

  const [activeEditable, setActiveEditable] = useState<Editable | null>(null);

  const router = useRouter();
  const [ titlevalue, setTitleValue ] = useState("");

  const addMeetingTitle = (text: string) => {
    setTitleValue(text);
    meeting.title = text;
    setMeeting((prevMeeting) => ({
      ...prevMeeting,
      title: text,
    }));
  };

  const addSection = () => {
    const id = meeting.sections.length;
    const newSection = {
      _id: "",
      title: "",
      paragraphs: [],
    };

    setMeeting({ ...meeting, sections: [...meeting.sections, newSection] });
  };

  useEffect(() => {
    if (meetingContext.editorInstanceRef?.current && activeEditable) {
      const quill = meetingContext.editorInstanceRef.current;
      const onTextChange = () => {
        activeEditable.content = quill.container.firstChild.innerHTML;
        setMeeting({
          ...meeting,
          sections: meeting.sections.map((section) => {
            section.paragraphs?.map((paragraph: Paragraph) => {
              if (paragraph.id === activeEditable.id) {
                return {
                  ...section,
                  paragraphs: activeEditable,
                };
              }
            });
            return section;
          }),
        });
      };
      quill.on("text-change", onTextChange);
      return () => quill.off("text-change", onTextChange);
    }
  }, [meetingContext]);


  return (
    <div className="flex w-screen h-screen content-center justify-center items-center">
      <div className="flex flex-row gap-10 bg-white w-[calc(95%)] h-[calc(95%)] ">
        {/*Vänstra div den med loggan*/}
        <div className="flex flex-col text-black">
          <div className="p-5">
            <Link href="/">
              <h1 className="text-primary font-bold text-3xl">
                East <br /> Sweden <br /> MedTech
              </h1>
            </Link>
            <div className="bg-primary h-1 w-5/6 content-center"></div>
          </div>
          {/*Katalogen*/}
          <div className="bg-secondaryGrey h-1 w-full"></div>
          <div className="flex flex-col justify-center py-2">
            <p className="text-center text-xl">Katalog</p>
            <ul className="flex flex-col py-2">
              {meeting.sections.map((section: Section, index: number) => (
                <div key={index} className="flex items-center flex-col">
                  <Tooltip content={section.title} isDisabled={!section.title}>
                    <Button
                      variant="light"
                      size="sm"
                      radius="none"
                      className="w-36 underline"
                      key={index}
                    >
                      <p className="truncate">{section.title}</p>
                    </Button>
                  </Tooltip>
                  {section.paragraphs?.map(
                    (paragraph: Paragraph, paragraphIndex: number) => (
                      <Tooltip
                        content={paragraph.title}
                        isDisabled={!paragraph.title}
                      >
                        <Button
                          variant="light"
                          size="sm"
                          radius="none"
                          className="w-28"
                          key={paragraphIndex}
                        >
                          <p className="truncate">{paragraph.title}</p>
                        </Button>
                      </Tooltip>
                    )
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-secondaryGrey h-5/6 w-1 content-center"></div>

        <div className="flex flex-col text-primaryText gap-5 w-11/12 py-5">
          <div className="flex flex-col gap-2 w-11/12">
            <Input
              classNames={{
                input: "text-3xl font-bold text-black placeholder:text-black",
              }}
              variant="underlined"
              disableAnimation={true}
              radius="lg"
              type={meeting.title}
              placeholder="Tomt möte"
              isRequired={true}
            />
            <p className="text-primaryText text-sm">2024 - 01 - 01</p>
            <div className="flex flex-row bg-secondaryGrey h-1 w-11/12"></div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="solid"
              className="bg-primaryGrey border-2 border-edge w-36 h-10"
              onClick={addSection}
            >
              Nytt avsnitt
            </Button>
            <div ref={meetingContext.toolbarRef} id="toolbar">
              <div className="ql-formats">
                <select className="ql-header" defaultValue={""}>
                  <option value="false"></option>
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
                </select>
              </div>
              <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
              </span>
              <span className="ql-formats">
                <select className="ql-color"></select>
                <select className="ql-background"></select>
              </span>
              <span className="ql-formats">
                <button className="ql-script" value="sub"></button>
                <button className="ql-script" value="super"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-blockquote"></button>
                <button className="ql-code-block"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
                <button className="ql-indent" value="-1"></button>
                <button className="ql-indent" value="+1"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-direction" value="rtl"></button>
                <select className="ql-align"></select>
              </span>
              <span className="ql-formats">
                <button className="ql-link"></button>
                <button className="ql-image"></button>
                <button className="ql-video"></button>
                <button className="ql-formula"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-clean"></button>
              </span>
            </div>
          </div>
          <div
            style={{ position: "fixed", left: "100vw", top: 0 }}
            ref={meetingContext.editorTempHolder}
          >
            <div
              ref={meetingContext.editorRef}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            ></div>
          </div>
          <ScrollShadow hideScrollBar size={20}>
            <div className="w-full h-screen">
              {meeting.sections.map((section: Section, index: number) => (
                <SectionForm key={index} data={section} />
              ))}
              {meeting.sections.length == 0 && (
                <div className="flex w-11/12 h-11/12 py-5">
                  <AddSection addSection={addSection} />
                </div>
              )}
            </div>
          </ScrollShadow>

          <div className="place-self-end">
            <div className="flex flex-row gap-2">
              <Button
                color="primary"
                size="sm"
                onClick={() => router.push("/meetings")}
              >
                Gå tillbaka
              </Button>
              <Button color="primary" size="sm">
                Hjälp
              </Button>
              <Button color="primary" size="sm">
                Spara
              </Button>
              <Button color="primary" size="sm">
                Publicera
              </Button>
              <Button color="primary" size="sm">
                Dela
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
