import { useState } from "react";

const AddTransaction = ({ addTransaction }) => {
  const [type, setType] = useState("income"); // Default to income
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    addTransaction({ 
      type, 
      amount: parseFloat(amount), 
      description,
      id: Date.now()
    });

    setAmount("");
    setDescription("");
  };

  return (
    <div className="transaction-form">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTransaction;
