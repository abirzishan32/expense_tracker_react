import React from 'react';

const TransactionMenu = ({ onIncome, onExpense }) => {
  const [menu, setMenu] = React.useState(false); //A boolean that tracks whether the transaction menu is open or closed.
  const [data, setData] = React.useState([]); //An array that stores all the transactions made by the user.
  const [amount, setAmount] = React.useState(""); //A string representing the amount input field.
  const [title, setTitle] = React.useState("");  //A string representing the title input field.
  const [transactionType, setTransactionType] = React.useState("expense"); //A string representing the transaction type (income or expense).
  const [searchQuery, setSearchQuery] = React.useState(""); //A string representing the search query for filtering transactions.


  /*
  The toggleButton function toggles the value of menu, which controls whether
  the transaction form is visible. When the user clicks the "Add Transaction" button, 
  it either shows or hides the transaction form depending on the current state of menu.
  */
  const toggleButton = () => {
    setMenu(!menu);
  };


  /************************************************************************
  When the user submits the form (clicks the "Add Transaction" button within the form),
  the handleSubmit function is triggered.
  *************************************************************************/
  const handleSubmit = (e) => {
    e.preventDefault();
    

    //Creating a transaction object (info) with the id, amount, title, and transactionType.
    const info = {
      id: data.length + 1, //The id is set to the length of the data array plus 1.
      amount: Number(amount), //The amount is converted to a number.
      title: title, //The title is set to the value of the title state.
      transactionType: transactionType, //The transactionType is set to the value of the transactionType state.
    };


    //If the amount or title is empty, an alert is shown to the user to fill in all fields.
    if (!amount || !title) {
      alert("Please fill in all fields");
      return;
    }

    /*If the transactionType is "income",
    the onIncome function is called with the amount as a parameter.
    The function was declared in Balance.js component */
    if (transactionType === "income") {
      onIncome(Number(amount));
    }


    /*If the transactionType is "expense",
    the onExpense function is called with the amount as a parameter.
    The function was declared in Balance.js component */
    
    if (transactionType === "expense") {
      onExpense(Number(amount));
    }

    //The transaction object (info) is added to the data array using the setData function.
    setData((prevData) => [...prevData, info]); /*Updates the data state, which stores the list of all transactions.
                                                  The new array is then assigned to data, effectively adding the new transaction
                                                to the end of the list.         
                                                */
    setAmount(""); //Resets the amount input field to an empty string after the form is submitted.
    setTitle(""); //Resets the title input field to an empty string after the form is submitted.
    setTransactionType("expense"); //Resets the transactionType to "expense" after the form is submitted.
    setMenu(false); //Closes the transaction form after the form is submitted.
  };




/*******************************
 * Undoing Last Transaction
********************************/
  const handleUndo = () => {
    if (data.length === 0) return; //If there are no transactions, the function returns early.

    const lastTransaction = data[data.length - 1]; //Retrieves the last transaction from the data array.


    if (lastTransaction.transactionType === "income") {
      onIncome(-lastTransaction.amount);
    } else if (lastTransaction.transactionType === "expense") {
      onExpense(-lastTransaction.amount);
    }

    setData((prevData) => prevData.slice(0, -1)); //Removes the last transaction from the data array.
  };



  /*******************************
 * Searching A Particular Transaction
********************************/ 
  const filteredData = data.filter(transaction =>  /*This line filters the data array to include only the
                                                    transactions that match a certain condition. 'transaction' is a parameter of the
                                                    arrow function passed to the .filter() method.
                                                    The parameter 'transaction' will hold each individual element (object) of the
                                                    data array as the .filter() method iterates over it.
                                                    */

    transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-6">
      <div className="flex justify-center">
        <button
          onClick={toggleButton}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          {menu ? 'Close Transaction Menu' : 'Add Transaction'} 
        </button>
      </div>

      {menu && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Enter Amount"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={amount}  //Binds the value of the input field to the 'amount' state variable
              onChange={(e) => setAmount(e.target.value)} /* Sets up an event handler for when the user types
                                                          something into the input field. 'e.target.value' represents the current value of the input field (i.e., what the user has typed).
                                                          The value of the input field is then set to the 'amount' state variable using the 'setAmount' function.
                                                          As a result, every time the user types in the input field, the amount state is updated to reflect the current value of the input.
                                                          */
            />

            <input
              type="text"
              placeholder="Enter Title"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleSubmit}
            >
              Add Transaction
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Past Transactions</h2>
        <input
          type="text"
          placeholder="Search Transactions"
          className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery} //Binds the value of the input field to the 'searchQuery' state variable
          onChange={(e) => setSearchQuery(e.target.value)} //Sets up an event handler for when the user types something into the input field.
        />
        {filteredData.length > 0 ? //Checks if there are transactions to display.
        (
          <div className="w-full max-w-md mx-auto">
            <ul className="bg-white p-4 rounded-lg shadow-md">
              {filteredData.map((transaction) => (
                <li key={transaction.id} className="flex justify-between p-2 border-b border-gray-300">
                  <span>{transaction.title}</span>
                  <span className={transaction.transactionType === "income" ? "text-green-500" : "text-red-500"}>
                    {transaction.transactionType === "income" ? "+" : "-"}${transaction.amount}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleUndo}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mx-auto block"
            >
              Undo Last Transaction
            </button>
          </div>
        ) 
        : 
        (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionMenu;
