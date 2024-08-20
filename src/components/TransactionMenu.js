import React from 'react';

const TransactionMenu = ({ onIncome, onExpense }) => {
  const [menu, setMenu] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [amount, setAmount] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [transactionType, setTransactionType] = React.useState("expense");
  const [searchQuery, setSearchQuery] = React.useState("");

  const toggleButton = () => {
    setMenu(!menu);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const info = {
      id: data.length + 1,
      amount: Number(amount),
      title: title,
      transactionType: transactionType,
    };

    if (!amount || !title) {
      alert("Please fill in all fields");
      return;
    }

    if (transactionType === "income") {
      onIncome(Number(amount));
    }

    if (transactionType === "expense") {
      onExpense(Number(amount));
    }

    setData((prevData) => [...prevData, info]);
    setAmount("");
    setTitle("");
    setTransactionType("expense");
    setMenu(false);
  };

  const handleUndo = () => {
    if (data.length === 0) return;

    const lastTransaction = data[data.length - 1];

    if (lastTransaction.transactionType === "income") {
      onIncome(-lastTransaction.amount);
    } else if (lastTransaction.transactionType === "expense") {
      onExpense(-lastTransaction.amount);
    }

    setData((prevData) => prevData.slice(0, -1));
  };

  const filteredData = data.filter(transaction =>
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredData.length > 0 ? (
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
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionMenu;
