import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DemoCallApiAxios = () => {
    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])

    const [provinceid, setProvinceid] = useState('');
    const [districtid, setDistrictId] = useState('');

    const [selectProvince, setSelectProvince] = useState('');
    const [selectDistrict, setSelectDistrict] = useState('');

    /* #region: Province */
    useEffect(() => {
        const fetchDataProvinces = () => {
            axios.get('https://vapi.vnappmob.com/api/province')
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
                        // console.log(data.results);
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
    /* #endregion */

    const handleSubmit = (e) => {
        e.preventDefault()
        const filterProvince = provinceList.filter((i) => i.province_id === selectProvince)
        const nameProvice = Object.assign({}, ...filterProvince)
        // console.log('Province name',nameProvice.province_name);

        const filterDistrict = districtList.filter((i) => i.district_id === selectDistrict)
        const nameDistrict = Object.assign({}, ...filterDistrict)
        // console.log('Province name',nameDistrict.district_name);

        const filterWard = wardList.filter((i) => i.district_id === nameDistrict.district_id)
        const nameWard = Object.assign({}, ...filterWard)
        // console.log('Province name',nameWard.ward_name);

        const fullAddress = nameProvice.province_name + ',' + nameDistrict.district_name + ',' + nameWard.ward_name
        console.log('full address', fullAddress);

        // const empData = {selectProvince}
        // fetch('http://localhost:8000/employee',{
        //     method: 'POST',
        //     headers:{"content-type":"application/json"},
        //     body: JSON.stringify(empData)
        // }).then((res)=>{
        //     console.log({empData});
        // })
        // .catch((err) =>{
        //     console.log(err.message);
        // })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Chọn thông tin địa chỉ</h3>

                    <select name="country" className="form-control p-2" onChange={(e) => handlecountry(e)}>
                        <option value="">--Select Province--</option>
                        {
                            provinceList.map((i) => (
                                <option key={i.province_id} value={i.province_id} >{i.province_name}</option>
                            ))
                        }
                    </select>


                    <select name="district" className="form-control p-2" onChange={(e) => handleDistrict(e)} >
                        <option value="">--Select District--</option>
                        {
                            districtList.map((i) => (
                                <option key={i.district_id} value={i.district_id}>{i.district_name}</option>
                            ))
                        }
                    </select>

                    <select name="ward" className="form-control p-2">
                        <option value="">--Select Ward--</option>
                        {
                            wardList.map((i) => (
                                <option key={i.ward_id} value={i.ward_id}>{i.ward_name} </option>
                            ))
                        }
                    </select>
                    <button type="submit" className="btn btn-success">Log</button>
                </div>
            </form>
        </>
    )
}

export default DemoCallApiAxios

// https://stackoverflow.com/questions/72514134/i-want-show-data-in-dropdown-using-api-in-react-js-using-axios
// https://github.com/devopsdeveloper1107/React-practical/blob/main/select%20country%20state%20and%20city%20react%20js