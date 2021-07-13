import styled from 'styled-components';
import { CgMenuCake } from 'react-icons/cg';
import { RiCake3Line } from 'react-icons/ri';
import Link from 'next/link';

export const StyledLink = styled(Link)`
  margin-right: 10px;
`;

type NavbarContainerProps = {
  open: boolean;
};

export const NavbarContainer = styled.div<NavbarContainerProps>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ open }) => (open ? '220px' : '60px')};
  background: #11101d;
  padding: 5px 14px;
  z-index: 99;
  transition: all 0.5s ease;
  ${({ open }) => open && 'text-align: left;'}
`;

export const StyledLogo = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  /* justify-content: center; */
`;

type StyledMenuIconProps = {
  open: boolean;
};

export const StyledMenuIcon = styled(RiCake3Line)<StyledMenuIconProps>`
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: all 0.5s ease;
  color: #fff;
  margin-right: 10px;
  font-size: 25px;
`;

type StyledMenu = {
  open: boolean;
};

export const StyledMenu = styled(CgMenuCake)<StyledMenu>`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  margin-right: ${({ open }) => (open ? '0' : '5px')};
  cursor: pointer;
  transition: all 0.5s ease;
  color: #fff;
`;

type TitleProps = {
  open: boolean;
};

export const Title = styled.div<TitleProps>`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: all 0.5s ease;
  white-space: nowrap;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0;
  height: 100%;
  width: 100%;
  text-decoration: none;
  list-style: none;
`;

export const NavListItem = styled.li`
  position: relative;
  margin: 10px 0;
  list-style: none;
  text-decoration: none;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #000;
    background-color: #fff;
  }
`;

export const StyledIcon = styled.div`
  font-size: 20px;
  transition: all 0.4s ease;
`;

type NavListItemTitleProps = {
  open: boolean;
};

export const NavListItemTitle = styled.span<NavListItemTitleProps>`
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
  margin-left: 5px;

  ${({ open }) => open && 'opacity: 1; pointer-events: auto;'};
`;
