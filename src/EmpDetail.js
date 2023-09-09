import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EmpDetail = () => {
    const [empData, setEmpData] = useState({})
    const {empid} = useParams()
    
    useEffect(() => {
        fetch("http://localhost:8000/employee/"+empid).then((res) => {
            return res.json();
        }).then((res) => {
            setEmpData(res);
            console.log(empData);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
  return (
    <div>
        <div className="card" style={{textAlign:'left'}}>
            <div className="card-title">
                <h2>Emp Detail</h2>
            </div>
            <div className="card-body"></div>
            {
            empData && 
            <div>
                <h2>Name of emp: {empData.name} {empData.id}</h2>
                <h3>Contact details:</h3>
                <h5>Email: {empData.email}</h5>
                <h5>Phone: {empData.phone}</h5>
                <h5>Gender: {empData.gender}</h5>
                <h5>Province: {empData.selectProvince}</h5>
                <h5>District: {empData.selectDistrict}</h5>
                <h5>Ward: {empData.selectWard}</h5>
                <Link className='btn btn-danger' to='/'>Back to listing</Link>
            </div>
        }
        </div>
    </div>
  )
}

export default EmpDetail