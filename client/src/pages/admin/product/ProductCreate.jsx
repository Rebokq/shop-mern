import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'

const initalState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'White', 'Red', 'Blue'],
  brands: ['Nike', 'Adidas', 'Tovio'],
  color: '',
  brand: '',
};


const ProductCreate = () => {
  const [values, setValues] = useState(initalState)
  const { user } = useSelector((state) => ({ ...state }))
  const [subOptions, setSubOptions] = useState([])
  const [showSub, setShowSub] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCategories()
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setValues({ ...values, categories: c.data }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err)
        /* if (err.response.status === 400) toast.error(err.response.data) */
        toast.error(err.response.data.err)
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, '----', e.target.value)
  }

  const handleCategoryChange = (e) => {
    e.preventDefault()
    console.log('CLICKED CATEGORY', e.target.value)
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value)
      .then((res) => {
        console.log('SUB OPTION', res)
        setSubOptions(res.data)
      });
    setShowSub(true)

  }

  return (
    <div className='relative max-w-screen-xl mx-auto flex justify-between items-center mt-4'>

      <div className='flex flex-row '>
        <AdminNav />
        <div className='flex flex-col space-y-4'>
          <h4 className='text-xl'>Product create</h4>
          <hr />
          {JSON.stringify(values.images)}
 
          <div className='flex flex-col'>
            <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
            <div>
              {loading ? (<LoadingOutlined />) : ''}
            </div>
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub} />
          {/* <FormProduct /> */}
        </div>
      </div>



    </div>
  )
}

export default ProductCreate