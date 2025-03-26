import { useState } from "react";
import { FiFile, FiSave, FiX, FiPlay } from "react-icons/fi";
import { useAppVersion } from "../hooks/version";
import { useHighs } from "../hooks/highs";
import { useEditing } from "../hooks/editing";

// Type definition for the file operations
interface FileOperations {
  openedFile: string | null;
  fileModified?: boolean;
  handleRun: () => void;
  setFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveFile: () => void;
  closeFile: () => void;
}

const Header = () => {
  const { openedFile, fileModified } = useEditing();
  const { code, updateOutput, openFile, saveFile, closeFile } = useEditing();
  const highs = useHighs();

  // We'll create a dummy handler for the run action
  const handleRun = () => {
    try {
      const solution = highs?.solve(code);
      if (solution) {
        updateOutput([JSON.stringify(solution)]);
      }
    } catch (error) {
      updateOutput([(error as Error).message]);
    }
  };

  const setFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      openFile(file.name, await file.text());
    }
  }

  // Create a file operations object that can be passed to both menus
  const fileOperations = {
    openedFile,
    fileModified,
    handleRun,
    setFile,
    saveFile,
    closeFile
  };

  return (
    <div className="bg-gray-100">
      {/* App title bar - centered title with version */}
      <div className="bg-gray-200 py-1.5 border-b border-gray-300 relative">
        <LogoType openedFile={openedFile} fileModified={fileModified} />
      </div>

      {/* First row - dropdown menus */}
      <DropdownsMenu fileOperations={fileOperations} />

      {/* Second row - icon toolbar */}
      <IconsMenu fileOperations={fileOperations} />
    </div>
  );
};

export default Header;

const LogoType = ({ openedFile, fileModified }: { openedFile: string | null, fileModified: boolean }) => {
  const appVersion = useAppVersion();
  return (
    <h1 className="text-sm font-semibold text-center">
    {openedFile? openedFile + (fileModified? " *" : "") + " - " : ""}
    Highs Editor <span className="text-xs text-gray-600">{appVersion}</span>
    </h1>
  )
}

const IconsMenu = ({ fileOperations }: { fileOperations: FileOperations }) => {
  const { openedFile, handleRun, setFile, saveFile, closeFile } = fileOperations;
  const isFileOpen = openedFile !== null;
  const baseClass = "relative p-2 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50";

  return (
    <div className="flex border-b border-gray-200">
      <button className={baseClass + (isFileOpen ? " opacity-50" : "")} title="Open file" disabled={isFileOpen} onClick={() => {}}>
        <FiFile />
        <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0"
        accept=".lp,.sav,.xlp,.xli"
        onChange={setFile}
        />
      </button>
      <button className={baseClass + (!isFileOpen ? " opacity-50" : "")} title="Save file" onClick={saveFile} disabled={!isFileOpen}>
        <FiSave />
      </button>
      <button className={baseClass + (!isFileOpen ? " opacity-50" : "")} title="Close file" onClick={closeFile} disabled={!isFileOpen}>
        <FiX />
      </button>

      {/* Added Run button with play icon */}
      <button
        className={baseClass + " text-green-600" + (!isFileOpen ? " opacity-50" : "")}
        title="Run code"
        onClick={handleRun}
        disabled={!isFileOpen}
      >
        <FiPlay />
      </button>
    </div>
  )
}

const DropdownsMenu = ({ fileOperations }: { fileOperations: FileOperations }) => {
  const { openedFile, handleRun, setFile, saveFile, closeFile } = fileOperations;
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);

  const toggleFileMenu = () => {
    setIsFileMenuOpen(!isFileMenuOpen);
  };

  return (
    <div className="border-b border-gray-200 flex">
      <div className="relative inline-block">
        <button
          className="px-4 py-1 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50"
          onClick={toggleFileMenu}
        >
          File
        </button>

        {isFileMenuOpen && (
          <div className="absolute left-0 mt-0 w-40 bg-white border border-gray-300/70 z-10">
            <ul>
              <OpenButton setFile={setFile} disabled={!!openedFile}/>
              <MenuButton action="Save" onClick={saveFile} disabled={!openedFile} children={<></>}/>
              <MenuButton action="Close" onClick={closeFile} disabled={!openedFile} children={<></>}/>
            </ul>
          </div>
        )}
      </div>

      {/* Added a Run dropdown menu */}
      <div className="relative inline-block">
        <button
          className="px-4 py-1 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50"
          onClick={handleRun}
        >
          Run
        </button>
      </div>
    </div>
  );
}

const MenuButton = ({ action, disabled, onClick, children }: { action: string, disabled: boolean, onClick: () => void, children: React.ReactNode }) => {
  return (
    <li className={"relative px-4 py-1 hover:bg-gray-100 cursor-pointer" + (disabled ? " opacity-50" : "")}
    onClick={onClick}
    >
        {action}
        {children}
    </li>
  )
}

const OpenButton = ({ setFile, disabled }: { setFile: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled: boolean }) => {
  return (
    <MenuButton action="Open" disabled={disabled} onClick={() => {}}>
      <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0"
      accept=".lp,.sav,.xlp,.xli"
      onChange={setFile}
      />
    </MenuButton>
  )
}

