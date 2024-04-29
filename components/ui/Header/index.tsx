import React from "react";

import Image from "next/image";

import { useGlobal } from "@/contexts/global";

import { tabsOptions } from "@/utils/constants";

import { AiOutlineGold } from "react-icons/ai";

import * as S from "./styles";

export default function Header() {

  const { setActiveTab, activeTab, setSelectedFilter } = useGlobal();

  return (
    <S.HeaderContainer>
      <Image src={'/images/logo.svg'} width={103} height={14} alt="logo" />

      <div className="buttons">
        {tabsOptions.map((option, index) => (
          <S.ButtonHeader key={index} $isSelected={activeTab === option} onClick={() => {
            setSelectedFilter('')
            setActiveTab(option)
          }
          }>
            <AiOutlineGold size={14} color="#ffffff" />

            {option}
          </S.ButtonHeader>
        ))}

      </div>
    </S.HeaderContainer>
  )
}
