import { useEffect, useState } from "react";
import { getWithdrawals } from "../../api-calls/withdrawalCalls";
import PageError from "../../components/PageError";
import PageLoading from "../../components/PageLoading";
import TopBar from "../../components/TopBar";
import DeleteWithdrawalModal from "./DeleteWithdrawalModal";
import NewWithdrawalModal from "./NewWithdrawalModal";
import Withdrawal from "./Withdrawal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function Withdrawals() {

    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(true);
    const [withdrawals, setWithdrawals] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    async function getAllWithdrawals() {
        const result = await getWithdrawals(user);
        if (Array.isArray(result)) {
            setWithdrawals(result);
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
        getAllWithdrawals();
    }, []);

    const [deleteWithdrawalId, setDeleteWithdrawalId] = useState(0);

    return (
        <div className="full-height">
            <TopBar title="Withdrawals" />
            {
                loading ?
                    <PageLoading />
                    :
                    withdrawals ?
                        <>
                            <div className="pt-5 mt-3 overflow-auto position-relative">
                                {
                                    withdrawals.map((withdrawal, i) => {
                                        return (
                                            <Withdrawal key={i} withdrawal={withdrawal} setDeleteWithdrawalId={setDeleteWithdrawalId} />
                                        );
                                    })
                                }
                            </div>
                            <button type="button" className="btn btn-lg btn-primary btn-floating rounded-circle px-3" data-bs-toggle="modal" data-bs-target="#withdrawalModal">
                                <i className="fas fa-plus m-0"></i>
                            </button>
                            <NewWithdrawalModal getAllWithdrawals={getAllWithdrawals} />
                            <DeleteWithdrawalModal withdrawalId={deleteWithdrawalId} withdrawals={withdrawals} setWithdrawals={setWithdrawals} />
                        </>
                        :
                        <PageError errorMessage={errorMessage} />
            }
        </div>
    );
}