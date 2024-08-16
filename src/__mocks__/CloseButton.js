// __mocks__/CloseButton.js
const React = require('react');

const createCloseButton = (renderCountCb) => function CloseButtonWithRenderCount({onClose}) {
  const renderCount = React.useRef(0);

  React.useEffect(() => {
    renderCount.current += 1;
    global.renderCountArgs?.push([renderCount.current]);
    renderCountCb(renderCount.current);
  });

  return (
    <button
      onClick={onClose}
      className="block ml-auto bg-red-500 text-white px-2 py-1 rounded"
    >
      Close
    </button>
  );
};

module.exports = createCloseButton;
