import React from "react";
import { useState, useRef } from "react";
import { HashTag } from "../style/MenuCSS";
import { postMenuItem, getUserMenu } from "../api/fetch2";
import { async } from "q";

const MenuInput = ({ setUserMenuList, userId }) => {
  const inputMenu = useRef(null);
  const inputTags = useRef(null); 
  const [inputTagArr, setInputTagArr] = useState([]);

  // 정규표현식 = 스페이스바, 특수문자, 빈 값 금지
  const regex = /^[a-zA-Z가-힣ㄱ-ㅎ0-9]+$/;
  // 글자 사이에 공백 허용할지는 고민
  // const regex = /^[a-zA-Z가-힣ㄱ-ㅎ0-9\s]+$/;

  const handleAddTag = () => {
    const tag = inputTags.current.value;
    if (regex.test(tag)) {
      setInputTagArr([...inputTagArr, tag]);
      console.log("올바른 값");
    } else {
      console.log("잘못된 값");
    }
    inputTags.current.value = null;
  };
  const handleAddTagEnter = e => {
    if (e.key === "Enter") {
      let copyItem = e.target.value;
      if (regex.test(copyItem)) {
        setInputTagArr([...inputTagArr, copyItem]);
        console.log("올바른 값");
      } else {
        console.log("잘못된 값");
      }
      e.target.value = null;
    }
  };
  const handleRemoveTag = e => {
    let selectedItem = e.target.previousSibling.innerText;
    let copy = inputTagArr.filter(item => item !== selectedItem);
    setInputTagArr(copy);
  };
  const handleSaveMenu = async () => {
    let menuname = inputMenu.current.value.trim();
    if (regex.test(menuname)) {
      console.log("태그 저장 & 메뉴 저장");
      console.log("메뉴 = " + menuname);
      console.log(inputTagArr);
      console.log(userId);
      // axios POST
      const postMenuRes = await postMenuItem(userId, menuname, inputTagArr);
      // 칸 비우기
      setInputTagArr([]);
      inputMenu.current.value = null;
      // 메뉴 불러오기
      const getMenuRes = await getUserMenu(setUserMenuList, userId);
    } else {
      console.log("메뉴와 해시태그를 입력해주세요");
    }
  };

  // JSX
  return (
    <div>
      <h2>메뉴등록</h2>
      <div>
        <input
          style={{ border: "1px solid black" }}
          type="text"
          ref={inputMenu}
          placeholder="메뉴입력"
        />
        <br />
        <input
          style={{ border: "1px solid black" }}
          type="text"
          ref={inputTags}
          onKeyPress={handleAddTagEnter}
          placeholder="해시태그입력"
        />
        <button onClick={handleAddTag}>클릭</button>
        <br />
        {inputTagArr.map((item, index) => {
          return (
            <HashTag key={index}>
              <span>{item}</span>
              <button onClick={handleRemoveTag}></button>
            </HashTag>
          );
        })}
        <br />
        <button style={{ border: "1px solid black" }} onClick={handleSaveMenu}>
          완료(db에 저장)
        </button>
      </div>
    </div>
  );
};

export default MenuInput;
