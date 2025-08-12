import { getDFormattedDateTime } from "../../utils";

export default function Withdrawal({ withdrawal, setDeleteWithdrawalId }) {
    return (
        <div className="border-bottom bg-white p-3 d-flex align-items-center">
            <div>
                <span className="badge bg-light text-dark f-400">
                    <i className={`fas fa-${withdrawal.fromIsCash ? "money-bill" : "university"}`}></i> <span className="h6">{withdrawal.fromAccountName}</span>
                </span>
                <i class="fa-solid fa-arrow-right"></i>
                <span className="badge bg-light text-dark f-400">
                    <i className={`fas fa-${withdrawal.toIsCash ? "money-bill" : "university"}`}></i> <span className="h6">{withdrawal.toAccountName}</span>
                </span>
                <br/>
                {/* <p className="f-700 mb-0">{withdrawal.fromAccountName} to {withdrawal.toAccountName}</p> */}
                <small className="text-tiny text-secondary">{getDFormattedDateTime(withdrawal.instance)}</small>
            </div>
            <h2 className="ms-auto f-900 mb-0 bg-body-secondary p-1 rounded">Rs {withdrawal.amount}</h2>
            <div className="dropdown">
                <button className="btn dropdown-toggle pe-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                </button>
                <ul className="dropdown-menu">
                    <li className="cursor-pointer"><span className="dropdown-item">Edit</span></li>
                    <li className="cursor-pointer" onClick={()=>setDeleteWithdrawalId(withdrawal.id)} data-bs-toggle="modal" data-bs-target="#deleteWithdrawalModal"><span className="dropdown-item">Delete</span></li>
                </ul>
            </div>
        </div>
    );
}