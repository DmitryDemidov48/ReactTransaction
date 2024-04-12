import { FC } from "react";
import { TransactionForm } from "../components/TransactionForm.tsx";
import { instance } from "../api/axios.api";
import {ICategory, IResponseTransactionLoader, ITransaction} from "../types/types.ts";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable.tsx";
import {useLoaderData} from "react-router-dom";
import {formatToUSD} from "../helpers/currency.helper.ts";
import Chart from "../components/Chart.tsx";

// Функция для загрузки категорий перед созданием транзакции
export const transactionLoader = async () => {
    try {
        // Отправляем запрос на получение списка категорий
        const categoriesResponse = await instance.get<ICategory[]>('/categories');
        const transactionsResponse = await instance.get<ITransaction[]>('/transactions');
        const totalIncome = await instance.get<number>('/transactions/income/find')
        const totalExpense = await instance.get<number>('/transactions/expense/find')

        // Формируем объект с данными, содержащий список категорий и транзакций
        const data = {
            categories: categoriesResponse.data,
            transactions: transactionsResponse.data,
            totalIncome: totalIncome.data,
            totalExpense: totalExpense.data
        };

        return data;
    } catch (error) {
        console.error("Error loading transactions:", error);
        // В случае ошибки возвращаем пустой объект или null
        return {
            categories: [],
            transactions: []
        };
    }
};

// Функция для обработки действий с транзакциями
export const transactionAction = async ({ request }: any) => {
    try {
        // В зависимости от метода запроса выполняем различные действия
        switch (request.method) {
            case "POST" : {
                // Если метод POST, добавляем новую транзакцию
                const formData = await request.formData();
                const newTransaction = {
                    title: formData.get('title'),
                    amount: +formData.get('amount'),
                    category: formData.get('category'),
                    type: formData.get('type'),

                };
                // Отправляем запрос на создание новой транзакции
                await instance.post('/transactions', newTransaction);
                // Выводим уведомление об успешном добавлении транзакции
                toast.success('Transaction added.');
                return null;
            }
            case "DELETE" : {
                const formData = await request.formData();
                const transactionId = formData.get('id')
                await instance.delete(`/transactions/transaction/${transactionId}`)
                toast.success('Transaction deleted.')
                // Обработка удаления транзакции
                return null;
            }
        }
    } catch (error) {
        console.error("Error performing transaction action:", error);
        // Можно также обработать ошибку и выполнить необходимые действия, например, отобразить уведомление пользователю
        toast.error('An error occurred while performing the transaction action.');
        return null;
    }
};
const Transactions: FC = () => {
    const {totalIncome, totalExpense} = useLoaderData() as IResponseTransactionLoader
    return (
        <>
            <div className="grid grid-cols-3 gap-4 items-start mt-4">
                {/* Форма добавления транзакции */}
                <div className="col-span-2 grid">
                    <TransactionForm/>
                </div>
                {/* Блок статистики */}
                <div className="rounded-md bg-slate-800 p-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="uppercase text-md font-bold text-md">Total Income:</p>
                            <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">{formatToUSD.format(totalIncome)}</p>
                        </div>
                        <div>
                            <p className="uppercase text-md font-bold text-md">Total Expense:</p>
                            <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">{formatToUSD.format(totalExpense)}</p>
                        </div>
                    </div>
                    {/* График */}
                   <Chart totalIncome={totalIncome} totalExpense={totalExpense}/>
                </div>
            </div>

            {/* Таблица результатов */}
            <h1 className="my-5"><TransactionTable limit={5}/></h1>
        </>
    );
};

export default Transactions;
