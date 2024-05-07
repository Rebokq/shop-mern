import React from 'react'

const LocalSearch = ({keyword, setKeyword}) => {

    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())

    }
    return (
        <div className='py-4'>
            <input type='search'
                placeholder='Filtre'
                value={keyword}
                onChange={handleSearchChange}>

            </input>
        </div>
    )
}

export default LocalSearch