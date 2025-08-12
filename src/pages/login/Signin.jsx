import { useState } from "react";
import { signIn } from "../../api-calls/signInCalls";
// import { Link } from "react-router-dom";

export default function Signin() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
        await signIn(formData);
        setLoading(false);
    }

    return (
        <div className="full-height d-flex align-items-center justify-content-center">
            <form onSubmit={e => handleSubmit(e)} className="col-10 col-lg-3 text-center rounded-5 p-5 shadow-lg">
                <h1 className="f-800 display-2 text-danger mb-1">Expend</h1>
                <h3 className="text-secondary f-700 mb-4">Sign in</h3>
                <small className="d-block mt-3 mb-1 text-secondary">Email</small>
                <input name="email" value={formData.email} onChange={e => handleInput(e)} type="email" className="form-control p-2" />
                <small className="d-block mt-3 mb-1 text-secondary">Password</small>
                <input name="password" value={formData.password} onChange={e => handleInput(e)} type="password" className="form-control p-2 mb-4" />
                {
                    loading ?
                        <button className="btn btn-primary form-control" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Signing in...
                        </button>
                        :
                        <button type="submit" className="btn btn-primary form-control">Sign in</button>
                }
                {/* <div className="d-flex mt-4">
                    <Link to='/forgot-password'>Forgot password?</Link>
                    <Link className="ms-auto" to='/signup'>New user?</Link>
                </div> */}
            </form>
        </div>
    );
}