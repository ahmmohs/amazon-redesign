import React from "react";

export default function useCheckMobile() {
  const [isMobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    
    const checkMobile = () => {
      if (window.outerWidth <= 600) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return { isMobile };
}