export type ShortenInputProps = {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
};

export default function ShortenInput(props: ShortenInputProps) {
  const { isFocused, setIsFocused } = props;

  return (
    <div className={`input-w-btn ${isFocused ? "focused" : ""}`}>
      <input
        autoComplete="off"
        type="url"
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
