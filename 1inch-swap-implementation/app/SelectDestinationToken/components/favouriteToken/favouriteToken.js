import './styles.css'
export const FavouriteToken = ({ name }) => {
  return <div className='favouriteToken'>
    <img src='https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png' />
    <p>{name}</p>
  </div>
}