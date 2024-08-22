import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./features/category/categoriesSlice";
import { getItems } from "./features/items/itemsSlice";
import { Multiselect } from "./components/Multiselect/Multiselect";
import { addUserAction, getUserActions } from "./features/userActions/userActionsSlice";

import OutsideClick from "./hooks/OutsideClick";
import CheckClick from "./hooks/CheckClick";

function App() {
  const [itemsClone, setItemsClone] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [pagesArray, setPagesArray] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filtered, setFiltered] = useState();

  const inputRef = useRef(null);
  const userMovments = useRef(null)

  const { categories } = useSelector((state) => state.categories);
  const { items } = useSelector((state) => state.items);
  const { userActions } = useSelector((state) => state.userActions)

  const itemsStatus = useSelector((state) => state.items.status)


  const dispatch = useDispatch();

  //перерендирится только если изменяться зависимости
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getItems())
    dispatch(getUserActions())
  }, [dispatch])

  // ждет когда items получет данные
  //перерендирится только если изменяться зависимости
  useEffect(() => {
    if (itemsStatus === "success") {
      //делит длинну массива на 4 элемента и округляет в большую сторону для нахождения кол-во страниц 
      const maxPage = Math.ceil(items.length / 4);
      setMaxPage(maxPage)

      //создает Array of array of objects[ 0:[0:{},1:{}] ] 
      //для того чтобы все елементы были подразделены на страницы
      const pages = []
      for (let i = 0; i < items.length; i += 4) {
        pages.push(items.slice(i, i + 4))
      }
      setPagesArray(...pagesArray, pages)

      setItemsClone(...pagesArray, pages)
    }
  }, [items, itemsStatus])

  //получает на вход значение проверяет чтобы не было пустым 
  //затем все значение изменяет в нижний регистр и сравнивает есть ли буква/слово в items
  //перерендирится только если изменяться зависимости
  const finder = useCallback((value) => {
    if (value.trim().length > 0) {
      const filter = filtered[page - 1].filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      const newItemsCloneArray = [...itemsClone];
      newItemsCloneArray[page - 1] = filter;
      setItemsClone(newItemsCloneArray);
    } else if (isFiltered) {
      setItemsClone(filtered)
    } else {
      setItemsClone(pagesArray);
    }

  }, [pagesArray, page, itemsClone]);


  //находит id из option
  //если id = -1 то возращает изначальное состояние
  //иначе фильтрует массив и находит items с parent_id равным как у категории
  //отправляет действия пользователя
  //перерендирится только если изменяться зависимости
  const optionSelected = useCallback((e) => {
    const option = e.target.options[e.target.selectedIndex]
    const parentId = parseInt(option.id);

    if (parentId === -1) {
      setMaxPage(Math.ceil(items.length / 4));
      setItemsClone(pagesArray);
      setIsFiltered(false);
    } else {
      if (option.dataset.flag.length === 0) {

        const id = userActions.length > 0 ? userActions[userActions.length - 1].id : 1;
        const action = {
          id: id,
          eventName: "выбор элемента select",
          eventValue: `${option.value}`
        }
        dispatch(addUserAction(action))
      }

      const filtered = [[]];
      for (let i = 0; i < pagesArray.length; i++) {
        pagesArray[i].filter(item => {
          if (item.parent_id === parentId) {
            filtered[0].push(item);
          }
        });
      }
      setPage(1);
      setIsFiltered(true)
      setMaxPage(Math.ceil(filtered[0].length / 4));
      setItemsClone(filtered);
      setFiltered(filtered);
    }
  }, [items, pagesArray]);

  OutsideClick(inputRef, () => setIsVisible(false))
  CheckClick(userMovments, userActions)
  return (
    <div className="App">
      {categories.length > 0 &&
        (
          <select defaultValue={"default"} onChange={(e) => optionSelected(e)}>
            <option id="-1" value={"default"}>выбирете фрукт</option>
            {categories.map((category) => {
              return <option key={category.id} id={category.id} value={category.name} data-flag={category.flags}>{category.name}</option>
            })}
          </select>
        )
      }
      {
        itemsClone !== null &&
        <Multiselect
          items={itemsClone}
          page={page}
          maxPage={maxPage}
          finder={finder}
          setPage={setPage}
          inputRef={inputRef}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          userActions={userActions}
        />
      }
      <span ref={userMovments}></span>
    </div>
  );
}

export default App;
