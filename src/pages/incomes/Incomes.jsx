import { useEffect, useState } from "react";
import { getIncomes } from "../../api-calls/incomeCalls";
import PageError from "../../components/PageError";
import PageLoading from "../../components/PageLoading";
import TopBar from "../../components/TopBar";
import DeleteIncomeModal from "./DeleteIncomeModal";
import Income from "./Income";
import NewIncomeModal from "./NewIncomeModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function Incomes() {

    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(true);
    const [incomes, setIncomes] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    async function getAllIncomes() {
        const result = await getIncomes(user);
        if (Array.isArray(result)) {
            setIncomes(result);
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
        getAllIncomes();
    }, []);

    const [deleteIncomeId, setDeleteIncomeId] = useState(0);

    return (
        <div className="full-height">
            <TopBar title="Incomes" />
            {
                loading ?
                    <PageLoading />
                    :
                    incomes ?
                        <>
                            <div className="pt-5 mt-3 overflow-auto position-relative">
                                {
                                    incomes.map((income, i) => {
                                        return (
                                            <Income key={i} income={income} setDeleteIncomeId={setDeleteIncomeId} />
                                        );
                                    })
                                }
                            </div>
                            <button type="button" className="btn btn-lg btn-primary btn-floating rounded-circle px-3" data-bs-toggle="modal" data-bs-target="#incomeModal">
                                <i className="fas fa-plus m-0"></i>
                            </button>
                            <NewIncomeModal getAllIncomes={getAllIncomes} />
                            <DeleteIncomeModal incomeId={deleteIncomeId} incomes={incomes} setIncomes={setIncomes} />
                        </>
                        :
                        <PageError errorMessage={errorMessage} />
            }
        </div>
    );
}