import { getDFormattedDateTime } from "../../utils";

export default function Income({ income, setDeleteIncomeId }) {
    return (
        <div className="border-bottom bg-white p-3 d-flex align-items-center">
            <div>
                <div className="d-flex align-items-center">
                    <h5 className="f-700 mb-0 me-2">{income.title}</h5>
                    <span className="badge bg-success f-300">
                        <i className={`fas fa-${income.isCash ? "money-bill" : "university"}`}></i> {income.balanceAccountName}
                    </span>
                </div>
                <small className="text-tiny text-secondary">{getDFormattedDateTime(income.instance)}</small>
            </div>
            <h2 className="ms-auto f-900 mb-0 bg-success-subtle p-1 rounded">Rs {income.amount}</h2>
            <div className="dropdown">
                <button className="btn dropdown-toggle pe-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                </button>
                <ul className="dropdown-menu">
                    <li className="cursor-pointer"><span className="dropdown-item">Edit</span></li>
                    <li className="cursor-pointer" onClick={() => setDeleteIncomeId(income.id)} data-bs-toggle="modal" data-bs-target="#deleteIncomeModal"><span className="dropdown-item">Delete</span></li>
                </ul>
            </div>
        </div>
    );
}