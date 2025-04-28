import { useEffect, useState , useRef } from 'react';
import { SVGPanel , SVGSubmenu } from '@/svg';

const Sidebar = () => {
    const [isClient, setIsClient] = useState(false);
    const [menuVisibility, setMenuVisibility] = useState({
        users: false,
        companies: false,
    });

    const menuRefs = {
        users: useRef(null),
        companies: useRef(null),
    };
    const [menuHeights, setMenuHeights] = useState({
        users: '0px',
        companies: '0px',
    });
    const toggleMenu = (menu) => {
        setMenuVisibility((prev) => ({
            ...prev,
            [menu]: !prev[menu],  // Toggle the specific menu's visibility
        }));
    };
    useEffect(() => {
        // For each menu, calculate its height when it is visible
        const newHeights = {};
        Object.keys(menuVisibility).forEach((menu) => {
            if (menuVisibility[menu]) {
                newHeights[menu] = `${menuRefs[menu].current.scrollHeight}px`; // Set the height to the scrollHeight when visible
            } else {
                newHeights[menu] = '0px'; // Set the height to 0 when hidden
            }
        });
        setMenuHeights(newHeights);
    }, [menuVisibility]);
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null;
    }
    return (
      <div className="bg-main-600 w-1/5 h-screen" aria-label="Sidenav">
        <div className="bg-main-800 fixed top-0 right-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
            <div className='overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                <h2 className="mb-2 text-xs uppercase flex leading-[20px] text-gray-400 justify-start">نوار مدیریت</h2>
                <ul className='border-b border-gray-200 dark:border-gray-700 pb-5 mb-5'>
                    <li>
                        <a href='#' className={`${menuVisibility.users ? 'bg-gray-100' : ''} flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            <SVGPanel />
                            <span className="mr-3">کاربران</span>
                            <button onClick={() => toggleMenu('users')} className={`mr-auto transition-all duration-300 ${menuVisibility.users ? 'rotate-180' : ''}`}>
                                <SVGSubmenu />
                            </button>
                        </a>
                        <ul
                        className='mr-5 text-sm'
                            ref={menuRefs.users}
                            style={{
                                height: menuHeights.users,
                                transition: 'height 0.3s ease-out',
                                overflow: 'hidden',
                            }}
                        >
                            <li>
                                <a href='#' className='w-full block p-2 text-md font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                همه کاربران
                                </a>
                            </li>
                            <li>
                                <a href='#' className='w-full block p-2 text-md font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                افزودن جدید
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href='#' className={`${menuVisibility.companies ? 'bg-gray-100' : ''} flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            <SVGPanel />
                            <span className="mr-3">شرکت‌ها</span>
                            <button onClick={() => toggleMenu('companies')} className={`mr-auto transition-all duration-300 ${menuVisibility.companies ? 'rotate-180' : ''}`}>
                                <SVGSubmenu />
                            </button>
                        </a>
                        <ul
                            className='mr-5 text-sm'
                            ref={menuRefs.companies}
                            style={{
                                height: menuHeights.companies,
                                transition: 'height 0.3s ease-out',
                                overflow: 'hidden',
                            }}
                        >
                            <li>
                                <a href='#' className='w-full block p-2 text-md font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                همه شرکت‌ها
                                </a>
                            </li>
                            <li>
                                <a href='#' className='w-full block p-2 text-md font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                افزودن جدید
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href='#' className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <SVGPanel />
                            <span className="mr-3">کاربران</span>
                        </a>
                    </li>
                </ul>
                <h2 className="mb-2 text-xs uppercase flex leading-[20px] text-gray-400 justify-start">تنظیمات</h2>
                <ul className='space-y-2'>
                    <li>
                        <a href='#' className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <SVGPanel />
                            <span className="mr-3">کاربران</span>
                        </a>
                    </li>
                    <li>
                        <a href='#' className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <SVGPanel />
                            <span className="mr-3">کاربران</span>
                        </a>
                    </li>
                    <li>
                        <a href='#' className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                            <SVGPanel />
                            <span className="mr-3">کاربران</span>
                        </a>
                    </li>
                </ul>
                <div>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  