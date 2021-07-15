import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { trigger } from 'swr';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';

import {
  StyledButton,
  StyledDeleteButton,
  StyledFilterLabel,
  StyledIngredientsContainer,
  StyledIngredientTitle,
  StyledInput,
  StyledInputsContainer,
  StyledLabel,
  StyledSelect,
  StyledTable,
  StyledThBody,
  StyledThTitle,
  StyledTr,
  StyledTrTitle,
} from '../styles/style';

type DataProps = {
  id: number;
  nome_ingrediente: string;
  unidade: string;
};

export default function CreateIngredient() {
  const [ingredient, setIngredient] = useState('');
  const [uni, setUni] = useState('g');
  const [filter, setFilter] = useState('');

  const { data, error } = useFetch('/api/ingredients');

  const handleClick = async (e: any) => {
    if (!ingredient) {
      return;
    }
    const { data } = await axios.post('/api/new-ingredient', {
      ingredient,
      uni,
    });

    if (data === 'OK') {
      trigger('/api/ingredients');
      setIngredient('');
      setUni('g');
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

  if (!data) {
    return '...loading';
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
      {/* {data?.map((i: DataProps) => {
        return (
          <div key={i.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h3>{i.nome_ingrediente}</h3>
              <p style={{ marginLeft: 5 }}>{i.unidade}</p>
              <button
                onClick={() => deleteIngredient(i.id)}
                style={{ marginLeft: 5, color: 'red' }}
              >
                delete
              </button>
            </div>
          </div>
        );
      })} */}
    </StyledIngredientsContainer>
  );
}
