import Cookies from 'js-cookie'
const TokenKey='User-Token'
const NameKey='User-Name'
const ImageKey='User-Image'
const PhoneKey='User-Phone'
const GenderKey='User-Gender'
const DateKey='User-Date'
export default{
    setUser(token,name,image,phone,gender,date){
        Cookies.set(TokenKey,token)
        Cookies.set(NameKey,name)
        Cookies.set(ImageKey,image)
        Cookies.set(PhoneKey,phone)
        Cookies.set(GenderKey,gender)
        Cookies.set(DateKey,date)
    },
    getUser(){
        return {
            token: Cookies.get(TokenKey),
            name: Cookies.get(NameKey),
            image: Cookies.get(ImageKey),
            phone: Cookies.get(PhoneKey),
            gender: Cookies.get(GenderKey),
            date: Cookies.get(DateKey)
        } 
    },
    removeUser(){
        Cookies.remove(TokenKey)
        Cookies.remove(NameKey)
        Cookies.remove(ImageKey)
        Cookies.remove(PhoneKey)
        Cookies.remove(GenderKey)
        Cookies.remove(DateKey)
    }
}