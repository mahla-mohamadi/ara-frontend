export function SVGCheck(props){
    return (
  <svg
    className="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="{24}"
    height="{24}"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="{2}"
      d="M5 11.917 9.724 16.5 19 7.5"
    />
  </svg>
);
}

export function SVGCross(props){
    return (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="{24}"
      height="{24}"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M6 18 17.94 6M18 18 6.06 6"
      />
    </svg>
);
}
export function SVGTrash(props){
    return (
        <svg
        className="cursor-pointer w-4 h-4 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="{24} "
        height="{24} "
        fill="none"
        viewBox="0 0 24 24"
        {...props}
        >
        <path
            stroke="red"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M6 18 17.94 6M18 18 6.06 6"
        />
        </svg>
    );
}
export function SVGDelete(props){
    return (
        <svg
        className="cursor-pointer transition-all delay-75 opacity-[0.5] hover:opacity-[1] w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="{24} "
        height="{24} "
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2} "
          d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
        />
      </svg>
    );
}
export function SVGRestore(props){
    return (
        <svg
        className="cursor-pointer transition-all delay-75 opacity-[0.5] hover:opacity-[1] w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="{24} "
        height="{24} "
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2} "
          d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
        />
      </svg>
    );
}
export function SVGBin(props){
    return (
      <svg
      className="w-6 h-6 text-neutral-600 bg-white rounded-full p-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="{10} "
      height="{10} "
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{1.5} "
        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1M6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"
      />
    </svg>
    );
}
export function SVGBack(props){
    return (
      <svg
      className="w-6 h-6 text-neutral-600 bg-white rounded-full p-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="{24}"
      height="{24}"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M19 12H5m14 0-4 4m4-4-4-4"
      />
    </svg>
    );
}
export function SVGEdit(props){
    return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
    </svg>
  );
}
export function SVGArrow(props){
    return (
      <svg
      className="w-4 h-4 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      fill="none"
      viewBox="3 3 18 18"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 12h14M5 12l4-4m-4 4 4 4"
      />
    </svg>
  );
}
export function SVGEye(props){
    return (
      <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#404040"
        strokeWidth={1}
        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6 4.03-6 9-6 9 4.8 9 6Z"
      />
      <path
        stroke="#404040"
        strokeWidth={1}
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}
export function SVGBlind(props){
    return (
      <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#404040"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.933 13.909A4.36 4.36 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.07 5.07 0 0 1 21 12c0 1-3 6-9 6q-.471 0-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
      />
    </svg>
  );
}
export function SVGPanel(props){
    return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 3.25A2.25 2.25 0 0 0 3.25 5.5V9a2.25 2.25 0 0 0 2.25 2.25H9A2.25 2.25 0 0 0 11.25 9V5.5A2.25 2.25 0 0 0 9 3.25zM4.75 5.5a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75V9a.75.75 0 0 1-.75.75H5.5A.75.75 0 0 1 4.75 9zm.75 7.25A2.25 2.25 0 0 0 3.25 15v3.5a2.25 2.25 0 0 0 2.25 2.25H9a2.25 2.25 0 0 0 2.25-2.25V15A2.25 2.25 0 0 0 9 12.75zM4.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75H5.5a.75.75 0 0 1-.75-.75zm8-9.5A2.25 2.25 0 0 1 15 3.25h3.5a2.25 2.25 0 0 1 2.25 2.25V9a2.25 2.25 0 0 1-2.25 2.25H15A2.25 2.25 0 0 1 12.75 9zM15 4.75a.75.75 0 0 0-.75.75V9c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75V5.5a.75.75 0 0 0-.75-.75zm0 8A2.25 2.25 0 0 0 12.75 15v3.5A2.25 2.25 0 0 0 15 20.75h3.5a2.25 2.25 0 0 0 2.25-2.25V15a2.25 2.25 0 0 0-2.25-2.25zM14.25 15a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75z"
        fill="currentColor"
      />
    </svg>
  );
}
export function SVGSubmenu(props){
    return (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-auto w-5 h-5 transition-transform duration-200"
        {...props}
      >
        <path
          d="M4.792 7.396 10 12.604l5.208-5.208"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
  );
}