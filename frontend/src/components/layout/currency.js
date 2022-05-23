// currency conversion
const currency = (location, exRate) => {
    

        if (location.user.country === 'Nigeria') {
            exRate = 414.48;
            return '₦'
        } else if (location.user.country === 'Ghana') {
            return '₵'
        }else if (location.user.country === 'Lesotho') {
            exRate = 16;
            return 'M'
        }else if (location.user.country === 'South Africa') {
            exRate = 16;
            return 'R'
        }else {
            return '$'
        }   
 
}

export default currency