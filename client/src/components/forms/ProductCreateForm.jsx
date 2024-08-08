import React from 'react'
import { Select, Space } from 'antd';

const { Option } = Select
const ProductCreateForm = ({ handleSubmit, handleChange, values, setValues, handleCategoryChange, subOptions, showSub }) => {

    //destructure
    const { title, description, price, categories, category, subs, shipping, quantity, images, colors, brands, color, brand } = values;

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-2">
                <div className='flex flex-col'>
                    <label>Title</label>
                    <input
                        className='border-b-1 border-t-0 border-x-0'
                        type="text"
                        name='title'
                        value={title}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col'>
                    <label>Description</label>
                    <input
                        type="text"
                        name='description'
                        value={description}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col'>
                    <label>Prix</label>
                    <input
                        type="number"
                        name='price'
                        value={price}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col'>
                    <label>Livraison</label>
                    <select name='shipping' onChange={handleChange}>
                        <option>Select</option>
                        <option value='Yes'>Oui</option>
                        <option value='No'>Non</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Quantité</label>
                    <input
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col'>
                    <label>Couleur</label>
                    <select name='color' onChange={handleChange}>
                        <option>Selectionne</option>
                        {colors.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col'>
                    <label>Brand</label>
                    <select name='brand' onChange={handleChange}>
                        <option>Select</option>
                        {brands.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Category</label>
                    <select className=''
                        name='category'
                        onChange={handleCategoryChange}>
                        <option>Please select</option>
                        {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                    </select>
                </div>

                {showSub && <div>
                    <label>Sub Categories</label>
                    <Select mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select"
                        value={subs}
                        onChange={(value) => setValues({ ...values, subs: value })}
                    >
                        {subOptions.length && subOptions.map((s) => (
                            <Option key={s._id} value={s._id}> {s.name}</Option>
                        ))}


                    </Select>
                </div>}

                <button>SAVE</button>
            </form>
        </div>
    )
}

export default ProductCreateForm