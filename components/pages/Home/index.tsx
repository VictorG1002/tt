import React from "react";


interface IHomePageProps {
  activeTab: string;
}

export default function HomePage({ activeTab }: IHomePageProps) {

  return (
    <>
      {activeTab}
    </>
  )

} 
