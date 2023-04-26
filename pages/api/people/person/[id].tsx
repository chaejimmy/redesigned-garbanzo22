//This file will accept the response for specific individuals

import { useRouter } from 'next/router'
import type { Person } from '../../../../interfaces'

export default function PersonPage({ person }: { person: Person }) {
  const { name, height, mass, hair_color, skin_color, eye_color, gender } =
    person
  const { isFallback } = useRouter()

  if (isFallback) return <div>Loading...</div>

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair color</th>
          <th>Skin color</th>
          <th>Eye color</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{height}</td>
          <td>{mass}</td>
          <td>{hair_color}</td>
          <td>{skin_color}</td>
          <td>{eye_color}</td>
          <td>{gender}</td>
        </tr>
      </tbody>
    </table>
  )
}
