import React from "react";
import { useDispatch } from "react-redux";
import { addUserAction } from "../../features/userActions/userActionsSlice";


export const Multiselect = React.memo(({ items, page, maxPage, setPage, finder, inputRef, isVisible, setIsVisible, userActions }) => {
    const dispatch = useDispatch();


    const getSelected = (e) => {
        const options = Array.from(e.target.options).filter(opt => opt.selected);//получает все выбранные options 
        const value = options.map((option) => { if (option.dataset.flag.length === 0) { return option.value } else { return null } }).filter(option => option !== null)//перебирает все options и проверяет на наличие flag
        const id = userActions.length > 0 ? userActions[userActions.length - 1].id : 1;//получает последний id или делает его первым

        const action = {
            id: id,
            eventName: "",
            eventValue: ""
        }
        //в зависимости от кол-ва элементов делает запись
        if (value.length > 1) {
            action.eventName = "выбраны элементы из multiselect"
            action.eventValue = value;
            dispatch(addUserAction(action))
        } else {
            action.eventName = "выбран элемент из multiselect"
            action.eventValue = value;
            dispatch(addUserAction(action))
        }

    }

    return (
        <div>
            <input type="text" onChange={(e) => finder(e.target.value)} onClick={() => setIsVisible(true)}></input>
            {isVisible && (
                <div ref={inputRef}>
                    <select multiple onChange={(e) => getSelected(e)}>
                        {/* Перебирает элементы на текущей странице */}
                        {items[page - 1].map((item) => (
                            <option key={item.id} value={item.name} data-flag={item.flags}>{item.name}</option>
                        ))}
                    </select>
                    {items[0].length > 2 &&
                        <div>
                            <span className="previous" onClick={() => { page === 1 ? setPage(maxPage) : setPage(page => page - 1) }}> пред. </span>
                            <span className="numberPages"> {page}/{maxPage} </span>
                            <span className="next" onClick={() => { page === maxPage ? setPage(1) : setPage(page => page + 1) }}> след. </span>
                        </div>
                    }
                </div>)
            }
        </div>
    );
});