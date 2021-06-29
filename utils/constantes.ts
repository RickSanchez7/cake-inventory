import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const getData = async (tableName: string) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  return await db.all(`SELECT * FROM ${tableName}`);
};

export const getCakes = async () => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  // return await db.all(
  //   'SELECT * FROM ((Cake INNER JOIN Ingredientes ON Cake.ingredientes_id = Ingredientes.id) INNER JOIN Cake_name ON Cake.nome_id = Cake_name.id)'
  // );
  return await db.all(
    'SELECT Cake.id, Cake_name.nome_bolo, Ingredientes.nome_ingrediente, Ingredientes.unidade, Cake.quantidade FROM ((Cake INNER JOIN Ingredientes ON Cake.ingredientes_id = Ingredientes.id) INNER JOIN Cake_name ON Cake.nome_id = Cake_name.id)'
  );
};

export const getIngredientsCount = async () => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  return await db.all(
    'SELECT Ingredientes.nome_ingrediente, Ingredientes.unidade, SUM(Cake.quantidade) as quantidade FROM ((Cake INNER JOIN Ingredientes ON Cake.ingredientes_id = Ingredientes.id) INNER JOIN Cake_name ON Cake.nome_id = Cake_name.id) GROUP BY Ingredientes.nome_ingrediente'
  );
};
