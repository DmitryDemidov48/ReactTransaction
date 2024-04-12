import {FC} from 'react';
import {Form} from "react-router-dom";


interface ICategoryModal {
    type: 'post' | 'patch'
    id?: number
    setVisibleModal: (visible:boolean) => void
}
export const CategoryModal:FC<ICategoryModal> = ({type, id, setVisibleModal}) => {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
            <Form
                action="/categories"
                method={type}
                onSubmit={() => setVisibleModal(false)}
                className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900">
                <label htmlFor="title">
                    <small>Category Title</small>
                    <input className="input w-full" type="text" name="title" placeholder="Title...."/>
                    <input type="hidden" name='id' value={id}/>
                </label>
                <div className="flex items-center gap-2">
                    <button className="btn btn-green"  type="submit">
                        {type === 'patch' ? 'Save' : 'Create'}
                    </button>
                    <button onClick={() => setVisibleModal(false)} className="btn btn-red" >Close</button>
                </div>
            </Form>
        </div>
    );
};

