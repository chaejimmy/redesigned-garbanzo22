import {NextApiResponse, NextApiRequest} from 'next'
import { Person } from '../../../interfaces'
import { people } from '../../../data/data'

export default function handler(
    _req : NextApiRequest,
    
    res : NextApiResponse<Person[]>
){
        return res.status(200).json(people)
    
}