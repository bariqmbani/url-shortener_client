import React, { createRef, useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ShortenInput from "./ShortenInput";
import { AppContext } from "../App";

export default function ShortenForm() {
  const recaptchaRef = createRef<ReCAPTCHA>();
  const context = useContext(AppContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const token = await recaptchaRef.current?.executeAsync();
    const urlInput = form.elements.namedItem("url") as HTMLInputElement;
    console.log({
      url: urlInput.value,
      client: token,
    });
    context.setData({ result: urlInput.value });
    recaptchaRef.current?.reset();
    form.reset();
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <form onSubmit={onSubmit} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <ShortenInput isFocused={isFocused} setIsFocused={setIsFocused} />
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6Leh4YMpAAAAAMYRJlyWm4XoAtwZbBKaQhMBKHK2"
        size="invisible"
        badge="bottomright"
      />
    </form>
  );
}
