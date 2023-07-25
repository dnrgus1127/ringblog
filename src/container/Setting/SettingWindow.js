import React, { useEffect } from "react";
import SettingTemplate from "../../components/setting/SettingTemplate";

export default function SettingWindow() {
  //todo 기존 유저 세팅을 불러오는 fetch 훅 필요

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return <SettingTemplate></SettingTemplate>;
}
