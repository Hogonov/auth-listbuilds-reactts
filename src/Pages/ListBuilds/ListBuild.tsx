import React, {useCallback, useContext, useEffect, useState} from 'react';
import style from './ListBuild.module.css'
import {useHttp} from "../../Hooks/fetch.hook";
import {AuthContext} from "../../Context/AuthContext";
import {Loader} from "../../Component/Loader";
import Select from 'react-select';


export const ListBuild: React.FunctionComponent = () => {
    const {request, loading} = useHttp();
    const auth = useContext(AuthContext);
    const [options, setOptions] = useState([])
    const [paginationOptions, setPaginationOptions] = useState({
        page: 1,
        perPage: 10
    })
    const [form, setForm] = useState<any>({
        optionChooseCompany: null,
        listCompanies: []
    })
    const [dataCompanyTable, setDataCompanyTable] = useState<{ links: any, data: Array<any> }>({
        links: null,
        data: []
    })
    const URL = {
        getCompany: 'http://test-alpha.reestrdoma.ru/api/reestrdoma/companies/',
        getDetail: 'http://test-alpha.reestrdoma.ru/api/reestrdoma/company/houses/'
    }

    const getHandler = useCallback(async () => {
        try {
            const data = await request(URL.getCompany, 'GET', null, {Authorization: `Bearer ${auth.token}`});
            setOptions(data.data.map((val: any, index: number) => {
                return {label: val.name, value: index}
            }))
            setForm({...form, listCompanies: data.data})
        } catch (e) {
            console.log(e)
        }
    }, [auth.token])

    const getDetailCompany = useCallback(async () => {
        try {
            const data = await request(
                `${URL.getDetail}${form.listCompanies[form.optionChooseCompany.value].id}/?page=${paginationOptions.page}&perPage=${paginationOptions.perPage}`,
                'GET', null, {Authorization: `Bearer ${auth.token}`});
            setDataCompanyTable({...dataCompanyTable, data: data.data, links: data.links})
        } catch (e) {
        }
    }, [form, paginationOptions, auth.token, dataCompanyTable])


    useEffect(() => {
        getHandler().then(r => {})
    }, [getHandler]);


    const changeHandler = async (event: any) => {
        if (form.optionChooseCompany !== event) {
            setForm({...form, optionChooseCompany: event})
            await getDetailCompany()
        }
    }

    const paginationHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        let currentPage = Number(event.currentTarget.textContent)
        if (currentPage !== paginationOptions.page) {
            setPaginationOptions({...paginationOptions, page: currentPage})
            await getDetailCompany()
        }
    }

    if (loading) return <Loader/>
    
    return <div className={style.main}>
        <Select
            id="company"
            placeholder="Choose company"
            className={style.selector}
            options={options}
            value={form.optionChooseCompany}
            onChange={changeHandler}
            name="company"
        />
        {dataCompanyTable.data.length > 1 && <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Адрес</th>
                    <th>Кол-во квартир</th>
                    <th>Дата добавления</th>
                </tr>
                </thead>
                <tbody>
                {
                    dataCompanyTable.data.map((build: any, index: number) => {
                        let date = new Date(build.createdAt)
                        return <tr key={index}>
                            <td>{build.id}</td>
                            <td>{build.address}</td>
                            <td>{build.reestrFlatCount}</td>
                            <td>{date.toLocaleDateString().replaceAll('.', ':')}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
            {dataCompanyTable.links.lastPage !== 1 && <>
                <div className={style.pagination}>
                    {paginationOptions.page > 2 && <>
                        <button
                            className={`btn ${style.button} ${paginationOptions.page === 1 ? style.activePage : ''}`}
                            onClick={paginationHandler}
                        >1
                        </button>
                        {paginationOptions.page > 3 &&
                        <button className={`btn ${style.button}`}
                                disabled={true}>...</button>
                        }
                    </>}
                    {paginationOptions.page > 1 &&
                    <button className={`btn ${style.button}`}
                            onClick={paginationHandler}
                    >{paginationOptions.page - 1}</button>}
                    <button className={`btn ${style.button} ${style.activePage}`}
                            onClick={paginationHandler}
                    >{paginationOptions.page}</button>
                    {paginationOptions.page < dataCompanyTable.links.lastPage &&
                    <button className={`btn ${style.button}`}
                            onClick={paginationHandler}
                    >{paginationOptions.page + 1}</button>
                    }
                    {paginationOptions.page < dataCompanyTable.links.lastPage - 1 && <>
                        {paginationOptions.page < dataCompanyTable.links.lastPage - 2 &&
                        <button className={`btn ${style.button}`} disabled={true}>...</button>
                        }
                        <button
                            className={`btn ${style.button} ${paginationOptions.page === dataCompanyTable.links.lastPage ? style.activePage : ''}`}
                            onClick={paginationHandler}
                        >{dataCompanyTable.links.lastPage}</button>
                    </>}
                </div>
            </>}
        </>
        }
    </div>
}
