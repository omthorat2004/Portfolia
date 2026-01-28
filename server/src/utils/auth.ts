
import {sign} from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string;
export const generateToken = (id: string)=>{
    return sign({id},JWT_SECRET,{expiresIn:'3d'})
}