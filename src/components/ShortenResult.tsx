import { useContext, useState } from "react";
import CopyIcon from "./icon/CopyIcon";
import { AppContext } from "../App";

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
        <button className="icon-btn" onClick={copy}>
          <span>{context.data?.result}</span>
          <span>
            <CopyIcon className="icon" size={20} />
          </span>
        </button>
        {isCopied && <div className="copy-info fade-in">Link copied to clipboard.</div>}
      </div>
    </>
  );
}
