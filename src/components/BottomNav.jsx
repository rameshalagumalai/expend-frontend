import BottomNavLink from "./BottomNavLink";

export default function BottomNav() {
    return (
        <div className="fixed-bottom d-flex bg-white shadow-lg">
            <BottomNavLink icon="home" text="Home" path="/" />
            <BottomNavLink icon="shapes" text="Categories" path="/categories" />
            <BottomNavLink icon="arrow-down" text="Incomes" path="/incomes" />
            <BottomNavLink icon="money-bill-transfer" text="Withdrawals" path="/withdrawals" />
            <BottomNavLink icon="wallet" text="Balances" path="/balances" />
        </div>
    );    
}