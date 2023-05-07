"use client";

import { ChangeEvent, FocusEvent, useState } from "react";
import styles from "./page.module.css";

interface Props {
  value: string;
  onChange: (phoneNumber: string) => void;
}

function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(
    /^([0-9]{0,3})([0-9]{0,3})([0-9]{0,4})$/,
    "+1 ($1) $2-$3"
  );
}

function PhoneNumberInput({ value, onChange }: Props) {
  const [message, setMessage] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;

    onChange(newValue);

    setMessage("");

    // const cleanedPhone = newValue.replaceAll(/[^0-9_\]/g, "")
    // const unexpectedCharacters = newValue.replaceAll(/[0-9_\-.()[\] ]+/g, "");
    // if (unexpectedCharacters) {
    //   setMessage(`You entered characters we do not allow in phone numbers: ${unexpectedCharacters}.`);
    //   return;
    // }

    const cleanedPhone = newValue.replaceAll(/[^0-9]/g, "");
    if (cleanedPhone.length > 10) {
      setMessage("The phone number you entered has more than 10 digits.");
      return;
    }

    if (cleanedPhone.length === 10) {
      setMessage(`We'll contact you at ${formatPhoneNumber(cleanedPhone)}.`);
      return;
    }
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    setMessage("");

    // const cleanedPhone = newValue.replaceAll(/[^0-9_\]/g, "")
    // const unexpectedCharacters = value.replaceAll(/[0-9_\-.()[\] ]+/g, "");
    // if (unexpectedCharacters) {
    //   setMessage(`You entered characters we do not allow in phone numbers: ${unexpectedCharacters}.`);
    //   return;
    // }

    const cleanedPhone = value.replaceAll(/[^0-9]/g, "");
    if (cleanedPhone.length < 10) {
      setMessage("The phone number you entered has fewer than 10 digits.");
      return;
    } else if (cleanedPhone.length > 10) {
      setMessage("The phone number you entered has more than 10 digits.");
      return;
    }

    setMessage(`We'll contact you at ${formatPhoneNumber(cleanedPhone)}.`);
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          +1
          <input
            type="text"
            inputMode="tel"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.input}
          />
        </div>
        {message}
      </div>
      <input type="submit" value="Submit my info" />
    </div>
  );
}

export default function Page() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div>
      <h1>Phone number input</h1>
      <PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber} />
    </div>
  );
}
