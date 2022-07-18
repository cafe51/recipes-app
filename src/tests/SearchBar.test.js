import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
import meals from './mocks/mealsMock'
import soup from './mocks/soupName'
import f from './mocks/firstLetterMealsF'

describe('Testando Componente SearchBar', () => {
  // beforeEach(() => {
  //   jest.spyOn(global, "fetch").mockImplementation(() =>
  //   Promise.resolve({
  //     json: () => Promise.resolve(meals)
  //   }))
  // })

  // afterEach(() => {
  //   jest.clearAllMocks()
  // })

  test('Verificando se todos elementos estão na tela', () => {
    renderWithRouter(<App />, ['/foods']);
    const inputSearch = screen.getByTestId('search-top-btn')
    expect(inputSearch).toBeInTheDocument()
    userEvent.click(inputSearch)
   const inputText = screen.getByTestId('search-input')
   const allRadio = screen.getAllByRole('radio')
   const btnSearch = screen.getByTestId('exec-search-btn')
   expect(inputText).toBeInTheDocument()
   expect(allRadio).toHaveLength(3)
   expect(btnSearch).toBeInTheDocument()
   userEvent.type(inputText, 'chicken')
   expect(inputText).toHaveProperty('value', 'chicken')
   expect(allRadio[0]).toHaveProperty('value', 'ingredients')
   userEvent.click(allRadio[0])
   expect(allRadio[0]).toHaveProperty('checked', true)
   
  });
  test('Verificando as açoes dos inputs "name"', async () => {
    renderWithRouter(<App />, ['/foods']);
    const inputSearch = screen.getByTestId('search-top-btn')
    expect(inputSearch).toBeInTheDocument()
    userEvent.click(inputSearch)
    const radioName = screen.getByTestId('name-search-radio')
   const inputText = screen.getByTestId('search-input')
   const btnSearch = screen.getByTestId('exec-search-btn')
   expect(inputText).toBeInTheDocument()  
   expect(btnSearch).toBeInTheDocument()
   userEvent.click(radioName)
   userEvent.type(inputText, 'soup')
  userEvent.click(btnSearch)
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(soup)
    }))

    const firsImg = await screen.findByRole('img', {  name: /leblebi soup/i})
    const secondImg = await screen.findByRole('img', {  name: /red peas soup/i})
    
    const alImg = await screen.findAllByRole('img')
   expect(alImg).toHaveLength(16)
   
  });

  test('Verificando as açoes dos inputs "FirstLetter"', async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(meals)
    }))
    renderWithRouter(<App />, ['/foods']);
    
    const inputSearch = screen.getByTestId('search-top-btn')
    expect(inputSearch).toBeInTheDocument()
    userEvent.click(inputSearch)
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio')
   const inputText = screen.getByTestId('search-input')
   const btnSearch = screen.getByTestId('exec-search-btn')
   expect(inputText).toBeInTheDocument()  
   expect(btnSearch).toBeInTheDocument()
   userEvent.click(radioFirstLetter)
   userEvent.type(inputText, 'f')
  userEvent.click(btnSearch)
  // jest.spyOn(global, "fetch").mockImplementation(() =>
  // Promise.resolve({
  //   json: () => Promise.resolve(f)
  // }))
    const firsImg = await screen.findByRole('img', {  name: /fish pie/i}, {timeout: 4000})
    const secondImg = await screen.findByRole('img', {  name: /fettucine alfredo/i}, {timeout: 4000})
    
    const alImg = await screen.findAllByRole('img')
   expect(alImg).toHaveLength(16)

   
  });




})