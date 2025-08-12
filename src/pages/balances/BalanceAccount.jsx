export default function BalanceAccount({ balanceAccount }) {
    return (
        <div className="d-flex align-items-center rounded-3 border p-3 mb-3">
            <div>
                <h5 className="f-700 mb-1">{ balanceAccount.name }</h5>
                <span className="badge bg-secondary f-300">
                {
                    balanceAccount.isCash ?
                        <><i className="fas fa-money-bill"></i> Cash</>
                        :
                        <><i className="fas fa-university"></i> Bank</>
                }
                </span>
            </div>
            <div className="ms-auto p-2 text-center bg-warning-subtle rounded">
                <p className="small mb-0">Available balance</p>
                <h5 className="f-700 mb-0">Rs { balanceAccount.balance }</h5>
            </div>
        </div>
    );
}