import {useLazyQuery} from '@apollo/client';
import { GET_TRIP_USER_BY_EMAIL } from '../../../TestingDatabase/GraphQL/queries';


function Get_User(user) {
    console.log(user)
    const [get_user, {loading: user_loading, error: user_error, data: user_data}] = useLazyQuery(GET_TRIP_USER_BY_EMAIL, {variables: {email: user.email}})
    return user_data
  }

  export {Get_User}