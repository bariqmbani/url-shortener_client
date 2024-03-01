type InfoType = "copy" | "error";
type InfoProps = {
  type: InfoType;
  text: string;
};

export default function Info({ type, text }: InfoProps) {
  return (
    <div>
      <div className={`info ${type}-info fade-in`}>{text}</div>
    </div>
  );
}
