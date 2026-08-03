export default function Commits({ size }: { size: string }) {
  return (
    <div
      className="rounded-full border border-[#FE5196]"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
