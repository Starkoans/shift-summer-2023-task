import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function SelectPayerSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // mode: 'onChange',
    // defaultValues:{
    //
    // }
  } = useForm();

  const payer = useSelector(state => state.newDelivery.payer);

  return (
    <form>
      <label>Кто оплачивает доставку:</label>
      <label htmlFor="sender">
        <input
          {...register('Select payer')}
          type="radio"
          value="SENDER"
          id="sender"
        />
        Отправитель
      </label>
      <label htmlFor="receiver">
        <input
          {...register('Select payer')}
          type="radio"
          value="RECEIVER"
          id="receiver"
        />
        Получатель
      </label>
    </form>
  );
}
export default SelectPayerSection;
