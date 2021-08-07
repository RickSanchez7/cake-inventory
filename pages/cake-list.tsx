import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useFetch } from '../hooks/useFetch';

import {
  StyledIngredientsContainer,
  StyledIngredientTitle,
  StyledLoaderContainer,
  StyledResponsiveTable,
} from '../styles/style';
import Loader from 'react-loader-spinner';
import { url } from '.';
import { CustomTable } from '../components/CustomTable';

type DataProps = {
  id: number;
  nome_bolo: string;
  ingredientes: string[];
  unidade: string[];
  quantidade: number[];
};

type Props = {
  cakes: DataProps;
};

export default function CakeList(props: Props) {
  const {
    data: cakes,
    error,
    isLoading,
  } = useFetch(`${url}/api/cakes`, props.cakes);

  if (isLoading) {
    return (
      <StyledLoaderContainer>
        <Loader type='Puff' color='#00BFFF' height={80} width={80} />
      </StyledLoaderContainer>
    );
  }

  return (
    <StyledIngredientsContainer>
      <StyledIngredientTitle>Lista de Bolos</StyledIngredientTitle>
      <StyledResponsiveTable>
        {cakes.map((cake: DataProps) => (
          <CustomTable key={uuidv4()} cake={cake} />
        ))}
      </StyledResponsiveTable>
    </StyledIngredientsContainer>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${url}/api/cakes`);
  const cakes = await res.json();

  return {
    props: { cakes },
  };
}
