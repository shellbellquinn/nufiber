import React from 'react';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Role from '../Role'
import {Provider} from "react-redux";
import {reducer} from "../../store";
import {createStore} from "redux";

describe('The role component', () => {

  it('should display it\'s content when the user matches the provided role', () => {
    const initialState = {
      userInfo: {
        role: 'user'
      }
    };

    renderRedux(
      <Role authorization={'user'}>
        <p data-testid={'some-test-id'}>You can see me!</p>
      </Role>,
      initialState
    )

    let htmlElement = screen.queryByTestId('some-test-id');
    expect(htmlElement).toBeInTheDocument();
  })

  it('should NOT display it\'s content when the user does not match the provided role', () => {
    const initialState = {
      userInfo: {
        role: 'some-other-role'
      }
    };

    renderRedux(
      <Role authorization={'user'}>
        <p data-testid={'some-test-id'}>You can see me!</p>
      </Role>,
      initialState
    )

    let htmlElement = screen.queryByTestId('some-test-id');
    expect(htmlElement).not.toBeInTheDocument();
  })
})

function renderRedux(ui, initialState = {}) {
  function Wrapper({children}) {
    return <Provider store={createStore(reducer, initialState)}>{children}</Provider>
  }

  return render(ui, {wrapper: Wrapper})
}
