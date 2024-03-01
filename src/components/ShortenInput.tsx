import { useContext } from "react";
import { AppContext } from "../App";

export type ShortenInputProps = {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
};

export default function ShortenInput(props: ShortenInputProps) {
  const { isFocused, setIsFocused } = props;
  const context = useContext(AppContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    context.setData({ ...context.data, url: e.target.value, error: "" });
  };

  return (
    <div className={`input-w-btn ${isFocused ? "focused" : ""}`}>
      <input
        value={context.data.url}
        onChange={onChange}
        autoComplete="off"
        type="text"
        name="url"
        placeholder="https://subdomain.domain.tld/very-long-uri/even-more?with-qs=1"
      />
      <button
        id="shorten-submit-btn"
        type="submit"
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        shorten
      </button>
    </div>
  );
}
