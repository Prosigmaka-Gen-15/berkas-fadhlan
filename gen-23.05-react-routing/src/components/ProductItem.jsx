import { Link, useNavigate } from 'react-router-dom';

export default function ProductItem({ text, image, price }) {
  const navigate = useNavigate();

  const handleDetail = () => {
    console.log({ text });
    navigate(`/${text}`);
  };

  return (
    <div key={text} className='mb-5 md:w-auto w-full'>
      <img
        src={image}
        className='h-48 md:w-auto w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
        alt={text}
        onClick={handleDetail}
      />
      <div className='text-center'>
        <Link
          to={`/${text}`}
          className='text-2xl font-bold mb-2 cursor-pointer hover:scale-110 transition-all duration-200 ease-in hover:bg-yellow-400 rounded'
        >
          {text}
        </Link>
        <p className='text-lg mb-2'>{price}</p>
        <button
          className='text-black px-2 py-1 rounded-md hover:bg-black hover:text-white border border-black transition duration-100 mr-2'
          onClick={handleDetail}
        >
          Detail
        </button>
      </div>
    </div>
  );
}
