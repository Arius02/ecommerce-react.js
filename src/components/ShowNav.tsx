import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const ShowNav = () => {
  const { setShow } = useContext(AppContext);

  const handleShow = () => {
    setShow(window.innerWidth <= 900);
  };

  useEffect(() => {
    handleShow(); // Initial check on mount
    window.addEventListener("resize", handleShow);

    return () => window.removeEventListener("resize", handleShow);
  }, []); 

  return null;
};

export default ShowNav;
