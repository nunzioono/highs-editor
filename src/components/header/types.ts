// filepath: src/components/header/types.ts
// Type definition for the file operations shared between header components
export interface FileOperations {
  openedFile: string | null;
  fileModified?: boolean;
  handleRun: () => void;
  setFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveFile: () => void;
  closeFile: () => void;
}
