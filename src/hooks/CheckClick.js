import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserAction } from "../features/userActions/userActionsSlice";


export default function CheckClick(ref, userActions) {
  const dispatch = useDispatch();
  const id = userActions.length > 0 ? userActions[userActions.length - 1].id : 1;//получает последний id или делает его первым

  useEffect(() => {
    function handleClickOutside(event) {
      const action = {
        id: id,
        eventName: "",
        eventValue: ""
      }
      switch (event.target.nodeName.toLowerCase()) {
        case "select":
          if (event.target?.attributes[0]?.name === "multiple") {
            action.eventName = "нажатие на multiselect";
            dispatch(addUserAction(action))
          } else {
            action.eventName = "нажатие на select";
            dispatch(addUserAction(action))
          }
          break;
        case "input":
          action.eventName = "нажатие на input";
          dispatch(addUserAction(action))
          break;
        case "span":
          if (event.target.className === "next") {
            action.eventName = "нажатие у пагинатора на кнопку 'след.'";
            dispatch(addUserAction(action))
          } else if (event.target.className === "previous") {
            action.eventName = "нажатие у пагинатора на кнопку 'пред.'";
            dispatch(addUserAction(action))
          }
          break;
        default:
          break;
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
