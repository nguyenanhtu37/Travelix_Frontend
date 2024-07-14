import React from 'react'
import "./NavBar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const NavBar = () => {
  return (
    <div className="nav-bar">
        <div className="wrapper">
            <div className="search">
                <input type="text" placeholder='Search...'/>
                <SearchOutlinedIcon/>
            </div>
            <div className="items">
                <div className="item">
                    <LanguageOutlinedIcon className='icon'/>
                    Language
                </div>
                <div className="item">
                    <DarkModeOutlinedIcon className='icon'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar