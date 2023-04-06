// import React, { useState } from "react";
// import styled from "styled-components";

// const Nav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleNav = () => {
//     setIsOpen((prev) => !prev);
//   };
//   return (
//     <NavWrapper>
//       <NavBrand href="#">Brand</NavBrand>
//       <HamburgerIcon isOpen={isOpen} onClick={toggleNav}>
//         <div />
//       </HamburgerIcon>
//       <NavLinks isOpen={isOpen}>
//         <NavLink>Home</NavLink>
//         <NavLink>About</NavLink>
//         <NavLink>Contact</NavLink>
//       </NavLinks>
//     </NavWrapper>
//   );
// };
// export default Nav;

// const NavWrapper = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem;
//   background-color: #f5f5f5;
//   color: #333;
// `;

// const NavBrand = styled.a`
//   font-weight: bold;
//   font-size: 1.5rem;
//   text-decoration: none;
//   color: #333;
// `;

// const NavLinks = styled.ul<{ isOpen: boolean }>`
//   display: flex;
//   flex-direction: ${({ isOpen }) => (isOpen ? "column" : "row")};
//   justify-content: ${({ isOpen }) => (isOpen ? "center" : "flex-end")};
//   align-items: center;
//   list-style: none;
//   margin: 0;
//   padding: ${({ isOpen }) => (isOpen ? "1rem" : "0")};
//   position: absolute;
//   top: 100%;
//   left: 0;
//   width: 100%;
//   background-color: #f5f5f5;

//   @media (min-width: 992px) {
//     position: static;
//     flex-direction: row;
//     justify-content: flex-end;
//     width: auto;
//     background-color: transparent;
//     padding: 0;
//   }
// `;

// const NavLink = styled.li`
//   margin: 0 1rem;
//   padding: 0.5rem 1rem;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out;

//   &:hover {
//     background-color: #ddd;
//   }

//   @media (min-width: 992px) {
//     margin: 0;
//     padding: 1rem;
//     background-color: transparent;

//     &:hover {
//       background-color: transparent;
//     }
//   }
// `;

// const HamburgerIcon = styled.button<{ isOpen: boolean }>`
//   display: block;
//   width: 30px;
//   height: 30px;
//   background-: transparent;
//   border: none;
//   padding: 0;
//   cursor: pointer;
//   position: relative;
//   z-index: 10;

//   &::before,
//   &::after,
//   div {
//     content: "";
//     display: block;
//     background-color: #333;
//     height: 3px;
//     width: 100%;
//     position: absolute;
//     left: 0;
//     transition: transform 0.2s ease-in-out;
//   }

//   &::before {
//     top: ${({ isOpen }) => (isOpen ? "0" : "-10px")};
//     transform: ${({ isOpen }) =>
//       isOpen ? "rotate(-45deg) translate(-5px, 5px)" : "none"};
//   }

//   &::after {
//     top: ${({ isOpen }) => (isOpen ? "0" : "10px")};
//     transform: ${({ isOpen }) =>
//       isOpen ? "rotate(45deg) translate(-5px, -5px)" : "none"};
//   }

//   div {
//     top: 50%;
//     transform: translateY(-50%);
//     opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
//   }

//   @media (min-width: 992px) {
//     display: none;
//   }
// `;

import React from "react";

const Nav = () => {
  return <div>Nav</div>;
};

export default Nav;
