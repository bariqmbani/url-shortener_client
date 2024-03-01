import React, { createRef, useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ShortenInput from "./ShortenInput";
import { AppContext } from "../App";
import { shorten } from "../apis/shorten.api";

export default function ShortenForm() {
  const recaptchaRef = createRef<ReCAPTCHA>();
  const context = useContext(AppContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!context.data.url) {
      return;
    }

    context.setData({ ...context.data, error: "" });
    const domain = extractDomainFromUrl(context.data.url);
    if (
      !isValidUrl(context.data.url) ||
      "localhost" === domain ||
      "127.0.0.1" === domain ||
      "uwurl.xyz" === domain ||
      "urlw.xyz" === domain
    ) {
      context.setData({ ...context.data, error: "Invalid URL" });
      return;
    }

    context.setData({ ...context.data, isLoading: true });
    const captcha = await recaptchaRef.current?.executeAsync();
    const shortenUrl = await shorten(context.data.url, captcha!);
    context.setData({ isLoading: false, url: "", result: shortenUrl, error: "" });
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <form onSubmit={onSubmit} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <ShortenInput isFocused={isFocused} setIsFocused={setIsFocused} />
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={import.meta.env.VITE_APP_RECAPTCHA_CLIENT_KEY!}
        onChange={() => recaptchaRef.current?.reset()}
        size="invisible"
        badge="bottomright"
      />
    </form>
  );
}

function isValidUrl(url: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
}

function extractDomainFromUrl(urlString: string) {
  // Prepend 'http://' if the URL doesn't have a protocol
  if (!urlString.startsWith("http://") && !urlString.startsWith("https://")) {
    urlString = "http://" + urlString;
  }

  const parsedUrl = new URL(urlString);
  let hostname = parsedUrl.hostname;

  if (!hostname) {
    // If hostname is null, return the original input
    return urlString.replace(/^(https?:\/\/)?/i, ""); // Remove 'http://' or 'https://'
  }

  // Check if the hostname is an IP address
  if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname)) {
    return hostname; // Return the IP address itself
  }

  // If hostname starts with 'www.', remove it
  if (hostname.startsWith("www.")) {
    hostname = hostname.slice(4);
  }

  // Split the hostname by '.' and get the last two parts
  const parts = hostname.split(".");
  const domain = parts.slice(-2).join(".");
  return domain;
}
