import { useEffect, useState } from "react";
import { getBalanceAccounts } from "../../api-calls/balanceAccountCalls";
import PageError from "../../components/PageError";
import PageLoading from "../../components/PageLoading";
import TopBar from "../../components/TopBar";
import BalanceAccount from "./BalanceAccount";
import NewBalanceAccountModal from "./NewBalanceAccountModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function Balances() {

    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(true);
    const [balanceAccounts, setBalanceAccounts] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function getAccounts() {
            const result = await getBalanceAccounts(user);
            if (Array.isArray(result)) {
                setBalanceAccounts(result);
            } else {
                if (result.message) {
                    setErrorMessage(result);
                } else {
                    setErrorMessage("Network error");
                }
            }
            setLoading(false);
        }
        getAccounts();
    }, []);

    function getTotalBalance() {
        var total = 0;
        for (const balanceAccount of balanceAccounts) {
            total += balanceAccount.balance;
        }
        return total;
    }

    return (
        <div className="full-height">
            <TopBar title="Balances" />
            {
                loading ?
                    <PageLoading />
                    :
                    balanceAccounts ?
                        <div className="pt-5 px-3 overflow-auto">
                            <div className="d-flex justify-content-center mt-5">
                                <div className="text-center rounded-4 bg-body-secondary p-4">
                                    <h1 className="f-900 display-1">Rs {getTotalBalance()}</h1>
                                    <h4 className="text-secondary f-700 mb-0">Total balance</h4>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-4 mb-2">
                                <h5 className="f-700 mb-0">Balance accounts</h5>
                                <button type="button" className="btn btn-sm btn-secondary rounded-circle ms-auto" data-bs-toggle="modal" data-bs-target="#balanceAccountModal">
                                    <i className="fas fa-plus m-0"></i>
                                </button>
                            </div>
                            {
                                balanceAccounts.map((balanceAccount, i) => {
                                    return (
                                        <BalanceAccount key={i} balanceAccount={balanceAccount} />
                                    );
                                })
                            }
                        </div>
                        :
                        <PageError errorMessage={errorMessage} />
            }
            <NewBalanceAccountModal balanceAccounts={balanceAccounts} setBalanceAccounts={setBalanceAccounts} />
        </div>
    );
}