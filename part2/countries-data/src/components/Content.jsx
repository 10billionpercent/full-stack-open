import Country from "./Country"

const Content = ({contentData, type, searchHandler}) => {
const length = contentData.length
if (type === '' ) return
if (type === 'array')  {
    if (length === 0) {
    return <p> No matches found </p>
}
   else if (length > 10) {
          return <p> Too many matches, specify another filter </p>
}
else if (length > 1 && length < 10) {
     return (
        contentData.map((c,i) => <li key = {i}> {c} 
        <button onClick={() => searchHandler(c)}> Show </button></li>)) 
}
}

else {      
         return <Country country={contentData}/>
        }
    }
export default Content

