export const FiltrSvg = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" id="settings" viewBox="0 0 24 24" fill="none" width="24" height="24">
    <circle cx="9" cy="8" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <circle cx="15" cy="16" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <path d="M11 8L20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <path d="M4 8H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <path d="M17 16H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <path d="M4 16H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
}

export const Refresh = () => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'rotate(350deg)', }}
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
      stroke="blue"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        strokeDasharray: 70, // Circumference or length of the path
        strokeDashoffset: 0, // Keep the blue stroke static
      }}
    />
    <path
      d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
      stroke={"white"} // Use the color state to control stroke color
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        strokeDasharray: 70, // Circumference or length of the path
        strokeDashoffset: 0, // Keep the path visible
        transition: 'stroke 1s ease-out', // Animate the color change over 1 second
      }}
    />
    {/* <path d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" /> */}
  </svg>
}

export const ArrowSvg = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none">
    <path
      d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="white" />
  </svg>
}

export const WalletSvg = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V8V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V10C22 7.79086 20.2091 6 18 6C18 3.79086 16.2091 2 14 2H6ZM16 6H4C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6ZM4 18V8H18C19.1046 8 20 8.89543 20 10V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18ZM14 13C13.4477 13 13 13.4477 13 14C13 14.5523 13.4477 15 14 15H17C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13H14Z" fill="#5599FF" />
  </svg>
}

export const ButtonArrow = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none">
    <g id="SVGRepo_bgCarrier" stroke-width="0" />
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
    <g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#2f8af5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </g>
  </svg>
}


export const DownSvg = () => {
  return <svg width="24" height="12" style={{ transform: 'rotate(180deg)', marginTop: 2 }} >
    <path d="M12 2L12 22M12 2L8 6M12 2L16 6" stroke="#44556f" strokeWidth="2" strokeLinecap="round" />
  </svg>
}