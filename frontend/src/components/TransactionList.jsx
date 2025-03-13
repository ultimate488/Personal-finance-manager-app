const TransactionList = ({ transactions }) => {
    return (
      <div>
        <h3>Recent Transactions</h3>
        <ul>
          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            transactions.map((t, index) => (
              <li key={index} style={{ color: t.type === "income" ? "green" : "red" }}>
                {t.description}: ${t.amount.toFixed(2)} ({t.type})
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };
  
  export default TransactionList;
  