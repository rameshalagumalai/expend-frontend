import Expense from "./Expense";
import TopBar from "../../components/TopBar";
import NewExpenseModal from "./NewExpenseModal";
import { useEffect, useState } from "react";
import { getExpenses } from "../../api-calls/expenseCalls";
import PageLoading from "../../components/PageLoading";
import PageError from "../../components/PageError";
import { getFormattedDate } from "../../utils";
import DeleteExpenseModal from "./DeleteExpenseModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function Home() {

    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    async function getAllExpenses() {
        const result = await getExpenses(user);
        if (Array.isArray(result)) {
            setExpenses(result);
        } else {
            if (result.message) {
                setErrorMessage(result);
            } else {
                setErrorMessage("Network error");
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        getAllExpenses();
    }, []);

    const [deleteExpenseId, setDeleteExpenseId] = useState(0);

    return (
        <div className="full-height">
            <TopBar title="Expenses" />
            {
                loading ?
                    <PageLoading />
                    :
                    expenses ?
                        <>
                            <div className="pt-5 mt-3 overflow-auto position-relative">
                                {
                                    expenses.map((expense, i) => {
                                        return (
                                            <div key={i}>
                                                {
                                                    (i !== 0) ? 
                                                    (getFormattedDate(expense.instance) !== getFormattedDate(expenses[i-1].instance)) &&
                                                    <span className="badge bg-secondary mt-3 ms-3">{getFormattedDate(expense.instance)}</span>
                                                    :
                                                    <span className="badge bg-secondary mt-3 ms-3">{(getFormattedDate(expense.instance) === getFormattedDate(new Date()))? "Today" : getFormattedDate(expense.instance)}</span>
                                                }
                                                <Expense expense={expense} setDeleteExpenseId={setDeleteExpenseId} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <button type="button" className="btn btn-lg btn-primary btn-floating rounded-circle px-3" data-bs-toggle="modal" data-bs-target="#expenseModal">
                                <i className="fas fa-plus m-0"></i>
                            </button>
                            <NewExpenseModal getAllExpenses={getAllExpenses} />
                            <DeleteExpenseModal expenseId={deleteExpenseId} expenses={expenses} setExpenses={setExpenses} />
                        </>
                        :
                        <PageError errorMessage={errorMessage} />
            }
        </div>
    );
}