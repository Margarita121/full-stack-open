const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGood = {...state}
      newGood.good +=1
      return newGood
    case 'OK':
      const newOk = {...state}
      newOk.ok +=1
      return newOk
    case 'BAD':
      const newBad = {...state}
      newBad.bad +=1
      return newBad
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
