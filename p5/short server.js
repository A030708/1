const { Client } = require('pg');
const readline = require('readline');

// DB Connection
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'student',
  password: 'root',
  port: 5432,
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.log("Connection Error:", err.message));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main Menu
function menu() {
  console.log(`
1. Insert
2. Update
3. Delete
4. View
5. Exit
`);
  rl.question("Choose option: ", async (choice) => {

    // INSERT
    if (choice == 1) {
      rl.question("Name: ", (name) => {
        rl.question("Age: ", async (age) => {
          await client.query(
            "INSERT INTO student(name, age) VALUES($1,$2)",
            [name, age]
          );
          console.log("Inserted Successfully");
          menu();
        });
      });
    }

    // UPDATE
    else if (choice == 2) {
      rl.question("ID: ", (id) => {
        rl.question("New Age: ", async (age) => {
          await client.query(
            "UPDATE student SET age=$1 WHERE id=$2",
            [age, id]
          );
          console.log("Updated Successfully");
          menu();
        });
      });
    }

    // DELETE
    else if (choice == 3) {
      rl.question("ID: ", async (id) => {
        await client.query(
          "DELETE FROM student WHERE id=$1",
          [id]
        );
        console.log("Deleted Successfully");
        menu();
      });
    }

    // VIEW
    else if (choice == 4) {
      const result = await client.query("SELECT * FROM student ORDER BY id");
      console.table(result.rows);
      menu();
    }

    // EXIT
    else if (choice == 5) {
      await client.end();
      rl.close();
      console.log("Program Closed");
    }

    else {
      console.log("Invalid Option");
      menu();
    }
  });
}

menu();

