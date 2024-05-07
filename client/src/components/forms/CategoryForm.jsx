import React from 'react'
import { Input } from 'antd'
const { Search } = Input

const CategoryForm = ({handleSubmit, name, setName, placeholder, enterButton}) => {
    return (
        <div >
            <div>
                <Search
                    placeholder={placeholder}
                    allowClear
                    enterButton={enterButton}
                    size="large"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    onSearch={handleSubmit}
                />

            </div>
        </div>
    )
}

export default CategoryForm