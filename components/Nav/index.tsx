import React from 'react';
import Link from 'next/link';

import { useState } from 'react';
import { GiChocolateBar, GiCupcake, GiStairsCake } from 'react-icons/gi';

import {
  NavbarContainer,
  NavList,
  NavListItem,
  NavListItemTitle,
  StyledMenu,
  StyledLogo,
  StyledMenuIcon,
  Title,
  StyledLink,
  StyledIcon,
} from './style';

export function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const links = [
    { id: 1, header: 'Bolos', link: '/', icon: <GiStairsCake /> },
    { id: 2, header: 'Criar bolo', link: '/create-cake', icon: <GiCupcake /> },
    {
      id: 3,
      header: 'Criar Ingrediente',
      link: '/create-ingredient',
      icon: <GiChocolateBar />,
    },
  ];

  return (
    <NavbarContainer open={openNav}>
      <StyledLogo>
        <StyledMenuIcon open={openNav} />
        <Title open={openNav}>And I bake</Title>
        <StyledMenu open={openNav} onClick={() => setOpenNav(c => !c)} />
      </StyledLogo>
      <NavList>
        {links.map(l => (
          <Link key={`${l.id}`} href={`${l.link}`} passHref>
            <NavListItem onClick={() => setOpenNav(false)}>
              <StyledIcon>{l.icon}</StyledIcon>
              <NavListItemTitle open={openNav}>{l.header}</NavListItemTitle>
            </NavListItem>
          </Link>
        ))}
      </NavList>
    </NavbarContainer>
  );
}
