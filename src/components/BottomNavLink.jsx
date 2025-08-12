import { useNavigate } from "react-router-dom"

export default function BottomNavLink({ icon, text, path }) {

    const navigate = useNavigate();

    return (
        <div
            className="text-center text-secondary py-2 cursor-pointer bnav-link"
            onClick={()=>navigate(path)}
        >
            <i className={`fas fa-${icon} d-block`}></i>
            <small>{text}</small>
        </div>
    )
}