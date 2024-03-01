import { useContext, useState } from "react";
import CopyIcon from "./icon/CopyIcon";
import { AppContext } from "../App";
import Info from "./Info";

export default function ShortenResult() {
  const context = useContext(AppContext);
  const [isCopied, setIsCopied] = useState(false);

  if (!context.data.result) {
    return <></>;
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(context.data.result!);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (_ignored) {
      // do nothing for now
    }
  };

  return (
    <>
      <div className="result">
        {context.data.result.startsWith("http") ? (
          <button className="icon-btn tooltip" onClick={copy}>
            <span>{context.data?.result}</span>
            <span>
              <CopyIcon className="icon" size={20} />
            </span>
            <span className="tooltip-text">click to copy</span>
          </button>
        ) : (
          <div className="error">error: {context.data.result}</div>
        )}

        {isCopied && <Info type="copy" text="Link copied to clipboard." />}
      </div>
    </>
  );
}
