export default function ValidatedInput({
  name,
  label,
  register,
  errors,
  required,
  type,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  setValue,
  defaultValue,
}) {
  let patternCheck = false;
  switch (pattern) {
    case 'tel':
      patternCheck = /[0-9]/;
      break;
    case 'onlyText':
      patternCheck = /[A-Za-zА-Яа-я]/;
      break;
    case 'email':
      patternCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      break;
    default:
      patternCheck = pattern;
      break;
  }

  const validationSchema = {
    required: {
      value: required,
      message: 'Поле обязательно к заполнению.',
    },
    minLength: {
      value: minLength,
      message: 'Слишком мало символов.',
    },
    min: {
      value: min,
      message: 'Слишком маленькое значение.',
    },
    max: {
      value: max,
      message: 'Слишком большое значение.',
    },
    maxLength: {
      value: maxLength,
      message: 'Слишком много символов.',
    },
    pattern: {
      value: patternCheck,
      message: 'Некорректный ввод.',
    },
  };
  const handleTelInputChange = value => {
    setValue(name, value.replace(/[^0-9]/g, ''));
  };

  return (
    <div className="form-control-input flex flex-col m-2">
      {type === 'text' && (
        <input
          className="p-2"
          defaultValue={defaultValue}
          placeholder={required ? label + '*' : label}
          id={name}
          name={name}
          type={type}
          {...register(name, validationSchema)}
        />
      )}
      {type === 'tel' && (
        <input
          className="p-2"
          defaultValue={defaultValue}
          placeholder={required ? label + '*' : label}
          id={name}
          name={name}
          type={type}
          {...register(name, {
            onChange: e => handleTelInputChange(e.target.value),
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
          })}
        />
      )}
      {type === 'textarea' && (
        <textarea
          className="p-2"
          defaultValue={defaultValue}
          placeholder={required ? label + '*' : label}
          id={name}
          name={name}
          type={type}
          {...register(name, validationSchema)}
        />
      )}

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
      {errors && errors[name]?.type === 'min' && (
        <span className={'text-red-500 text-sm'}>{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === 'max' && (
        <span className={'text-red-500 text-sm'}>{errors[name]?.message}</span>
      )}
    </div>
  );
}
