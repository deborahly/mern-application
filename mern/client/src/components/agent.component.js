import { Link } from 'react-router-dom';

export default function Agent(props) {
  return (
    <tr>
      <td>{props.agent.firstName}</td>
      <td>{props.agent.lastName}</td>
      <td>{props.agent.email}</td>
      <td>{props.agent.phone}</td>
      <td>{props.agent.rating}</td>
      <td>{props.agent.fee}</td>
      <td>{props.agent.sales}</td>
      <td>{props.agent.region}</td>
      <td>
        <Link className='btn btn-link' to={`/edit/${props.agent._id}`}>
          Edit
        </Link>{' '}
        |
        <button
          className='btn btn-link'
          onClick={() => {
            props.deleteAgent(props.agent._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
