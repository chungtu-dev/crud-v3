import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const EnumTypeGender = {
    male: 'nam',
    female: 'nu',
    other: 'khac',
}

const EmpCreate = () => {

    const [id, setIdChange] = useState('')
    const [name, setNameChange] = useState('')
    const [email, setEmailChange] = useState('')
    const [phone, setPhoneChange] = useState('')
    const [active, setActiveChange] = useState(true)

    const [gender, setGender] = useState("Male");

    const [validation, setValidationChange] = useState(false)

    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])

    const [provinceid, setProvinceid] = useState('');
    const [districtid, setDistrictId] = useState('');

    const [selectProvince, setSelectProvince] = useState('');
    const [selectDistrict, setSelectDistrict] = useState('');
    // const [selectWard, setSelectWard] = useState('');

    const navigate = useNavigate();

    /* #region: Province */
    useEffect(() => {
        const fetchDataProvinces = () => {
            axios.get('https://vapi.vnappmob.com/api/province/')
                .then((res) => {
                    const { data } = res;
                    if (res.status === 200) {
                        setProvinceList(data.results)
                        // console.log(data.results);
                    }
                    else {
                        console.log('error')
                    }
                }).catch((err) => {
                    console.log('error-catch', err)
                })
        }
        fetchDataProvinces()
    }, []);

    const handlecountry = (e) => {
        const getcountryid = e.target.value;
        setSelectProvince(e.target.value)
        setProvinceid(getcountryid);
    }
    /* #endregion */

    /* #region: District */
    useEffect(() => {
        const fetchDataDistrict = () => {
            axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceid}`)
                .then((res) => {
                    const { data } = res;
                    if (res.status === 200) {
                        setDistrictList(data.results)
                    }
                    else {
                        console.log('error')
                    }
                }).catch((err) => {
                    console.log('error-catch', err)
                })
        }
        fetchDataDistrict()
    }, [provinceid])

    const handleDistrict = (e) => {
        const getstateid = e.target.value;
        setSelectDistrict(e.target.value)
        setDistrictId(getstateid);
    }
    /* #endregion */

    /* #region: Ward */
    useEffect(() => {
        const fetchDataWard = () => {
            axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtid}`)
                .then((res) => {
                    const { data } = res;
                    if (res.status === 200) {
                        setWardList(data.results)
                        console.log(data.results);
                    }
                    else {
                        console.log('error')
                    }
                }).catch((err) => {
                    console.log('error-catch', err)
                })
        }
        fetchDataWard()
    }, [districtid])

    // const handleWard = (e) => {
    //     setSelectWard(e.target.value)
    // }
    /* #endregion */

    const handleSubmit = (e) => {
        e.preventDefault()

        const filterProvince = provinceList.filter((i) => i.province_id === selectProvince)
        const nameProvice = Object.assign({}, ...filterProvince)

        const filterDistrict = districtList.filter((i) => i.district_id === selectDistrict)
        const nameDistrict = Object.assign({}, ...filterDistrict)

        const filterWard = wardList.filter((i) => i.district_id === nameDistrict.district_id)
        const nameWard = Object.assign({}, ...filterWard)

        const fullAddress = nameProvice.province_name + ',' + nameDistrict.district_name + ',' + nameWard.ward_name
        console.log('full address', fullAddress);

        console.log({ id, name, email, phone, active, gender, selectProvince: nameProvice.province_name, selectDistrict: nameDistrict.district_name, selectWard: nameWard.ward_name })

        const empData = { id, name, email, phone, active, gender, selectProvince: nameProvice.province_name, selectDistrict: nameDistrict.district_name, selectWard: nameWard.ward_name }

        console.log(empData);

        fetch("http://localhost:8000/employee", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empData)
        }).then((res) => {
            alert('Saved successfully')
            navigate('/')
        }).catch((err) => {
            console.log(err.message);
        })
    }

    const handleChangeGender = (e) => {
        setGender(e.target.value);
        // console.log(e.target.value);
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: 'left' }}>
                            <div className="card-title">
                                <h2>Emp Create</h2>
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
                                            <div className="form-check">
                                                <div onChange={handleChangeGender}>
                                                    <input readOnly type="radio" value="Male" name="gender" checked={gender === "Male"} /> Male
                                                    <input readOnly type="radio" value="Female" name="gender" checked={gender === "Female"} /> Female
                                                    <input readOnly type="radio" value="Other" name="gender" checked={gender === "Other"} /> Other
                                                </div>
                                            </div>
                                        </div>


                                        <div>
                                            <h3>Chọn thông tin địa chỉ</h3>

                                            <select name="country" className="form-control p-2" onChange={(e) => handlecountry(e)}>
                                                <option value="">--Select Province--</option>
                                                {
                                                    provinceList.map((i) => (
                                                        <option key={i.province_id} value={i.province_id}>{i.province_name} </option>
                                                    ))
                                                }
                                            </select>


                                            <select name="district" className="form-control p-2" onChange={(e) => handleDistrict(e)} >
                                                <option value="">--Select District--</option>
                                                {
                                                    districtList.map((i) => (
                                                        <option key={i.district_id} value={i.district_id}>{i.district_name} </option>
                                                    ))
                                                }
                                            </select>

                                            <select name="ward" className="form-control p-2" >
                                                <option value="">--Select Ward--</option>
                                                {
                                                    wardList.map((i) => (
                                                        <option key={i.ward_id} value={i.ward_id}>{i.ward_name} </option>
                                                    ))
                                                }
                                            </select>
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

export default EmpCreate