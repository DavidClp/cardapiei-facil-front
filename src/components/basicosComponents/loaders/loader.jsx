import './loader.scss'
const Loader = () => {
  return (
    <div className='flex items-center justify-center h-[80vh] flex-col gap-4'>
        <span class="loaderCoffe"></span>
        <span class="loader">Carregando</span>
    </div>
  )
}

export default Loader