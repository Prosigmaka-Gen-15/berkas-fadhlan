export default function ProdukItem({ text, image, price }) {
	return <div key={text} className='mb-5 w-auto'>
		<img src={image} className='h-48 object-cover cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out' alt={text} />
		<div className='text-center'>
			<h4 className='text-2xl font-bold mb-2 cursor-pointer'>{text}</h4>
			<p className='text-lg mb-2'>{price}</p>
			<button className='text-black px-2 py-1 rounded-md hover:bg-black hover:text-white border border-black transition duration-100 mr-2'>
				Tambah
			</button>
		</div>
	</div>
}