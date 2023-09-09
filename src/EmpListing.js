import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DemoCallApiAxios from './DemoCallApiAxios'

const EmpListing = () => {

    const [empData, setEmpDataChange] = useState(null)
    const navigate = useNavigate()

    const loadDetail = (id) => {
        navigate('/employee/detail/' + id)
    }

    const loadEdit = (id) => {
        navigate('/employee/edit/' + id)
    }

    const removeFunc = (id) => {
        if (window.confirm('Are you sure you want to remove this?')) {
            fetch("http://localhost:8000/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                // alert('Delete successfully')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/employee").then((res) => {
            return res.json();
        }).then((res) => {
            setEmpDataChange(res);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className='card'>
                <div className='card-title'>
                    <h2>Employee List</h2>
                </div>
                <div className='card-body'>
                    <div className='divbtn'>
                        <Link to='employee/create' className='btn btn-success'>Add</Link>
                    </div>
                    <table className='table table-bordered'>
                        <thead className='bg-dark text-white'>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Mail</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empData &&
                                empData.map(i => (
                                    <tr key={i.id}>
                                        <td>{i.id}</td>
                                        <td>{i.name}</td>
                                        <td>{i.email}</td>
                                        <td>{i.phone}</td>
                                        <td>
                                            <a onClick={() => loadEdit(i.id)} className='btn btn-success'>Edit</a>
                                            <a onClick={() => removeFunc(i.id)} className='btn btn-danger'>Remove</a>
                                            <a onClick={() => loadDetail(i.id)} className='btn btn-primary'>Details</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card" style={{marginTop:'10px'}}>
                <DemoCallApiAxios/>
            </div>
        </div>
    )
}

export default EmpListing