import React from 'react';

import HomePage from '@/components/pages/Home';
import { useGlobal } from '@/contexts/global';

export default function Home() {

  const { activeTab } = useGlobal()

  return (
    <HomePage activeTab={activeTab} />
  );
}
