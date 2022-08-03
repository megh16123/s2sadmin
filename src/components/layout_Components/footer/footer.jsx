import React from "react";
import './footer.css';

function Footer(props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={props.page==="Login"?'position-fixed':''}>
      <p>Copyright S2S, &copy; {currentYear}</p>
    </footer>
  );
}

export default Footer;
