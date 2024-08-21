import React from 'react';
import TransactionMenu from './TransactionMenu';

const Balance = () => {


  /* These are Update States
  To update our state, we use our state updater function.
 */

  const [balance, setBalance] = React.useState(0); // Represents the total balance
  const [income, setIncome] = React.useState(0); // Represents the total income
  const [expense, setExpense] = React.useState(0); // Represents the total expense


  /* These are Event Handlers/
Two functions, onIncome and onExpense, are defined to update the state when a transaction is made:
1. onIncome: Increases the income and balance by the specified amount.
2. onExpense: Increases the expense and decreases the balance by the specified amount.
  */

  const onIncome = (amount) => {
    setIncome(income + amount);
    setBalance(balance + amount);
  }

  const onExpense = (amount) => {
    setExpense(expense + amount);
    setBalance(balance - amount);
  }


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 text-gray-800">

      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Expense Tracker</h1>
      </header>


      <main className="flex-grow flex flex-col items-center justify-center gap-6 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <p className="text-3xl font-bold text-gray-800 text-center mb-4">
            Balance: 
            <span className="text-blue-600 ml-2">
              ${balance}
            </span>
          </p>

          <div className="flex justify-between mt-5">
            <div className="bg-green-500 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-1/2 mr-2">
              <p className="text-xl font-semibold text-center">
                Income
              </p>
              <p className="text-2xl font-bold text-center mt-2">
                ${income}
              </p>
            </div>

            <div className="bg-red-500 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-1/2 ml-2">
              <p className="text-xl font-semibold text-center">
                Expense
              </p>
              <p className="text-2xl font-bold text-center mt-2">
                ${expense}
              </p>
            </div>
          </div>

          {/* 
          A TransactionMenu component that handles adding transaction.
          The TransactionMenu component is passed the onIncome and onExpense handlers as props.
          Props are arguments passed into React components.
          Props are passed to components via HTML attributes. */}
          
          <div className="mt-8">
            <TransactionMenu onIncome = {onIncome} onExpense = {onExpense} />
          </div>
        </div>
      </main>


      <footer className="bg-blue-600 text-white py-4 text-center shadow-md">
        <p>&copy; 2024 Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Balance;