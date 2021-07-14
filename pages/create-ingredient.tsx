import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { trigger } from 'swr';

type DataProps = {
  id: number;
  nome_ingrediente: string;
  unidade: string;
};

export default function CreateIngredient() {
  const [ingredient, setIngredient] = useState('');
  const [uni, setUni] = useState('g');

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
    <>
      <div>Create Ingredient</div>
      <label style={{ marginLeft: 10 }}>
        <input
          value={ingredient}
          onChange={e => setIngredient(e.target.value)}
          type='text'
          placeholder='ingrediente'
        />
      </label>
      <select
        value={uni}
        onChange={e => setUni(e.target.value)}
        name='uni'
        id='uni'
      >
        <option value='g'>g</option>
        <option value='uni'>unidade</option>
      </select>
      <button onClick={handleClick} type='button'>
        Criar
      </button>
      {data?.map((i: DataProps) => {
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
      })}
    </>
  );
}
