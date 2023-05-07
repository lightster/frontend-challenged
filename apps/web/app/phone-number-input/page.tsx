"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import useEventListener from "../../hooks/useEventListener";
import styles from "./page.module.css";

interface Props {
  value: string;
  onChange: (phoneNumber: string) => void;
}

function formatPhoneNumber(
  areaCode: string,
  centralOfficeCode: string,
  lineNumber: string
) {
  const phoneNumber = `${areaCode}${centralOfficeCode}${lineNumber}`;

  if (phoneNumber.length < 3) {
    return `${areaCode}`;
  } else if (phoneNumber.length < 6) {
    return `${areaCode}) ${centralOfficeCode}`;
  }

  return `${areaCode}) ${centralOfficeCode}-${lineNumber}`;
  // return phoneNumber.replace(/^([0-9]{0,3})([0-9]{0,3})([0-9]{0,4})$/, "$1) $2-$3").replaceAll(/[^(0-9]+$/g, "");
}

function PhoneNumberInput({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectionRef = useRef<{ start: number; end: number } | null>(null);
  // const [caretPosition, setCaretPosition] = useState(0);

  const areaCode = value.substring(0, 3);
  const centralOfficeCode = value.substring(3, 6);
  const lineNumber = value.substring(6, 10);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value.replaceAll(/[^0-9]/g, "");
    const newAreaCode = newValue.substring(0, 3);
    const newCentralOfficeCode = newValue.substring(3, 6);
    const newLineNumber = newValue.substring(6, 10);
    // const target = e.

    // if the new value's length is the same or less than the old value's,
    // that means the user deleted something
    console.log(
      JSON.stringify({
        rawNew: e.currentTarget.value,
        newValue,
        newAreaCode,
        newCentralOfficeCode,
        newLineNumber,
        oldVal: value,
        selectionStart: selectionRef.current?.start,
        selectionEnd: selectionRef.current?.end,
      }),
      e.currentTarget.selectionStart,
      e.currentTarget.selectionEnd
    );
    if (newValue === value) {
      // setCaretPosition((e.currentTarget.selectionStart || 0));
      onChange(e.currentTarget.value.replaceAll(/[^0-9]/g, ""));
    } else {
      selectionRef.current = {
        start: e.currentTarget.selectionStart || 0,
        end: e.currentTarget.selectionEnd || 0,
      };
      // setCaretPosition((e.currentTarget.selectionStart || 0) + 1);
      onChange(e.currentTarget.value.replaceAll(/[^0-9]/g, ""));
    }

    // setCaretPosition(
    //   e.currentTarget.selectionStart || 0
    //   // formatPhoneNumber(newAreaCode, newCentralOfficeCode, newLineNumber)
    //   //   .length - 1
    // );
  }
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    // selectionRef.current = {
    //   start: e.currentTarget.selectionStart || 0,
    //   end: e.currentTarget.selectionEnd || 0,
    // };
  }
  // function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
  //   const currentValue = formatPhoneNumber(
  //     areaCode,
  //     centralOfficeCode,
  //     lineNumber
  //   );
  //
  //   // const
  //   console.log(
  //     currentValue,
  //     e.key,
  //     e.currentTarget.selectionStart,
  //     e.currentTarget.selectionEnd
  //   );
  //
  //   const selectionStart = e.currentTarget.selectionStart || 0;
  //   const selectionEnd = e.currentTarget.selectionEnd || 0;
  //
  //   // if (e.key === "Backspace") {
  //   //   setCaretPosition((e.currentTarget.selectionStart || 0) - 1);
  //   //   onChange(
  //   //     currentValue
  //   //       .substring(0, e.currentTarget.selectionEnd || 0)
  //   //       .concat(currentValue.substring(e.currentTarget.selectionStart || 0))
  //   //   );
  //   // } else if (e.key === "Delete") {
  //   //   setCaretPosition(e.currentTarget.selectionStart || 0);
  //   // } else
  //   if (e.key.match(/^[0-9]$/)) {
  //     setCaretPosition(selectionStart + 1);
  //     onChange(
  //       currentValue
  //         .substring(0, selectionStart)
  //         .concat(e.key, currentValue.substring(selectionEnd))
  //         .replaceAll(/[^0-9]/g, "")
  //     );
  //   }
  // }

  useEffect(() => {
    if (selectionRef.current) {
      inputRef.current?.setSelectionRange(
        selectionRef.current.start,
        selectionRef.current.end
      );
    }
    //   console.log(caretPosition);
    //
    //   // console.log(caretPosition);
    //   // setTimeout(() => {
    //   //   if (!inputRef.current) {
    //   //     return;
    //   //   }
    //
    //   console.log(inputRef.current);
    //   console.log(inputRef.current?.value);
    //   // inputRef.current?.focus();
    // inputRef.current?.setSelectionRange(caretPosition, caretPosition);
    //   // }, 0);
  }, [value]);
  // }, [caretPosition, value]);
  //
  // useEventListener("document", "selectionchange", () => {
  //   inputRef.current?.setSelectionRange(caretPosition, caretPosition);
  //   console.log(
  //     "selectionchange",
  //     inputRef.current?.selectionStart,
  //     inputRef.current?.selectionEnd
  //   );
  // });

  console.log(
    "render",
    formatPhoneNumber(areaCode, centralOfficeCode, lineNumber)
  );
  //0123456789
  // const paddedNumber = value.padEnd(10, "X");
  // const copyPadding = "".padEnd(10 - paddedNumber.length, "X");

  return (
    <div>
      {formatPhoneNumber(areaCode, centralOfficeCode, lineNumber)}
      <br />
      {selectionRef.current?.start} - {selectionRef.current?.end}
      <br />
      <div className={styles.container}>
        (
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            type="text"
            inputMode="tel"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={14}
            className={styles.input}
          />
          <div className={styles.inputOverlay}>
            {/*<span className={styles.countryCode}>+1</span>*/}
            {/*(*/}
            <span className={styles.overlayHiddenText}>{areaCode}</span>
            {"".padEnd(3 - areaCode.length, "X")}){" "}
            <span className={styles.overlayHiddenText}>
              {centralOfficeCode}
            </span>
            {"".padEnd(3 - centralOfficeCode.length, "X")}-
            <span className={styles.overlayHiddenText}>{lineNumber}</span>
            {"".padEnd(4 - lineNumber.length, "X")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const fakePhone = "5551234567";

  return (
    <div>
      <h1>Phone number input</h1>
      <PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber} />
      {/*{Array.from(new Array(fakePhone.length)).map((_, index) => {*/}
      {/*  const partial = fakePhone.substring(0, index + 1);*/}
      {/*  return (*/}
      {/*    <PhoneNumberInput key={partial} value={partial} onChange={() => {}} />*/}
      {/*  );*/}
      {/*})}*/}
    </div>
  );
}
