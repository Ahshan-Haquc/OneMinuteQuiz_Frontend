import { useEffect, useRef } from "react";

const CharInputBox = ({ value, index, onChange, isDisabled, autoFocus }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <input
      id={`input-${index}`}
      ref={inputRef}
      type="text"
      maxLength={1}
      disabled={isDisabled}
      value={value}
      onChange={(e) => onChange(e.target.value.toUpperCase(), index)}
      className={`h-[30px] w-[45px] md:h-[65px] md:w-[100px] ${
        isDisabled ? "bg-gray-300 text-black" : "bg-[#088395] text-white"
      } rounded-lg center text-center text-2xl md:text-6xl baloo-bhai`}
    />
  );
};

export default CharInputBox;
