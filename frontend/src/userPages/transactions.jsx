import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; 

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const jwtToken = Cookies.get("jwtToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/transactions/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (jwtToken) {
      fetchTransactions();
    }
  }, [jwtToken, userId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-white mb-6">Transactions</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul>
          {transactions?.map((transaction) => (
            <li key={transaction?._id} className="border-t border-gray-200">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={transaction?.bookDetails?.image}
                      alt={transaction?.bookDetails?.title}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-lg font-semibold text-gray-900">
                      {transaction?.bookDetails?.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      Author: {transaction?.bookDetails?.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      Due Date:{" "}
                      {new Date(transaction?.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-gray-700">
                  {transaction?.transactionType}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
