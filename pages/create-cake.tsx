import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCreate } from 'react-icons/io';
import { FaTrashAlt } from 'react-icons/fa';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { RiHandCoinFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { useFetch } from '../hooks/useFetch';

import {
  StyledAddButton,
  StyledButton,
  StyledDeleteButton,
  StyledIngredientTitle,
  StyledInput,
  StyledInputsContainer,
  StyledLabel,
  StyledLoaderContainer,
  StyledTableCake,
  StyledTablesContainer,
  StyledTBody,
  StyledThBody,
  StyledThTitle,
  StyledTr,
  StyledTrTitleCake,
} from '../styles/style';
import Loader from 'react-loader-spinner';
import { url } from '.';

type DataProps = {
  id: number;
  nome_ingrediente: string;
  unidade: string;
};

type Props = {
  ingredients: DataProps;
};

type FullCakeProps = {
  cake?: string;
  ingredient?: string;
  quantity?: number;
  ingredientId: number;
};

type IngredienteProp = {
  id?: number;
  ingr?: string;
};

export default function CreateCake(props: Props) {
  const [cakeName, setCakeName] = useState('');
  const [fullCake, setFullCake] = useState<FullCakeProps[]>([]);
  const [quantidade, setQuantidade] = useState('');
  const [filter, setFilter] = useState('');

  const {
    data: ingredients,
    error,
    isLoading,
  } = useFetch(`${url}/api/ingredients`);

  const handleCake = async () => {
    if (!cakeName) return;
    if (fullCake.length === 0) return;

    try {
      const { data } = await axios.post(`${url}/api/new-cake`, {
        data: { cake_name: cakeName, ingredients: fullCake },
      });
      if (data === 'OK') {
        setFullCake([]);
        setCakeName('');
        toast.success('🚀 Bolo criado com Sucesso!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
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

  const handleIngredient = (id: number, ingr: string) => {
    if (typeof Number(quantidade) !== 'number' || Number(quantidade) < 1)
      return;

    // Checks if ingredient is already there
    const checkIngredient = fullCake.find(x => x.ingredient === ingr);
    if (checkIngredient) return;

    setFullCake(c => [
      ...c,
      {
        ingredientId: id,
        ingredient: ingr,
        quantity: Number(quantidade),
      },
    ]);
    setQuantidade('');
  };

  const deleteIngredient = (ing: string | undefined) => {
    if (!ing) return;
    setFullCake(ingr => ingr.filter(x => x.ingredient !== ing));
  };

  console.log('filter', filter);

  if (isLoading) {
    return (
      <StyledLoaderContainer>
        <Loader type='Puff' color='#00BFFF' height={80} width={80} />
      </StyledLoaderContainer>
    );
  }

  return (
    <>
      <StyledIngredientTitle>Criar Bolo</StyledIngredientTitle>
      <StyledInputsContainer>
        <StyledLabel>
          <IoMdCreate />
          <StyledInput
            value={cakeName}
            onChange={e => setCakeName(e.target.value)}
            type='text'
            placeholder='Nome do Bolo'
          />
        </StyledLabel>
        <StyledButton onClick={handleCake} type='button'>
          Criar Bolo
        </StyledButton>
      </StyledInputsContainer>

      <StyledInputsContainer>
        <StyledLabel>
          <RiHandCoinFill />
          <StyledInput
            type='text'
            value={quantidade}
            placeholder='Quantidade'
            onChange={e => setQuantidade(e.target.value)}
          />
          {/* {ingrediente.ingr && <p>{ingrediente.ingr}</p>} */}
        </StyledLabel>
        <StyledLabel>
          <BiSearchAlt2 />
          <StyledInput
            type='text'
            value={filter}
            placeholder='Filtro'
            onChange={e => setFilter(e.target.value)}
          />
        </StyledLabel>
      </StyledInputsContainer>
      <StyledTablesContainer>
        <StyledTableCake>
          <thead>
            <StyledTrTitleCake>
              <StyledThTitle>Ingredientes</StyledThTitle>
              <StyledThTitle>Unidade de Medida</StyledThTitle>
              <StyledThTitle>Acções</StyledThTitle>
            </StyledTrTitleCake>
          </thead>
          <StyledTBody>
            {ingredients
              ?.filter((d: DataProps) =>
                d.nome_ingrediente.toLowerCase().includes(filter.toLowerCase())
              )
              .map((i: DataProps) => {
                return (
                  <StyledTr key={i.id}>
                    <StyledThBody>{i.nome_ingrediente}</StyledThBody>
                    <StyledThBody>
                      {i.unidade === 'uni' ? 'unidade' : i.unidade}
                    </StyledThBody>
                    <StyledThBody>
                      <StyledAddButton
                        onClick={() =>
                          handleIngredient(i.id, i.nome_ingrediente)
                        }
                      >
                        <MdAdd />
                      </StyledAddButton>
                    </StyledThBody>
                  </StyledTr>
                );
              })}
          </StyledTBody>
        </StyledTableCake>

        <StyledTableCake>
          <thead>
            <StyledTrTitleCake>
              <StyledThTitle>Ingredientes</StyledThTitle>
              <StyledThTitle>Quantidade</StyledThTitle>
              <StyledThTitle>Acções</StyledThTitle>
            </StyledTrTitleCake>
          </thead>
          <StyledTBody>
            {fullCake.map((i: FullCakeProps) => {
              return (
                <StyledTr key={i.ingredientId}>
                  <StyledThBody>{i.ingredient}</StyledThBody>
                  <StyledThBody>{i.quantity}</StyledThBody>
                  <StyledThBody>
                    <StyledDeleteButton
                      onClick={() => deleteIngredient(i.ingredient)}
                    >
                      <FaTrashAlt />
                    </StyledDeleteButton>
                  </StyledThBody>
                </StyledTr>
              );
            })}
          </StyledTBody>
        </StyledTableCake>
      </StyledTablesContainer>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${url}/api/ingredients`);
  const ingredients = await res.json();

  return {
    props: { ingredients },
  };
}
