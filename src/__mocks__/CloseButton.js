// __mocks__/CloseButton.js
const React = require('react');

const RenderCBContext = React.createContext(() => {
});

function CloseButtonWithRenderCount({onClose}) {
  const renderCount = React.useRef(0);
  const renderCb = React.useContext(RenderCBContext);

  React.useEffect(() => {
    renderCount.current += 1;
    renderCb(renderCount.current);
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

module.exports = CloseButtonWithRenderCount;
module.exports.RenderCBContextProvider = RenderCBContext.Provider;
