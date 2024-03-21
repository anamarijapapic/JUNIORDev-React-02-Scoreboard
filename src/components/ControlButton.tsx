const ControlButton = (props: { action: () => void; text: string }) => {
  function handleClick() {
    props.action();
  }

  return (
    <>
      <button onClick={handleClick}>{props.text}</button>
    </>
  );
};

export default ControlButton;
