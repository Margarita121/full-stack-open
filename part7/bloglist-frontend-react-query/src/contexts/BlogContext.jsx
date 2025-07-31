// /* eslint-disable react/prop-types */
// import { createContext, useReducer, useContext } from 'react'

// const blogReducer = (state, action) => {
//   switch (action.type) {
//     case "SET":
//         return action.payload
//     case "APPEND":
//         state.push(action.payload)
//         return state
//     case "REMOVE":
//         return null
//     default:
//         return state
//   }
// }

// const BlogContext = createContext()

// export const BlogContextProvider = (props) => {
//   const [blog, blogDispatch] = useReducer(blogReducer, null)

//   return (
//     <BlogContext.Provider value={[blog, blogDispatch] }>
//       {props.children}
//     </BlogContext.Provider>
//   )
// }

// export const useBlogValue = () => {
//   const blogAndDispatch = useContext(BlogContext)
//   return blogAndDispatch[0]
// }

// export const useBlogDispatch = () => {
//   const blogAndDispatch = useContext(BlogContext)
//   return blogAndDispatch[1]
// }

// export default BlogContext