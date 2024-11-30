"use client"
import './styles.css'
import { ClearSvg, SearchSvg } from '../../../../utils/svg'
import { useState } from 'react'
export const SearchInput = () => {
  const [value, setValue] = useState("")
  return <div className="searchInput">
    <div className='searchSvg'>
      <SearchSvg />
    </div>
    {value && <div onClick={() => setValue("")} className='clearSvg'>
      <ClearSvg />
    </div>}
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder='Search by name or paste address'
    />
  </div>
}