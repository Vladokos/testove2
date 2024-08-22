import React from "react";
import { Provider } from 'react-redux';
import { Multiselect } from "./Multiselect";
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import '@testing-library/jest-dom';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe("проверка multiselect", () => {
    let store;
    let mockDispatch;

    beforeEach(() => {
        
        mockDispatch = jest.fn();
        store = mockStore({
            userActions: [] 
        });

        finder = jest.fn();
        setPage = jest.fn();
    });

    const mockItems = [
        [{ "id": 1, "parent_id": 1, "name": "Гренни Смит", "flags": "green" },
        { "id": 2, "parent_id": 1, "name": "Фуджи", "flags": "sweet" },],
    ]

    test("проверка рендера", () => {

        render(
            <Provider store={store}>
                <Multiselect
                    items={mockItems}
                    page={1}
                    maxPage={1}
                    finder={finder}
                    setPage={setPage}
                    inputRef={React.createRef()}
                    isVisible={true}
                    setIsVisible={jest.fn()}
                    userActions={[]}
                />
            </Provider>
        )

        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByRole("listbox")).toBeInTheDocument();
    })

    test("проверка корректной реакции multiselect на ввод input", () => {
        finder.mockImplementation(value => {
            if (value === "Фуджи") {
                cleanup();
                render(
                    <Provider store={store}>
                        <Multiselect
                            items={[[{ "id": 2, "parent_id": 1, "name": "Фуджи", "flags": "sweet" }]]}
                            page={1}
                            maxPage={1}
                            finder={finder}
                            setPage={setPage}
                            inputRef={React.createRef()}
                            isVisible={true}
                            setIsVisible={jest.fn()}
                            userActions={[]}
                        />
                    </Provider>)
            }
        })

        render(
            <Provider store={store}>
                <Multiselect
                    items={mockItems}
                    page={1}
                    maxPage={1}
                    finder={finder}
                    setPage={setPage}
                    inputRef={React.createRef()}
                    isVisible={true}
                    setIsVisible={jest.fn()}
                    userActions={[]}
                />
            </Provider>
        )
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "Фуджи" } })
        expect(finder).toHaveBeenCalledWith("Фуджи");
        const firstOption = screen.getByRole('listbox').querySelector("option")
        expect(firstOption.value).toBe("Фуджи");

    })

    test("проверка перелистывания", () => {
        const newMockItems = [
            [
                {
                    id: 1,
                    parent_id: 1,
                    name: 'Гренни Смит',
                    flags: 'green'
                },
                {
                    id: 2,
                    parent_id: 1,
                    name: 'Фуджи',
                    flags: 'sweet'
                },
                {
                    id: 3,
                    parent_id: 2,
                    name: 'Кавендиш',
                    flags: 'sweet'
                },
                {
                    id: 4,
                    parent_id: 2,
                    name: 'Красный банан',
                    flags: 'red'
                },
            ],
            [
                {
                    id: 5,
                    parent_id: 3,
                    name: 'Навел',
                    flags: 'juicy'
                },
                {
                    id: 6,
                    parent_id: 3,
                    name: 'Севилья',
                    flags: 'bitter'
                },
                {
                    id: 7,
                    parent_id: 4,
                    name: 'Конференция',
                    flags: 'soft'
                },
                {
                    id: 8,
                    parent_id: 4,
                    name: 'Боск',
                    flags: 'crisp'
                },
            ]
        ]

        render(
            <Provider store={store}>
                <Multiselect
                    items={newMockItems}
                    page={1}
                    maxPage={3}
                    setPage={setPage}
                    finder={jest.fn()}
                    inputRef={React.createRef()}
                    isVisible={true}
                    setIsVisible={jest.fn()}
                    userActions={[]}
                />
            </Provider>
        );
        fireEvent.click(screen.getByText('след.'));
        // Проверяем, что функция setPage была вызвана с функцией обратного вызова
        expect(setPage).toHaveBeenCalledWith(expect.any(Function));

        const callback = setPage.mock.calls[0][0];
        expect(callback(1)).toBe(2);
        cleanup()
        render(
            <Provider store={store}>
                <Multiselect
                    items={newMockItems}
                    page={2}
                    maxPage={3}
                    setPage={setPage}
                    finder={jest.fn()}
                    inputRef={React.createRef()}
                    isVisible={true}
                    setIsVisible={jest.fn()}
                    userActions={[]}
                />
            </Provider>
        )
        expect(screen.getByText('2/3')).toBeInTheDocument();
    })
})  