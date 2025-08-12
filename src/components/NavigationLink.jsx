import { useNavigate } from "react-router-dom";

export default function NavigationLink({ text, path }) {

    const navigate = useNavigate();

    function handleNavigate() {
        navigate(path);
        document.getElementById("navDrawerClose").click();
    }

    return (
        <p
            className="p-3 mb-0 border-bottom cursor-pointer navigation-link"
            onClick={()=>handleNavigate()}
        >
            { text }
        </p>
    );
}