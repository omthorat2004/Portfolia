
const Register = () => {

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
        <form onSubmit={handleSubmit}>
            
        </form>
    </div>
  );
}

export default Register;
