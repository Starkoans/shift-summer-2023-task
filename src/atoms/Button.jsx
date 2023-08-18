import classNames from 'classnames';

export default function Button({ child, cn, type, handleClick }) {
  return (
    <button
      onClick={handleClick}
      type={type}
      className={classNames(
        'py-3 px-5 rounded-3xl transition ease-in-out duration-300 text-white bg-opacity-100',
        cn === 'secondary' ? 'bg-purple-700 hover:bg-purple-600' : null,
        cn === 'primary' ? 'bg-black hover:bg-purple-900' : null,
        cn === 'outlined'
          ? 'text-black border-2 border-black bg-opacity-100'
          : null,
        cn === 'alert' ? 'text-white bg-red-600' : null
      )}
    >
      {child}
    </button>
  );
}
