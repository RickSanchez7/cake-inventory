import React, { useState } from 'react';
import axios from 'axios';
import { useFetch } from '../hooks/useFetch';
import { trigger } from 'swr';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import {
  StyledButton,
  StyledDeleteButton,
  StyledFilterLabel,
  StyledIngredientsContainer,
  StyledIngredientTitle,
  StyledInput,
  StyledInputsContainer,
  StyledLabel,
  StyledLoaderContainer,
  StyledSelect,
  StyledTable,
  StyledThBody,
  StyledThTitle,
  StyledTr,
  StyledTrTitle,
} from '../styles/style';
import Loader from 'react-loader-spinner';
import { openDB } from '../src/openDB';
import { newIngredient } from '../utils/constantes';

type DataProps = {
  id: number;
  nome_ingrediente: string;
  unidade: string;
};

type Props = {
  ingredients: DataProps;
};

export default function CreateIngredient(props: Props) {
  const [ingredient, setIngredient] = useState('');
  const [uni, setUni] = useState('g');
  const [filter, setFilter] = useState('');

  const { data, error, isLoading } = useFetch(
    '/api/ingredients',
    props.ingredients
  );

  const handleClick = async () => {
    if (!ingredient) {
      return;
    }
    const { data } = await axios.post('/api/new-ingredient', {
      ingredient,
      uni,
    });

    // const db = await openDB();

    // const data = await db.all(
    //   `INSERT INTO Ingredientes (nome_ingrediente, unidade) VALUES (?, ?)`,
    //   [ingredient, uni]
    // );

    if (data === 'OK') {
      trigger('/api/ingredients');
      setIngredient('');
      setUni('g');
      toast.success('🚀 Ingrediente criado com Sucesso!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('🧨 Ocorreu um erro!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deleteIngredient = async (id: number) => {
    console.log(id);
    const { data: dataResponse } = await axios.post('/api/delete-ingredient', {
      id,
    });

    if (dataResponse === 'OK') {
      trigger('/api/ingredients');
    }
  };

  if (isLoading) {
    return (
      <StyledLoaderContainer>
        <Loader type='Puff' color='#00BFFF' height={80} width={80} />
      </StyledLoaderContainer>
    );
  }

  return (
    <StyledIngredientsContainer>
      <StyledIngredientTitle>Criar Ingrediente</StyledIngredientTitle>
      <StyledInputsContainer>
        <StyledLabel>
          <BiSearchAlt2 />
          <StyledInput
            value={ingredient}
            onChange={e => setIngredient(e.target.value)}
            type='text'
            placeholder='Ingrediente'
          />
        </StyledLabel>
        <StyledSelect
          value={uni}
          onChange={e => setUni(e.target.value)}
          name='uni'
          id='uni'
        >
          <option value='g'>g</option>
          <option value='uni'>unidade</option>
        </StyledSelect>
        <StyledButton onClick={handleClick} type='button'>
          Criar
        </StyledButton>
        <StyledFilterLabel>
          <BiSearchAlt2 />
          <StyledInput
            value={filter}
            onChange={e => setFilter(e.target.value)}
            type='text'
            placeholder='Filtrar'
          />
        </StyledFilterLabel>
      </StyledInputsContainer>
      <StyledTable>
        <thead>
          <StyledTrTitle>
            <StyledThTitle>Ingredientes</StyledThTitle>
            <StyledThTitle>Unidade de Medida</StyledThTitle>
            <StyledThTitle>Acções</StyledThTitle>
          </StyledTrTitle>
        </thead>
        <tbody>
          {data
            ?.filter((d: DataProps) => d.nome_ingrediente.includes(filter))
            .map((i: DataProps) => (
              <StyledTr key={i.id}>
                <StyledThBody>{i.nome_ingrediente}</StyledThBody>
                <StyledThBody>{i.unidade}</StyledThBody>
                <StyledThBody>
                  <StyledDeleteButton onClick={() => deleteIngredient(i.id)}>
                    <FaTrashAlt />
                  </StyledDeleteButton>
                </StyledThBody>
              </StyledTr>
            ))}
        </tbody>
      </StyledTable>
    </StyledIngredientsContainer>
  );
}

export async function getStaticProps() {
  // const res = await fetch(
  //   `${
  //     process.env.VERCEL_URL
  //       ? 'https://' + process.env.VERCEL_URL
  //       : 'http://localhost:3000'
  //   }/api/ingredients`
  // );
  // const ingredients = await res.json();

  const db = await openDB();

  const ingredients = await db.all('SELECT * FROM Ingredientes');

  console.log(ingredients);

  return {
    props: { ingredients },
  };
}
