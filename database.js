const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

async function setup() {
  try {
    const db = await open({
      filename: './mydb.sqlite',
      driver: sqlite3.Database,
    });
    await db.migrate({ force: true, migrationsPath: './migrations' });

    const cake = await db.all(
      'SELECT * FROM Cake_name WHERE Cake_name.quantidade > 0'
    );
    // console.log('all cakes', JSON.stringify(cake, null, 2));
    console.log('all cakes', cake);
  } catch (error) {
    console.log('error', error);
  }
}

setup();
