
const GET_ONE = 'common/GET_ONE'

export default (state={}, action) => {
  switch(action.type) {
    case GET_ONE:
      return {
        ...state,
        one: 'sadasd'
      }
    default:
      return state
  }
}

export const getOne = () => {
  return {
    type: GET_ONE
  }
}