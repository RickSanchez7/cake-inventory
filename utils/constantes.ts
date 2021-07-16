import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const getData = async (tableName: string) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  return await db.all(`SELECT * FROM ${tableName}`);
};

export const newCakeName = async (cakeName: string, n: number = 0) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  try {
    await db.all(
      `INSERT INTO Cake_name (nome_bolo, quantidade) VALUES (?, ?)`,
      [cakeName, n]
    );
    return 'OK';
  } catch (error) {
    return 'NotOK';
  }
};

export const newCake = async (
  cakeId: number,
  ingrId: number,
  quant: number
) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  await db.all(
    `INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES (?, ?, ?)`,
    [cakeId, ingrId, quant]
  );
};

export const getCakeByName = async (name: string) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  let id = await db.all(
    `SELECT Cake_name.id FROM Cake_name WHERE Cake_name.nome_bolo = ?`,
    [name]
  );

  return id[0].id;
};

export const getCake = async (id: number) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  // return await db.all(
  //   `SELECT Cake.id, Cake_name.nome_bolo, Ingredientes.nome_ingrediente, Ingredientes.unidade, Cake.quantidade FROM ((Cake INNER JOIN Ingredientes ON Cake.ingredientes_id = Ingredientes.id) INNER JOIN Cake_name ON Cake.nome_id = Cake_name.id) WHERE Cake_name.nome_bolo = ?`,
  //   [id]
  // );
  return await db.all(
    `SELECT Cake_name.id, Cake_name.nome_bolo, Cake_name.quantidade FROM Cake_name WHERE Cake_name.nome_bolo = ?`,
    [id]
  );
};

export const getSavedCakes = async () => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  // return await db.all(
  //   'SELECT * FROM ((Cake INNER JOIN Ingredientes ON Cake.ingredientes_id = Ingredientes.id) INNER JOIN Cake_name ON Cake.nome_id = Cake_name.id)'
  // );
  // return await db.all(
  //   `SELECT Cake.id, Cake_name.nome_bolo, Ingredientes.nome_ingrediente, Ingredientes.unidade, Cake.quantidade FROM ((Cake INNER JOIN Ingredientes ON Cake.ingredientes_id = Ingredientes.id) INNER JOIN Cake_name ON Cake.nome_id = Cake_name.id) WHERE Cake_name.nome_bolo = ?`,
  //   [id]
  // );
  return await db.all(
    'SELECT * FROM Cake_name WHERE Cake_name.quantidade >= 0'
  );
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
    'SELECT Ingredientes.nome_ingrediente, Ingredientes.unidade, SUM(Cake.quantidade * Cake_name.quantidade) as quantidade FROM ((Cake INNER JOIN Ingredientes ON Cake.ingredientes_id = Ingredientes.id) INNER JOIN Cake_name ON Cake.nome_id = Cake_name.id) WHERE Cake_name.quantidade > 0 GROUP BY Ingredientes.nome_ingrediente'
  );
};

export const newIngredient = async (name: string, uni: string) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  try {
    await db.all(
      `INSERT INTO Ingredientes (nome_ingrediente, unidade) VALUES (?, ?)`,
      [name, uni]
    );
    return 'OK';
  } catch (error) {
    return 'NotOK';
  }
};

export const deleteIngredient = async (id: number) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  try {
    await db.all('DELETE FROM Ingredientes WHERE id = ?', [id]);
    return 'OK';
  } catch (error) {
    return 'NotOK';
  }
};

export const updateQuantity = async (id: number, count: number) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  try {
    await db.all('UPDATE Cake_name SET quantidade = ? WHERE id = ?', [
      count,
      id,
    ]);
    return 'OK';
  } catch (error) {
    return 'NotOK';
  }
};

export const deleteCake = async (cakeName: string) => {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  try {
    await db.all('DELETE FROM Cake_name WHERE nome_bolo = ?', [cakeName]);
    return 'OK';
  } catch (error) {
    return 'NotOK';
  }
};
