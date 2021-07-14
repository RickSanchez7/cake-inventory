import React from 'react';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

type DataProps = {
  id: number;
  nome_ingrediente: string;
  unidade: string;
};

export default function CreateCake() {
  const [cake, setCake] = useState('');
  const [cakeName, setCakeName] = useState('');
  const [fullCake, setFullCake] = useState([]);
  const [ingrediente, setIngrediente] = useState({});

  const [quantidade, setQuantidade] = useState(0);
  const { data: ingredients, error } = useFetch('/api/ingredients');

  console.log('fullCake', fullCake.length);

  const handleCake = () => {};

  const handlePost = () => {
    console.log('post handled');
  };

  const handleIngredient = () => {
    setFullCake(c => [
      ...c,
      {
        cake: cakeName,
        ingrediente: ingrediente.ingr,
        quantidade: Number(quantidade),
      },
    ]);
    setIngrediente({});
    setQuantidade(0);
  };

  return (
    <>
      <div>Create Cake</div>
      <label style={{ marginLeft: 10 }}>
        <input
          value={cake}
          onChange={e => setCake(e.target.value)}
          type='text'
          placeholder='Bolo'
        />
      </label>
      <button
        onClick={() => {
          setCakeName(cake);
          setCake('');
        }}
        type='button'
      >
        Criar Nome
      </button>
      {fullCake.map(i => (
        <div style={{ display: 'flex' }}>
          <p>{i.ingrediente}</p>
          <p>{i.quantidade}</p>
        </div>
      ))}

      {cakeName ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2>{cakeName}</h2>
            <button
              style={{ marginLeft: 5, color: 'red', height: 20 }}
              onClick={() => setCakeName('')}
            >
              Apagar Bolo
            </button>
          </div>
          <button onClick={handlePost}>Criar Bolo</button>
          <div>
            <input
              type='text'
              value={quantidade}
              placeholder='Quantidade'
              onChange={e => setQuantidade(e.target.value)}
            />
            <button onClick={handleIngredient}>Criar Ingrediente</button>
            {ingrediente.ingr && <p>{ingrediente.ingr}</p>}
          </div>
        </>
      ) : null}
      <div style={{ marginTop: 10 }}>
        {ingredients?.map((i: DataProps) => {
          return (
            <div
              key={i.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 40,
              }}
            >
              <h3>{i.nome_ingrediente}</h3>
              <p style={{ marginLeft: 5 }}>{i.unidade}</p>
              <button
                onClick={() =>
                  setIngrediente({ ingr: i.nome_ingrediente, id: i.id })
                }
              >
                Adicionar
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
