import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from "../../../functions/category";
import { getSub, updateSub } from '../../../functions/sub'

import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

import CategoryForm from '../../../components/forms/CategoryForm'



const SubUpdate = () => {
    let navigate = useNavigate()
    let { slug } = useParams()
    const { user } = useSelector((state) => ({ ...state }))

    const [name, setName] = useState('')
    const [parent, setParent] = useState('')
    const [categories, setCategories] = useState([])
    const [keyword, setKeyword] = useState('')

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        loadCategories()
        loadSubs()
        console.log(slug)
    }, [])

    const loadCategories = () => getCategories().then((c) => setCategories(c.data))
    const loadSubs = () => getSub(slug).then((s) => {setName(s.data.name); setParent(s.data.parent)})

    const handleSubmit = (e) => {
        setLoading(true)
        updateSub(slug, { name, parent }, user.token)
            .then(res => {
                console.log(res)

                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is updated`)
                navigate('/admin/sub')
            })
            .catch(err => {
                console.log(err)

                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }


    return (
        <div className='relative max-w-screen-xl mx-auto flex justify-between items-center mt-4'>

            <div className='flex flex-row '>
                <AdminNav />
                <div className='flex flex-col space-y-4'>
                    <h4 className='text-xl'>Sub Category Update</h4>

                    <div>
                        <label>Parent Category</label>
                        <select className=''
                            name='category'
                            onChange={e => setParent(e.target.value)}>
                            <option>Please select</option>
                            {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>))}
                        </select>
                    </div>

                    <div>
                        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} placeholder={"Modifier Sub categorie"} enterButton={'Modifier'}/>
                    </div>
                    <hr />

                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left ">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Sub Categories
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SubUpdate