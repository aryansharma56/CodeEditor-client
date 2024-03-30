import React from "react";

export const TopBar = ({ roomId, socketInstance, lang, setLang, prevLang }) => {
  console.log(lang);
  const options = [
    {
      name: "C++ 17",
      value: "cpp",
    },
    { name: "Python 3", value: "python3" },
    { name: "NodeJs", value: "nodejs" },
    {
      name: "Java",
      value: "java",
    },
  ];
  return (
    <div className="flex justify-between p-2">
      <div>Co-de Editor</div>
      <div className="bg-[#31363F]">
        <select
          className=" bg-[#31363F]"
          value={lang}
          onChange={(e) => {
            // prevLang.current = lang;
            setLang(e.target.value);
            const l = e.target.value;
            console.log(l);
            socketInstance.emit("lang-select", { roomId, lang: l });
          }}
        >
          <option value={"noLang"}>Select a language</option>
          {options.map((value, index) => {
            return <option value={value.value}>{value.name}</option>;
          })}
        </select>
      </div>
    </div>
  );
};
