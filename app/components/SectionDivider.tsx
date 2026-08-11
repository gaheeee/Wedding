import Image from "next/image";
import paperFoldCotton from "@/public/images/paper-fold-cotton.png";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      className={`paper-divider ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Image
        src={paperFoldCotton}
        alt="divider"
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
