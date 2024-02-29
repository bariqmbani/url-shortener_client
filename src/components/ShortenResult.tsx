import { useContext } from "react";
import CopyIcon from "./icon/CopyIcon";
import { AppContext } from "../App";

export default function ShortenResult() {
  const context = useContext(AppContext);

  if (!context.data.result) {
    return <></>;
  }

  const copy = () => {
    navigator.clipboard.writeText(context.data.result!);
  };

  return (
    <div className="result">
      <button className="icon-btn" onClick={copy}>
        <span>{context.data?.result}</span>
        <span>
          <CopyIcon className="icon" size={20} />
        </span>
      </button>
    </div>
  );
}
