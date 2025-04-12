// filepath: src/components/header/LogoType.tsx
import { useAppVersion } from "../../hooks/version";

interface LogoTypeProps {
  openedFile: string | null;
  fileModified: boolean;
}

const LogoType = ({ openedFile, fileModified }: LogoTypeProps) => {
  const appVersion = useAppVersion();
  return (
    <h1 className="text-sm font-semibold text-center">
      {openedFile ? openedFile + (fileModified ? " *" : "") + " - " : ""}
      Highs Editor <span className="text-xs text-gray-600">{appVersion}</span>
    </h1>
  );
};

export default LogoType;
