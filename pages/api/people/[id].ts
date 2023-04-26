import { NextApiRequest, NextApiResponse } from 'next'
import { people } from '../../../data/data'
import type { Person, ResponseError } from '../../../interfaces'

// If person exsits with id of req object then return person details 

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Person | ResponseError>
) 
{
  //store the requested body in query and then find the id of person in people's data
  const { query } = req
  console.log(query)
  //now extarct id of requested person from query object
  const { id } = query
  const person = people.find((p) => p.id === id)

  // User with id exists
  return person
    ? res.status(200).json(person)
    : res.status(404).json({ message: `User with id: ${id} not found.` })
} 