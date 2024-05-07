import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createCategory, getCategories, removeCategory } from '../../../functions/category'
import { createSub, getSubs, removeSub } from '../../../functions/sub'
import { Link } from 'react-router-dom'
import { Input } from 'antd';
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'
const { Search } = Input;

const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }))

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [category, setCategory] = useState('')
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        loadCategories()
        loadSubs()
    }, [])

    const loadCategories = () => getCategories().then((c) => setCategories(c.data))
    const loadSubs = () => getSubs().then((s) => setSubs(s.data))

    const handleSubmit = (e) => {
        setLoading(true)
        createSub({ name, parent: category }, user.token)
            .then(res => {
                console.log(res)

                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is created`)
                loadSubs()
            })
            .catch(err => {
                console.log(err)

                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleRemove = async (slug) => {
        if (window.confirm('Voulez vous vraiment supprimer ?')) {
            setLoading(true)
            removeSub(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.error(`${res.data.name} deleted`)
                    loadSubs()

                })
                .catch(err => {
                    setLoading(false)
                    if (err.response.status === 400) toast.error(err.response.data)
                })
        }
    }

    //Search bar
    const searched = (keyword) => (s) => s.name.toLowerCase().includes(keyword)


    return (
        <div className='relative max-w-screen-xl mx-auto flex justify-between items-center mt-4'>

            <div className='flex flex-row '>
                <AdminNav />
                <div className='flex flex-col space-y-4'>
                    <h4 className='text-xl'>Sub Category</h4>

                    <div>
                        <label>Category</label>
                        <select className=''
                            name='category'
                            onChange={e => setCategory(e.target.value)}>
                            <option>Please select</option>
                            {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                        </select>
                    </div>
                    {JSON.stringify(category)}

                    <div>
                        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} placeholder={"Nouvelle categorie"} enterButton={'Ajouter'} />
                    </div>
                    <hr />


                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

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
                            
                                {subs.filter(searched(keyword)).map((s) => (
                                    <tr class="bg-white border-b ">

                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {s.name}
                                    </th>


                                    <td class="px-6 py-4">
                                        <div className='space-x-4'>
                                            <button onClick={() => handleRemove(s.slug)}>
                                                Delete
                                            </button>{''}

                                            <button><Link to={`/admin/sub/${s.slug}`}>Edit</Link></button>
                                        </div>
                                    </td>

                                </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SubCreate