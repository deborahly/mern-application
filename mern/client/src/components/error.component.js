import { useParams } from 'react-router';

export default function Error() {
  const params = useParams();

  return (
    <div className='container d-flex flex-column align-items-center'>
      <h3 className='py-2'>Something went wrong 😟</h3>
      <h5 className='py-2'>{params.message}</h5>
    </div>
  );
}
