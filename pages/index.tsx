import React, { useEffect, useState } from 'react';

import { useGlobal } from '@/contexts/global';
import { getTreeData } from '@/utils/utils';
import { IoSearchOutline } from 'react-icons/io5';
import TreeView from '@/components/ui/TreeView';

import * as S from '../styles/index'

export default function Home() {

  const { dispatch, state, activeTab } = useGlobal();
  const [searchQuery, setSearchQuery] = useState('')


  function onHandleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setSearchQuery(query)
    dispatch({ type: 'SEARCH', query })
  }

  useEffect(() => {
    dispatch({ type: 'INIT_DATA', data: getTreeData(activeTab) })
    console.log('rodou')
  }, [activeTab])

  return (
    <S.HomeContainer>
      <section className="header">
        <div className="title">Ativos<span> / {activeTab}</span></div>

        <div>
          <button>
            Sensor de Energia
          </button>

          <button>
            Crítico
          </button>
        </div>
      </section>

      <section className="columns">
        <div>
          <div className="input">
            <input value={searchQuery} type="text" placeholder="Buscar Ativo ou Local" onChange={onHandleSearch} />

            <button>
              <IoSearchOutline size={14} />
            </button>
          </div>

          <div className="view">
            <TreeView data={state || []} />
          </div>
        </div>


        <div>b</div>
      </section>
    </S.HomeContainer>
  );
}
