import { getFormattedTime } from "../../utils";

export default function Expense({ expense, setDeleteExpenseId }) {
    return (
        <div className="border-bottom bg-white p-3 d-flex align-items-center">
            <div>
                <h5 className="f-700 mb-1">{expense.title}</h5>
                <small className="f-500 text-secondary me-2"><i style={{color: expense.categoryColorCode}} className="fas fa-circle"></i> {expense.categoryName}</small>
                <span className="badge bg-body-secondary text-dark f-300 me-2">
                    <i className={`fas fa-${expense.isCash ? "money-bill" : "university"}`}></i> {expense.balanceAccountName}
                </span>
                <small className="text-tiny text-secondary">{getFormattedTime(expense.instance)}</small>
            </div>
            <h2 className="ms-auto f-900 mb-0 bg-warning-subtle p-1 rounded">Rs {expense.amount}</h2>
            <div className="dropdown">
                <button className="btn dropdown-toggle pe-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                </button>
                <ul className="dropdown-menu">
                    <li className="cursor-pointer"><span className="dropdown-item">Edit</span></li>
                    <li className="cursor-pointer" onClick={()=>setDeleteExpenseId(expense.id)} data-bs-toggle="modal" data-bs-target="#deleteExpenseModal"><span className="dropdown-item">Delete</span></li>
                </ul>
            </div>
        </div>
    );
}