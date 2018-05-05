var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user:"root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(error){
  if (error) throw error;
  inventory();
});

function inventory(){
  connection.quert("SELECT * FROM products", function(error, results){
    if (error) throw error;
    var table = new Table ({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' 
      },
      head:['ID', 'Name', 'Price']
    });

    for (var i = 0;  i < results.length; i++){
      table.push(results[i].item_id, results[i].product_name, "$" + res[i.price]);
    }
    console.log ("Welcome Bamazon!");
    console.log("Please review our invetory of available items and follow the prompts below");
    console.log(table.toString());
    userPrompt()
  });
}

function userPrompt(){
  inquirer.prompt([
    {
      name:"purchase",
      type: "input",
      message: "What is the ID of the item you would like to purchase?"
    },
    {
      name: "quantity",
      type: "input",
      message: "How any would you like to purchase?"
    },
  ])
  .then(function(response){
    connection.query("SELECT * FROM products WHERE ?",
      {
        item_id: response.buy
      }, function(error, results){
        if (error) throw error;
        if(results[0].stock_quantity >= response.quantity){
          console.log("You purchase has been completed!");

            var newQuantity = results[0].stock_quantity - parseInt(response.quantity);
            var total = parseInt (response.quantity) * results[0].price;

            updateSupply(response.buy, newQuantity )
            console.log("Purchase Total: " + total);
            userPrompt();
        } else {
          console.log("The following item is currently out of stock");
          userPrompt();
        }
      });
  });  
}


function updateSupply(purchase, quantity){
  connetion.query("UPDATE products SET ? WHERE ?",
  [
    {
      stock_quantity: quantity
    },
    {
      item_id: buy
    }
  ], function (error, results){

  });
}

