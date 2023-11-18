import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import { getCurrentMonth, filterListByMonth } from "../../helpers/dateFilter";
import { TableArea } from "../../components/TableArea";
import { InfoArea } from "../../components/InfoArea";
import { InputArea } from "../../components/InputArea";
import "./index.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const authenticated = JSON.parse(localStorage.getItem("authenticated"));

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth, setFilteredList]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
    localStorage.setItem("finances", JSON.stringify(newList));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("authenticated", "false");
    navigate("/login");
  };

  if (!authenticated) {
    navigate("/login");
  }

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("finances"));
    if (savedList) {
      setList(savedList);
    }
  }, []);

  return (
    <div>
      <div className="header">
        <h1 className="headerText">Sistema Financeiro </h1>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="body">
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        <InputArea onAdd={handleAddItem} />

        <TableArea list={filteredList} />
      </div>
    </div>
  );
};

export default Dashboard;
