import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserStateContext, LoaderContext } from "../context";

export default function useSubmit(inputRefArr) {
  const [errorMessage, setErrorMessage] = useState(null);

  const { setUser } = useContext(UserStateContext);
  const { showLoader, setShowLoader } = useContext(LoaderContext);
  const navigate = useNavigate();

  const submitCheck = (e, emptyErrorMsg) => {
    e.preventDefault();
    if (errorMessage) setErrorMessage(null);

    const emptyInput = inputRefArr.find((inputRef) => !inputRef.current.value);
    if (emptyInput) {
      emptyInput.current.focus();
      setErrorMessage(`${emptyErrorMsg}`);
      return false;
    }

    const refValueArr = inputRefArr.map((inputRef) => inputRef.current.value);
    return refValueArr;
  };

  return {
    errorMessage,
    setErrorMessage,
    setUser,
    showLoader,
    setShowLoader,
    navigate,
    submitCheck,
  };
}
