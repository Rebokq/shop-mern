import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)

        }, 1000)
        //redirect once count = 0
        count === 0 && navigate('/')
        return() => clearInterval(interval)

    }, [count])

    return(
        <div className="">
            <p>Redirecting you in {count} seconds </p>
        </div>
    )
}

export default LoadingToRedirect


