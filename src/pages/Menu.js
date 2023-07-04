import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import MenuInput from "../components/MenuInput";
import ShowMenuList from "../components/ShowMenuList";
import { getUserMenu, getCommonMenu } from "../api/fetch";
import axios from "axios";
import { Switch } from "antd";

const Menu = () => {
  // 로딩 처리
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [userMenuList, setUserMenuList] = useState([]);
  const [commonMenuList, setCommonMenuList] = useState([]);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    getUserMenu(setUserMenuList);
    getCommonMenu(setCommonMenuList);
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      <div>Menu</div>
      <hr />
      메뉴입력하기
      <Switch onChange={handleToggle} />
      메뉴출력하기
      <hr />
      {toggle ? <MenuInput /> : <ShowMenuList userMenuList={userMenuList} commonMenuList={commonMenuList} />}
      {/* {toggle && <MenuInput />}
      {toggle || <ShowMenuList menuList={menuList} />} */}
    </div>
  );
};

export default Menu;
