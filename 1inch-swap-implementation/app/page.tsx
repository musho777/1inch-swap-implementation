"use client"
import Swap from './Components/Swap/Swap'
import SelectDestinationToken from './Components/SelectDestinationToken/index'
import { useState } from 'react';

export default function Home() {

  const [page, setPage] = useState(true)
  return (
    <div className='page'>
      {page ?
        <Swap setPage={(e) => setPage(e)} /> :
        <SelectDestinationToken setPage={(e) => setPage(e)} />
      }
    </div>
  );
}
