import React, { useEffect, useState } from 'react';

import { useGlobal } from '@/contexts/global';
import { getTreeData } from '@/utils/utils';
import { IoSearchOutline } from 'react-icons/io5';
import TreeView from '@/components/ui/TreeView';

import * as S from '../styles/index'
import { buttonsOptions } from '@/utils/constants';

export default function Home() {

  const { dispatch, state, activeTab , selectedFilter, setSelectedFilter, } = useGlobal();
  const [searchQuery, setSearchQuery] = useState('')
  
  function onHandleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;

    setSearchQuery(query)

    dispatch({ type: 'SEARCH', query })
  }

  useEffect(() => {
    dispatch({ type: 'INIT_DATA', data: getTreeData(activeTab) })
  }, [activeTab])

  return (
    <S.HomeContainer>
      <section className="header">
        <div className="title">Ativos<span> / {activeTab}</span></div>

        <div className='buttons'>
          {buttonsOptions.map((button) => (
            <S.Button $isSelected={selectedFilter === button.type} key={button.type} onClick={() => {
              setSelectedFilter(button.type)
              dispatch({ type: button.type, state: state }
              )
            }}>
              {button.label}
            </S.Button>
          ))}
        </div>
      </section>

      <section className="columns">
        <div>
          <div className="input">
            <input value={searchQuery} type="text" placeholder="Buscar Ativo ou Local" onChange={onHandleSearch} />

            <IoSearchOutline size={14} />
          </div>

          <div className="view">
            <TreeView data={state || []} />
          </div>
        </div>


        <div></div>
      </section>
    </S.HomeContainer>
  );
}
