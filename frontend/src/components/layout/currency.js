// currency conversion

const currency = (location, exRate) => {

    let data = location;
    let country = 'Lesotho';
    for(let item in data){
        if(item === "country"){
            
           country = data[item];
        }
    }
    if (country === 'Nigeria') {
        exRate = 414.48;
        return '₦'
    } else if (country === 'Ghana') {
        exRate = 7.51;
        return '₵'
    }else if (country === 'Lesotho') {
        exRate = 17;
        return 'M'
    }else if (country === 'South Africa') {
        exRate = 16;
        return 'R'
    }else {
        return '$'
    }   
}
export default currency