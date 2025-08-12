export default function TopBar({ title }) {
    return (
        // <nav className="navbar bg-danger navbar-dark fixed-top shadow">
        //     <div className="container-fluid mx-2">
        //         <a className="navbar-brand" href="/">
        //             <h1 className="f-900 mb-0">{ title }</h1>
        //         </a>
        //     </div>
        // </nav>
        <div className="d-flex align-items-center bg-danger text-white p-3 shadow fixed-top">
            <button className="btn btn-danger p-0 me-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i className="fas fa-bars"></i></button>
            <h1 className="f-900 mb-0">{ title }</h1>
        </div>
    );
}