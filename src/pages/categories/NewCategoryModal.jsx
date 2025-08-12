import { useEffect, useState } from "react";
import { CirclePicker as ColorPicker } from "react-color";
import { getUnusedColors } from "../../api-calls/categoryColorCalls";
import { createExpenseCategory } from "../../api-calls/expenseCategoryCalls";
import PageError from "../../components/PageError";
import PageLoading from "../../components/PageLoading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function NewCategoryModal({ expenseCategories, setExpenseCategories }) {

    const [user] = useAuthState(auth);

    const [colorsLoading, setColorsLoading] = useState(true);
    const [colors, setColors] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function getColors() {
            const result = await getUnusedColors(user);
            if (Array.isArray(result)) {
                setColors(result.map((res) => res.colorCode));
            } else {
                if (result.message) {
                    setErrorMessage(result);
                } else {
                    setErrorMessage("Network error");
                }
            }
            setColorsLoading(false);
        }
        getColors();
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        colorCode: ""
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
        const id = await createExpenseCategory(user, formData);
        if (id !== -1) {
            setExpenseCategories([...expenseCategories, { id: id, ...formData }]);
            setFormData({
                name: "",
                colorCode: ""
            });
        }
        setLoading(false);
    }

    return (
        <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                {
                    colorsLoading ?
                        <PageLoading />
                        :
                        colors ?
                            <form onSubmit={e => handleSubmit(e)} className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title f-900" id="categoryModalLabel">New category</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <small className="d-block mb-1 text-secondary">Name</small>
                                    <input name="name" value={formData.name} onChange={e => handleInput(e)} type="text" className="form-control p-2" />
                                    <small className="d-block mt-3 mb-1 text-secondary">Color</small>
                                    <ColorPicker colors={colors} onChange={color => setFormData({ ...formData, colorCode: color.hex })} width="100%" />
                                </div>
                                <div className="modal-footer">
                                    <button id="categoryModalClose" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                            :
                            <PageError errorMessage={errorMessage} />
                }
            </div>
        </div>
    );
}