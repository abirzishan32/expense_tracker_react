import React from 'react';
import TransactionMenu from './TransactionMenu';

const Balance = () => {
  const [balance, setBalance] = React.useState(0);
  const [income, setIncome] = React.useState(0);
  const [expense, setExpense] = React.useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 text-gray-800">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">My Financial Dashboard</h1>
      </header>

      {/* Main Content */}
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

          <div className="mt-8">
            <TransactionMenu />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 text-center shadow-md">
        <p>&copy; 2024 My Financial App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Balance;
