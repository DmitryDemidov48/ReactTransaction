import {FC, useState} from "react";
import {Form, useLoaderData} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import {IResponseTransactionLoader} from "../types/types.ts";
import {CategoryModal} from "./CategoryModal.tsx";


export const TransactionForm:FC = () => {
    const { categories } = useLoaderData() as IResponseTransactionLoader
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    return (
        <div className="rounded-md bg-slate-800 p-4">
            <Form className="grid gap-2" method="post" action="/transactions">
                <label className="grid" htmlFor="title">
                    <span>Title</span>
                    <input className="input border-slate-700" type="text" placeholder="Title..." name="title" required/>
                </label>
                <label className="grid" htmlFor="amount">
                    <span>Amount</span>
                    <input className="input border-slate-700" type="number" placeholder="Amount..." name="amount" required/>
                </label>
                {/*select*/}
                {categories.length ? (
                    <label htmlFor="category" className="grid">
                        <span>Category</span>
                        <select className="input border-slate-700" name="category" required >
                            {categories.map((c, i) => (
                                <option key={i} value={c.id}>{c.title}</option>
                            ))}
                        </select>
                    </label>
                ) : (
                    <h1 className="mt-1 text-red-300">To continue create a category first </h1>
                )}
                {/*add category*/}
                <button
                    onClick={() => setVisibleModal(true)}
                        className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white">
                    <FaPlus/>
                    <span>Manage Categories:</span>
                </button>
                {/*radio button*/}
                <div className="flex gap-4 items-center">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input type="radio" name='type' value={'income'} className="form-radio text-blue-600"/>
                        <span>Income</span>
                    </label>
                    <label className="cursor-pointer flex items-center gap-2">
                        <input type="radio" name='type' value={'expense'} className="form-radio text-blue-600"/>
                        <span>Expense</span>
                    </label>
                </div>
                {/*submit button*/}
                <button className="btn btn-green max-w-fit mt-2">Submit</button>
            </Form>

            {/*add category modal*/}
            {visibleModal && (
                <CategoryModal type='post'   setVisibleModal={setVisibleModal}/>
            )}
        </div>
    );
};

