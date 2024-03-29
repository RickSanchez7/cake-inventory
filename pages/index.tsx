import Head from 'next/head';
import { useFetch } from '../hooks/useFetch';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { trigger } from 'swr';
import Loader from 'react-loader-spinner';
import {
  StyledAddButton,
  StyledIndexContainer,
  StyledIngredientTitle,
  StyledRemoveButton,
  StyledTable,
  StyledTablesContainer,
  StyledThBody,
  StyledThTitle,
  StyledTr,
  StyledTrTitle,
} from '../styles/style';
import { MdAdd, MdRemove } from 'react-icons/md';

type CakeProp = {
  nome_bolo: string;
  id: number;
  nome_ingrediente: string;
  quantidade: number;
  unidadade: string;
};

type CakesProp = {
  nome_bolo: string;
  id: number;
  quantidade: number;
};

type IngredientProp = {
  nome_ingrediente?: string;
  quantidade?: number;
  unidade?: string;
};

export const url =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://and-i-bake.herokuapp.com'
    : ' http://localhost:5000';

export default function Home() {
  const { data: ingredientsList, error: errorList } = useFetch<
    IngredientProp[]
  >(`${url}/api/ingredients-count`);
  const { data: getCake, error: err2 } = useFetch(`${url}/api/cakes-count`);
  const [cakeQuant, setCakeQuant] = useState<CakesProp[]>([]);

  const [list, setList] = useState<IngredientProp[]>([]);

  const increaseQuant = async (id: number) => {
    setCakeQuant(
      cakeQuant.map(c =>
        c.id === id ? { ...c, quantidade: c.quantidade + 1 } : c
      )
    );

    const quantity = cakeQuant.filter(x => x.id === id)[0].quantidade;

    const { data } = await axios.post(`${url}/api/update-quantity`, {
      id,
      quantity: quantity + 1,
    });

    if (data === 'OK') {
      trigger(`${url}/api/ingredients-count`);
    }
  };
  const decreaseQuant = async (id: number) => {
    setCakeQuant(
      cakeQuant.map(c =>
        c.id === id
          ? { ...c, quantidade: c.quantidade === 0 ? 0 : c.quantidade - 1 }
          : c
      )
    );

    const quantity = cakeQuant.filter(x => x.id === id)[0].quantidade;

    const { data } = await axios.post(`${url}/api/update-quantity`, {
      id,
      quantity: quantity - 1,
    });

    if (data === 'OK') {
      trigger(`${url}/api/ingredients-count`);
    }
  };

  useEffect(() => {
    setCakeQuant(getCake);
  }, [getCake]);

  useEffect(() => {
    if (ingredientsList) {
      setList(ingredientsList);
    }
  }, [ingredientsList]);

  return (
    <StyledIndexContainer>
      <Head>
        <title>Bolos</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledIngredientTitle>Inventário</StyledIngredientTitle>
      <StyledTablesContainer>
        <StyledTable>
          <thead>
            <StyledTrTitle>
              <StyledThTitle>Ingredientes</StyledThTitle>
              <StyledThTitle>Quantidade</StyledThTitle>
              <StyledThTitle>Acções</StyledThTitle>
            </StyledTrTitle>
          </thead>
          <tbody>
            {cakeQuant?.map(i => {
              return (
                <StyledTr key={uuidv4()}>
                  <StyledThBody>{i.nome_bolo}</StyledThBody>
                  <StyledThBody>{i.quantidade}</StyledThBody>
                  <StyledThBody>
                    <div style={{ display: 'flex' }}>
                      <StyledRemoveButton onClick={() => decreaseQuant(i.id)}>
                        <MdRemove />
                      </StyledRemoveButton>
                      <StyledAddButton onClick={() => increaseQuant(i.id)}>
                        <MdAdd />
                      </StyledAddButton>
                    </div>
                  </StyledThBody>
                </StyledTr>
              );
            })}
          </tbody>
        </StyledTable>
        <StyledTable>
          <thead>
            <StyledTrTitle>
              <StyledThTitle>Ingredientes</StyledThTitle>
              <StyledThTitle>Quantidade</StyledThTitle>
              <StyledThTitle>Unidade de Medida</StyledThTitle>
            </StyledTrTitle>
          </thead>
          <tbody>
            {list?.map(i => {
              return (
                <StyledTr key={uuidv4()}>
                  <StyledThBody>{i.nome_ingrediente}</StyledThBody>
                  <StyledThBody>{i.quantidade}</StyledThBody>
                  <StyledThBody>
                    {i.unidade === 'uni' ? 'unidade(s)' : i.unidade}
                  </StyledThBody>
                </StyledTr>
              );
            })}
          </tbody>
        </StyledTable>
      </StyledTablesContainer>
    </StyledIndexContainer>
  );
}
