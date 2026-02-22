const { Client } = require('pg');
const readline = require('readline');
// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'student',         
  password: 'root',
  port: 5432,
});
// Connect to database
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => {
    console.error('Connection error', err.stack);
    process.exit(1);
  });
// Readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Menu function
function menu() {
  console.log(`
Choose an operation:
a) Insert data
b) Update data
c) Delete data
d) View all data
e) Exit
`);
  rl.question('Enter choice: ', handleChoice);
}
// Handle user choice
async function handleChoice(choice) {
  switch (choice.toLowerCase()) {
// INSERT
    case 'a':
      rl.question('Enter name: ', (name) => {
        rl.question('Enter age: ', async (age) => {
          try {
            await client.query(
              'INSERT INTO students(name, age) VALUES($1, $2)',
              [name, age]
            );
            console.log(' Data inserted successfully');
          } catch (err) {
            console.error('Error inserting data:', err.message);
          }
          menu();
        });
      });
      break;
 
    // UPDATE
    case 'b':
      rl.question('Enter ID to update: ', (id) => {
        rl.question('Enter new age: ', async (age) => {
          try {
            await client.query(
              'UPDATE students SET age=$1 WHERE id=$2',
              [age, id] );
            console.log('Data updated successfully');
          } catch (err) {
            console.error('Error updating data:', err.message);
          }
          menu();
        });
      });
      break;
 // DELETE
    case 'c':
      rl.question('Enter ID to delete: ', async (id) => {
        try {
          await client.query(
            'DELETE FROM students WHERE id=$1',
            [id]
          );
          console.log('Data deleted successfully');
        } catch (err) {
          console.error('Error deleting data:', err.message);
        }
        menu();
      });
      break;
 // VIEW
    case 'd':
      try {
        const result = await client.query('SELECT * FROM students ORDER BY id');
        console.table(result.rows);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
      menu();
      break;
 
    // EXIT
    case 'e':
      console.log('Exiting program...');
      await client.end();
      rl.close();
      break;
 // INVALID OPTION
    default:
      console.log('Invalid choice. Try again.');
      menu();
  }}
// Start the program
menu();