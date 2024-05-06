import LoadimgImg from "../assets/Loading.gif"
const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <img src={LoadimgImg} alt="loading" className="h-80 object-cover" />
    </div>
  )
}

export default Loading
