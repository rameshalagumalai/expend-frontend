import { useState } from "react";
import { deleteWithdrawal } from "../../api-calls/withdrawalCalls";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function DeleteWithdrawalModal({ withdrawalId, withdrawals, setWithdrawals }) {

    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (await deleteWithdrawal(user, withdrawalId)) {
            setWithdrawals(withdrawals.filter((withdrawal) => {
                return (
                    withdrawal.id !== withdrawalId
                );
            }));
            document.getElementById("deleteWithdrawalModalClose").click();
        }
        setLoading(false);
    }

    return (
        <div className="modal fade" id="deleteWithdrawalModal" tabIndex="-1" aria-labelledby="deleteWithdrawalModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={e => handleSubmit(e)} className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title f-900" id="deleteWithdrawalModalLabel">Delete withdrawal</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className="mb-0">Are you sure that you want to delete this withdrawal?</p>
                    </div>
                    <div className="modal-footer">
                        <button id="deleteWithdrawalModalClose" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {
                            loading ?
                                <button class="btn btn-danger" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Deleting...
                                </button>
                                :
                                <button type="submit" className="btn btn-danger">Delete</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}