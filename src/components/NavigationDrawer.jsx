import NavigationLink from "./NavigationLink";

export default function NavigationDrawer() {
    return (
        <div className="offcanvas offcanvas-start col-10" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header bg-danger text-white">
                <h1 className="offcanvas-title f-900" id="offcanvasExampleLabel">Expend</h1>
                <button id="navDrawerClose" type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body p-0">
                <NavigationLink text="Expenses" path="/" />
                <NavigationLink text="Categories" path="/categories" />
                <NavigationLink text="Incomes" path="/incomes" />
                <NavigationLink text="Withdrawals" path="/withdrawals" />
                <NavigationLink text="Balances" path="/balances" />
            </div>
        </div>
    );
}