// Navbar.tsx
import { useState } from "react";

interface NavbarProps {
    user: { first_name: string; last_name: string; is_admin: boolean; is_customer: boolean } | null; // Accept user data as a prop
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const toggleDropdown = () => {
        setIsOpenDropdown(prevState => !prevState);
    };
    return (
    // <nav className="bg-gray-800 p-4 text-white">
    //   <div className="flex justify-between items-center">
    //     <div className="text-xl">MyApp</div>
    //     <div className="flex items-center">
    //       {user ? (
    //         <span className="mr-4">{`Hello, ${user.first_name} ${user.last_name}`}</span>
    //       ) : (
    //         <a href="/login" className="text-blue-400">Login</a>
    //       )}
    //     </div>
    //   </div>
    // </nav>
    <nav className="bg-white shadow-xl dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <a href="#" title="" className="">
                <img className="block w-auto h-8 dark:hidden" src="https://arahonar.com/wp-content/uploads/2022/07/vyAsset-1.svg" alt="" />
                {/* <img className="hidden w-auto h-8 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg" alt="" /> */}
              </a>
            </div>
            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <li>
                <a href="#" title="" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  خانه
                </a>
              </li>
              <li className="shrink-0">
                <a href="#" title="" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  محصولات
                </a>
              </li>
              <li className="shrink-0">
                <a href="#" title="" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  مقالات
                </a>
              </li>
              <li className="shrink-0">
                <a href="#" title="" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  شرایط همکاری
                </a>
              </li>
              <li className="shrink-0">
                <a href="#" title="" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  سوالات متداول
                </a>
              </li>
            </ul>
          </div>

          <div className="flex relative items-center">
            <button onClick={toggleDropdown} id="userDropdownButton1" type="button" className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white">
              <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

              {user?.is_admin && (
                  <span className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                   پنل ادمین
                  </span>
              )}
              {user?.is_customer && (
                  <span className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                    پروفایل کاربری
                  </span>
              )}
              <svg className="w-4 h-4 text-gray-900 dark:text-white ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
              </svg>
            </button>
            {isOpenDropdown && (
                <div id="userDropdown1" className="absolute top-full left-0 translate-y-2 z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700">
                <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                    <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> My Account </a></li>
                    <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> My Orders </a></li>
                    <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Settings </a></li>
                    <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Favourites </a></li>
                    <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Delivery Addresses </a></li>
                    <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Billing Data </a></li>
                </ul>

                <div className="p-2 text-sm font-medium text-gray-900 dark:text-white">
                    <a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Sign Out </a>
                </div>
                </div>
            )}
          </div>
        </div>

        <div id="ecommerce-navbar-menu-1" className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 hidden px-4 mt-4">
          <ul className="text-gray-900 text-sm font-medium dark:text-white space-y-3">
            <li>
              <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">Best Sellers</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">Gift Ideas</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">Games</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">Electronics</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">Home & Garden</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
