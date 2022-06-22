// currency conversion

const currency = (location) => {

    let data = location;
    let exRate = 1,
        symbol = '$';

    let country = 'Lesotho';    

    for(let item in data){
        if(item === "country"){
            
           country = data[item];
        }
    }
    if (country === 'Nigeria') {
        exRate = 414.48;
        symbol = '₦'
        
        return {symbol , exRate}
    } else if (country === 'Ghana') {
        exRate = 7.51;
        symbol = '₵'
        return {symbol , exRate}

    }else if (country === 'Lesotho') {
        exRate = 17;
        symbol = 'M'
        return {symbol , exRate}

    }else if (country === 'South Africa') {
        exRate = 16;
        symbol = 'R'
        return {symbol , exRate}
    }else {
        return {symbol , exRate}
    }   
}
export default currency