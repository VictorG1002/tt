import React from "react";

import Image from "next/image";

import { useGlobal } from "@/contexts/global";

import { tabsOptions } from "@/utils/constants";

import * as S from "./styles";

export default function Header() {

  const { setActiveTab, activeTab } = useGlobal();

  return (
    <S.HeaderContainer>
      <Image src={'/images/logo.svg'} width={103} height={14} alt="logo" />

      <div className="buttons">
        {tabsOptions.map((option, index) => (
          <S.ButtonHeader key={index} $isSelected={activeTab === option} onClick={() => setActiveTab(option)}>
            {option}
          </S.ButtonHeader>
        ))}

      </div>
    </S.HeaderContainer>
  )
}
