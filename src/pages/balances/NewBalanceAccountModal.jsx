import { useState } from "react";
import { createBalanceAccount } from "../../api-calls/balanceAccountCalls";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function NewBalanceAccountModal({ balanceAccounts, setBalanceAccounts }) {

    const [user] = useAuthState(auth);

    const [formData, setFormData] = useState({
        name: "",
        isCash: -1,
        openingBalance: 0,
        minimumBalance: 0
    });

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
        const id = await createBalanceAccount(user, formData);
        if (id !== -1) {
            setBalanceAccounts([...balanceAccounts, { id: id, name: formData.name, isCash: parseInt(formData.isCash), balance: parseFloat(formData.openingBalance), minimumBalance: formData.minimumBalance }]);
            setFormData({
                name: "",
                isCash: -1,
                openingBalance: 0,
                minimumBalance: 0
            });
        }
        setLoading(false);
    }

    return (
        <div className="modal fade" id="balanceAccountModal" tabIndex="-1" aria-labelledby="balanceAccountModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={e => handleSubmit(e)} className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title f-900" id="balanceAccountModalLabel">New balance account</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <small className="d-block mb-1 text-secondary">Name</small>
                        <input type="text" name="name" value={formData.name} onChange={e => handleInput(e)} className="form-control p-2" />
                        <small className="d-block mt-3 mb-1 text-secondary">Type</small>
                        <input type="radio" name="isCash" value={0} onChange={e => handleInput(e)} className="btn-check" id="success-outlined" autoComplete="off" />
                        <label className="btn btn-outline-dark me-2" htmlFor="success-outlined"><i className="fas fa-university"></i> Bank</label>
                        <input type="radio" name="isCash" value={1} onChange={e => handleInput(e)} className="btn-check" id="danger-outlined" autoComplete="off" />
                        <label className="btn btn-outline-dark" htmlFor="danger-outlined"><i className="fas fa-money-bill"></i> Cash</label>
                        <small className="d-block mt-3 mb-1 text-secondary">Opening balance</small>
                        <input type="number" name="openingBalance" value={formData.openingBalance} onChange={e => handleInput(e)} className="form-control p-2" />
                        <small className="d-block mt-3 mb-1 text-secondary">Minimum balance</small>
                        <input type="number" name="minimumBalance" value={formData.minimumBalance} onChange={e => handleInput(e)} className="form-control p-2" />
                    </div>
                    <div className="modal-footer">
                        <button id="balanceAccountModalClose" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {
                            loading ?
                                <button class="btn btn-primary" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Creating...
                                </button>
                                :
                                <button type="submit" className="btn btn-primary">Create</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}