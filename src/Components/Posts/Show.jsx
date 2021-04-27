import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Header from "../Header/Header";


const Show = () => {
    const params = useParams()
    const [datas, setDatas] = useState([{}])
    useEffect(() => {
        if (datas.length === 1) {
            axios.get('https://localhost:8000/api/articles/' + params.id)
                .then(res => {
                    setDatas(res.data)
                }).catch(error => { })
        }
    });
    return (
        <div>
            <Header />
            <div className="container">
                <div className="p-5 w-75 m-auto">
                    <h1 className="text-center mb-4">Article {datas.title}</h1>
                    <p>{datas.title}</p>
                    <p className="text-center"> <img src={datas.image} alt="" style={{ width: "100%" }} /> </p>
                    <p className="mb-4">{datas.description}</p>
                    <p>{datas.content}</p>
                </div>

            </div>
        </div>

    )

}
export default Show;