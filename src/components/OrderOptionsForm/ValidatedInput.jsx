export default function ValidatedInput({
  name,
  label,
  register,
  errors,
  required,
  type,
  minLength,
  maxLength,
  pattern,
  defaultValue,
}) {
  const validationSchema = {
    required: {
      value: required,
      message: 'Поле обязательно к заполнению.',
    },
    minLength: {
      value: minLength,
      message: 'Слишком мало символов.',
    },
    maxLength: {
      value: maxLength,
      message: 'Слишком много символов.',
    },
    pattern: {
      value: pattern,
      message: 'Некорректный ввод.',
    },
  };

  return (
    <div className="form-control-input flex flex-col w-1/2 m-2">
      {type === 'text' ? (
        <input
          className="p-2 rounded-md"
          defaultValue={defaultValue}
          placeholder={required ? label + '*' : label}
          id={name}
          name={name}
          type={type}
          {...register(name, validationSchema)}
        />
      ) : null}
      {type === 'textarea' ? (
        <textarea
          className="p-2"
          defaultValue={defaultValue}
          placeholder={required ? label + '*' : label}
          id={name}
          name={name}
          type={type}
          {...register(name, validationSchema)}
        />
      ) : null}

      {errors && errors[name]?.type === 'required' && (
        <span className={'text-red-500 text-sm'}>{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === 'minLength' && (
        <span className={'text-red-500 text-sm'}>{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === 'maxLength' && (
        <span className={'text-red-500 text-sm'}>{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === 'pattern' && (
        <span className={'text-red-500 text-sm'}>{errors[name]?.message}</span>
      )}
    </div>
  );
}
