import React from 'react'
import './Home.css'
import sample from '../assets/images/nike1.mp4';

const Home = () => {
  /*   const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(!open);
    };
  
    const handleMenuOne = () => {
      // do something
      setOpen(false);
    };
  
    const handleMenuTwo = () => {
      // do something
      setOpen(false);
    }; */
  const [category, setCategory] = React.useState('');

  const handleCategoryChange = (category) => {
    setCategory(category);
    console.log(category);
  }
  return (
    <div className="dropdown">
      {/* <button onClick={handleOpen}>Dropdown</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={handleMenuOne}>Menu 1</button>
          </li>
          <li className="menu-item">
            <button onClick={handleMenuTwo}>Menu 2</button>
          </li>
        </ul>
      ) : null}
 */}
      <video className='videoTag' id="myVideo" autoPlay loop muted>
        <source src={sample} type='video/mp4' />
      </video>
      <br />
      {/* <div class="relative inline-block text-left">
        <div>
          <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            Options
            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
            <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
            <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
            <form method="POST" action="#" role="none">
              <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
            </form>
          </div>
        </div>
      </div> */}
    </div>




  );
}

export default Home