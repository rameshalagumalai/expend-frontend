import { useEffect, useState } from "react";
import { getBalanceAccounts } from "../../api-calls/balanceAccountCalls";
import { createWithdrawal } from "../../api-calls/withdrawalCalls";
import PageError from "../../components/PageError";
import PageLoading from "../../components/PageLoading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function NewWithdrawalModal({ getAllWithdrawals }) {

    const [user] = useAuthState(auth);

    const [inputLoading, setInputLoading] = useState(true);
    const [balanceAccounts, setBalanceAccounts] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        amount: 0,
        fromAccountId: 0,
        toAccountId: 0,
        date: "",
        time: ""
    });

    useEffect(() => {
        async function getBalanceAccountsForInput() {
            const result = await getBalanceAccounts(user);
            if (Array.isArray(result)) {
                setBalanceAccounts(result);
                setFormData({ ...formData, fromAccountId: result[0].id, toAccountId: result[1]?.id });
            } else {
                if (result.message) {
                    setErrorMessage(result);
                } else {
                    setErrorMessage("Network error");
                }
            }
            setInputLoading(false);
        }
        getBalanceAccountsForInput();
    }, []);

    function handleInput(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const id = await createWithdrawal(user, formData, getAllWithdrawals);
        if (id !== -1) {
            setFormData({
                amount: 0,
                fromAccountId: balanceAccounts[0].id,
                toAccountId: balanceAccounts[1]?.id,
                date: "",
                time: ""
            });
        }
        setLoading(false);
    }

    return (
        <div className="modal fade" id="withdrawalModal" tabIndex="-1" aria-labelledby="withdrawalModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                {
                    inputLoading ?
                        <PageLoading />
                        :
                        balanceAccounts ?
                            <form onSubmit={e => handleSubmit(e)} className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title f-900" id="withdrawalModalLabel">New withdrawal</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <small className="d-block mb-1 text-secondary">Amount</small>
                                    <input name="amount" value={formData.amount} onChange={e => handleInput(e)} type="number" className="form-control p-2" />
                                    <small className="d-block mt-3 mb-1 text-secondary">From account</small>
                                    <select name="fromAccountId" value={formData.fromAccountId} onChange={e => handleInput(e)} className="form-select p-2">
                                        {
                                            balanceAccounts.map((balanceAccount, i) => {
                                                return (
                                                    <option key={i} value={balanceAccount.id}>{balanceAccount.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    <small className="d-block mt-3 mb-1 text-secondary">From account</small>
                                    <select name="toAccountId" value={formData.toAccountId} onChange={e => handleInput(e)} className="form-select p-2">
                                        {
                                            balanceAccounts.map((balanceAccount, i) => {
                                                return (
                                                    <option key={i} value={balanceAccount.id}>{balanceAccount.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    <small className="d-block mt-3 mb-1 text-secondary">Date <span className="text-tiny">(Optional)</span></small>
                                    <input name="date" value={formData.date} onChange={e => handleInput(e)} type="date" className="form-control p-2" />
                                    <small className="d-block mt-3 mb-1 text-secondary">Time <span className="text-tiny">(Optional)</span></small>
                                    <input name="time" value={formData.time} onChange={e => handleInput(e)} type="time" className="form-control p-2" />
                                </div>
                                <div className="modal-footer">
                                    <button id="withdrawalModalClose" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {
                                        loading ?
                                            <button class="btn btn-primary" type="button" disabled>
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Adding...
                                            </button>
                                            :
                                            <button type="submit" className="btn btn-primary">Add</button>
                                    }
                                </div>
                            </form>
                            :
                            <PageError errorMessage={errorMessage} />
                }
            </div>
        </div>
    );
}