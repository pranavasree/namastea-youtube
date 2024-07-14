import React, { useContext ,useState,useEffect} from 'react';
import { SidebarContext } from '../../utils/UseSidebar';
import { MenuIcon, YouTubeLogo, SearchIcon, VideoIcon, NotificationIcon } from '../../utils/Icons';
import { YOUTUBE_SEARCH_API } from '.././../utils/Constants';

const Navbar = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const [searchQuery, setSearchQuery] = useState('');
  console.log('This is API call searchQuery:', searchQuery);

/** How it's working:
 * key - i
 * - Component renders.
 * - `useEffect` runs.
 * - Starts a timer to make an API call after 200ms.
 * 
 * key - ip (i press p before 200ms)
 * -Cleanup function from the previous `useEffect` run clears the previous timer even before re-render happens.
 * - Component re-renders due to state change (`searchQuery`).
 * - `useEffect` runs again.
 * - Starts a new timer to make an API call after 200ms.
 * 
 * This process repeats, effectively debouncing the API calls.
 */

  // Making a API call when search query changes
  useEffect(()=>{
    // Make a API call for every key stroke press
    // But if the difference between 2 API calls is less then < 200 ms then don't make another API call
    const timer =setTimeout(()=>getSearchResults(), 3000);
    // return the timer so that it gets cleared when the component unmounts(this is called even before re-render)
    return () => clearTimeout(timer);
  },[searchQuery])

  const getSearchResults = async() =>{
    const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const data = await response.json();
    console.log('This is data', data[1]);
  }
  return (
    <div className='nav-container'>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between bg-black px-4 py-2 z-50">
        <div className="flex items-center">
          {/* Menu button for medium and larger screens only else its hidden */}
          <button className="p-2 hover:bg-gray-700 rounded-full hidden lg:block" onClick={toggleSidebar}>
            <MenuIcon className="text-white" />
          </button>
          <a href="/" className="ml-4 flex items-center">
            <YouTubeLogo className="text-white" />
          </a>
        </div>
        <div className="w-[600px]">
           <div className='hidden sm:flex flex-grow max-w-2xl mx-4'> 
              <input type="text" placeholder="Search" className="w-full px-3 py-2 border border-gray-700 bg-black text-white rounded-l-full focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                />
              <button className="bg-gray-700 px-6 py-2 rounded-r-full border border-l-0 border-gray-700 hover:bg-gray-600">
                <SearchIcon className="text-white" />
              </button>
           </div>
           <div className='pl-4 mt-1 fixed'>
              <ul className='text-white  px-3 py-3 flex flex-col bg-black w-[500px] rounded-lg '>
                <l1 className='hover:bg-slate-600'>iphone</l1>
                <l1 className='hover:bg-slate-600'>iphone x</l1>
                <l1 className='hover:bg-slate-600'>iphone 11</l1>
                <l1 className='hover:bg-slate-600'>iphone 12</l1>
                <l1 className='hover:bg-slate-600'>iphone 13</l1>
                <l1 className='hover:bg-slate-600'>iphone 13 pro</l1> 
                <l1 className='hover:bg-slate-600'>iphone 14 pro</l1>
                
              </ul>
           </div>
        </div>
        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <VideoIcon className="text-white" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <NotificationIcon className="text-white" />
          </button>
          <button className="ml-2 w-8 h-8 rounded-full font-semibold bg-gray-400 text-gray-700 flex items-center justify-center">
            A
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
