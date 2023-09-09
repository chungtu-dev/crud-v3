import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EmpEdit = () => {
    // const [empData, setEmpData] = useState({})
    const { empid } = useParams()
    
    const [id, setIdChange] = useState('')
    const [name, setNameChange] = useState('')
    const [email, setEmailChange] = useState('')
    const [phone, setPhoneChange] = useState('')
    const [active, setActiveChange] = useState(true)
    const [validation, setValidationChange] = useState(false)

    const navigate=useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((res) => {
            setIdChange(res.id);
            setNameChange(res.name);
            setEmailChange(res.email)
            setPhoneChange(res.phone)
            setActiveChange(res.isactive)
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log({id, name, email, phone, active})

        const empData = {id, name, email, phone, active}

        fetch("http://localhost:8000/employee/"+empid,{
            method: "PUT",
            headers:{"content-type": "application/json"},
            body: JSON.stringify(empData)
        }).then((res)=>{
            alert('Updated successfully')
            navigate('/')
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: 'left' }}>
                            <div className="card-title">
                                <h2>Emp Edit</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>ID</label>
                                                <input value={id} disabled="disabled" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input value={name} onMouseDown={e => setValidationChange(true)} onChange={e => setNameChange(e.target.value)} className="form-control" />
                                                {name.length === 0 && validation && <span className='text-danger'>Enter the name</span>}
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input value={email} onChange={e => setEmailChange(e.target.value)} className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input value={phone} onChange={e => setPhoneChange(e.target.value)} className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-check">
                                                <input checked={active} onChange={e => setActiveChange(e.target.checked)} type='checkbox' className='form-check-input' />
                                                <label className="form-check-label">Is Active</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-success">Save</button>
                                                <Link to="/" className="btn btn-danger">Back</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmpEdit