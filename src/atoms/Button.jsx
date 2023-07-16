export default function Button({ text, type }) {
  let style;
  if (type === 'submit') {
    style =
      'transition ease-in-out duration-300 bg-purple-900 text-purple-300 py-3 px-5 m-2  rounded-3xl ' +
      'hover:bg-purple-500 text-white py-3 px-5 m-2  rounded-3xl ';
  }
  if (type === 'login') {
    style =
      'transition ease-in-out duration-300 bg-black text-white px-5 py-3  rounded-3xl' +
      'hover:bg-violet-500 text-white px-5 py-3   rounded-3xl';
  }

  return <button className={style}>{text}</button>;
}
