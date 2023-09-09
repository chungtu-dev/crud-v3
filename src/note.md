explain choose province, district, ward:
    set Provice, District, Ward List = []
    set province, district id = '' (empty string)

func call api get district following ProvinceID
    -> get district of that province

func call api get ward following DistrictID
    -> get ward of that district