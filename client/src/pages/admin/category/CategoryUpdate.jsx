import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

import CategoryForm from '../../../components/forms/CategoryForm'



const CategoryUpdate = () => {
    let navigate = useNavigate()
    let { slug } = useParams()
    const { user } = useSelector((state) => ({ ...state }))

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        loadCategory()
        console.log(slug)
    }, [])

    const loadCategory = () => getCategory(slug).then((c) => setName(c.data.name))

    const handleSubmit = (e) => {
        setLoading(true)
        updateCategory(slug, { name }, user.token)
            .then(res => {
                console.log(res)

                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is updated`)
                navigate('/admin/category')
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
                    <h4 className='text-xl'>Category Update</h4>
                    <div>
                        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} placeholder={"Modifier categorie"} enterButton={'Modifier'}/>
                    </div>
                    <hr />

                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left ">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Categories
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

export default CategoryUpdate