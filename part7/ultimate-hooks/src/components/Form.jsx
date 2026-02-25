export const Form = ({ name, handleSubmit, inputFields }) => {
    return (
        <div>
        <h2> {name} </h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
        {inputFields.map((ip, i) => <input key = {i} {...ip} />)}
        <button>create</button>
        </div>
      </form>
        </div>
    )
}