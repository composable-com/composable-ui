import { CommerceService } from '@composable/types'
import users from '../../data/users.json'

export const createUser: CommerceService['createUser'] = async ({
  email,
  firstName,
  lastName,
  password,
}) => {
  return users[0]
}
