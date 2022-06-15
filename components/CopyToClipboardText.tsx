import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

type CopyToClipboardTextProps = {
  text: string;
};
const CopyToClipboardText = ({ text }: CopyToClipboardTextProps) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <CopyToClipboard
      onCopy={() => {
        setIsCopied(true);
      }}
      text={text}
    >
      <div className="flex cursor-pointer items-center justify-between rounded-lg bg-neutral px-4 py-2   hover:scale-105">
        <div className="">{text}</div>
        {isCopied ? (
          <div className="text-sm text-black opacity-40">Copied!</div>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 23 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2533 22.3643V24.3174C16.2533 24.9646 15.7287 25.4893 15.0815 25.4893H1.8002C1.15298 25.4893 0.628326 24.9646 0.628326 24.3174V6.34866C0.628326 5.70145 1.15298 5.17679 1.8002 5.17679H5.31583V19.6299C5.31583 21.1377 6.54244 22.3643 8.0502 22.3643H16.2533ZM16.2533 5.56741V0.489288H8.0502C7.40298 0.489288 6.87833 1.01395 6.87833 1.66116V19.6299C6.87833 20.2771 7.40298 20.8018 8.0502 20.8018H21.3315C21.9787 20.8018 22.5033 20.2771 22.5033 19.6299V6.73929H17.4252C16.7807 6.73929 16.2533 6.21194 16.2533 5.56741ZM22.1601 4.05233L18.9403 0.832501C18.7205 0.612747 18.4225 0.48929 18.1117 0.489288L17.8158 0.489288V5.17679H22.5033V4.88094C22.5033 4.57015 22.3799 4.27209 22.1601 4.05233V4.05233Z"
              fill="black"
              fillOpacity="0.2"
            />
          </svg>
        )}
      </div>

      {/* <button className="bg-slate-500 px-4 py-2">{`${
          isCopied ? "Copied" : "Copy"
        }`}</button> */}
    </CopyToClipboard>
  );
};

export default CopyToClipboardText;
