import { useEffect, useState } from "react";
import { getExpenseCategories } from "../../api-calls/expenseCategoryCalls";
import PageError from "../../components/PageError";
import PageLoading from "../../components/PageLoading";
import TopBar from "../../components/TopBar";
import Category from "./Category";
import NewCategoryModal from "./NewCategoryModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function Balances() {

    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(true);
    const [expenseCategories, setExpenseCategories] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function getCategories() {
            const result = await getExpenseCategories(user);
            if (Array.isArray(result)) {
                setExpenseCategories(result);
            } else {
                if (result.message) {
                    setErrorMessage(result);
                } else {
                    setErrorMessage("Network error");
                }
            }
            setLoading(false);
        }
        getCategories();
    }, []);

    return (
        <div className="full-height">
            <TopBar title="Categories" />
            {
                loading ?
                    <PageLoading />
                    :
                    expenseCategories ?
                        <div className="pt-5 overflow-auto">
                            <div className="mt-4 px-3 d-flex flex-wrap">
                                <div className="p-1 col-6 cursor-pointer">
                                    <button className="btn border border-2 w-100 h-100" data-bs-toggle="modal" data-bs-target="#categoryModal">
                                        <i className="fas fa-plus fa-2x"></i>
                                    </button>
                                </div>
                                {
                                    expenseCategories.map((expenseCategory, i) => {
                                        return (
                                            <Category key={i} category={expenseCategory} />
                                        );
                                    })
                                }
                            </div>
                        </div>
                        :
                        <PageError errorMessage={errorMessage} />
            }

            <NewCategoryModal expenseCategories={expenseCategories} setExpenseCategories={setExpenseCategories} />
        </div>
    );
}