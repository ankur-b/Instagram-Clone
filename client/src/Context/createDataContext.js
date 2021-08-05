import React, { useReducer } from "react";
// eslint-disable-next-line import/no-anonymous-default-export
export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const boundActions = {};
    for (let action in actions) {
      boundActions[action] = actions[action](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return {Provider,Context}
};
