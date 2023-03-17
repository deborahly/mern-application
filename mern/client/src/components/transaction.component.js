export default function Transaction(props) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const dateFormatter = date => {
    date = new Date(date);
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <tr>
      <td>{dateFormatter(props.transaction.date)}</td>
      <td>{formatter.format(props.transaction.amount)}</td>
      <td>
        {props.agent.firstName} {props.agent.lastName}
      </td>
    </tr>
  );
}
