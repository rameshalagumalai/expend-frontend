import { useState } from "react";

export default function Sandbox() {
    const [isCash, setIsCash] = useState(0);

    return (
        <div>
            <h1>{isCash}</h1>
            <input type="radio" name="isCash" value={0} onChange={e => setIsCash(e.target.value)} />
            {/* <label className="btn btn-outline-dark me-2" htmlFor="success-outlined"><i className="fas fa-university"></i> Bank</label> */}
            <input type="radio" name="isCash" value={1} onChange={e => setIsCash(e.target.value)} />
            {/* <label className="btn btn-outline-dark" htmlFor="danger-outlined"><i className="fas fa-money-bill"></i> Cash</label> */}
        </div>
    );
}