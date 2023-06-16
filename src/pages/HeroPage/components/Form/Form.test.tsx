import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from 'store';

describe('Form', () => {
  let form: HTMLElement;
  let nickname: HTMLInputElement;
  let realName: HTMLInputElement;
  let origin: HTMLInputElement;
  let superpowers: HTMLInputElement;
  let catchPhrase: HTMLInputElement;

  test('should render the component correctly', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Form hero={null} changedImages={[]} />
        </Provider>
      );
    });

    await waitFor(() => {
      form = document.querySelector('.form') as HTMLElement;
      expect(form).toBeInTheDocument();
      expect(document.querySelectorAll('input').length).toBe(5);
      expect(screen.getByLabelText('Nickname:')).toBeInTheDocument();
      expect(screen.getByLabelText('Superpowers:')).toBeInTheDocument();
      expect(screen.getByLabelText('Origin description:')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Create' })
      ).toBeInTheDocument();
    });
  });

  test('should submit the form successfully', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Form hero={null} changedImages={[]} />
        </Provider>
      );
    });

    fireEvent.change(screen.getByLabelText(/Nickname:/i), {
      target: { value: 'Superhero' },
    });
    fireEvent.change(screen.getByLabelText(/Real name:/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Origin description:/i), {
      target: {
        value: 'A hero from another world that came to us to rescue everyone',
      },
    });
    fireEvent.change(screen.getByLabelText(/Superpowers:/i), {
      target: { value: 'Flight, super strength' },
    });
    fireEvent.change(screen.getByLabelText(/Catch Phrase:/i), {
      target: { value: 'I am a superhero' },
    });

    await waitFor(() => {
      nickname = document.getElementById('nickname') as HTMLInputElement;
      realName = document.getElementById('real_name') as HTMLInputElement;
      superpowers = document.getElementById('superpowers') as HTMLInputElement;
      origin = document.getElementById(
        'origin_description'
      ) as HTMLInputElement;
      catchPhrase = document.getElementById('catch_phrase') as HTMLInputElement;
      expect(nickname.value).toBe('Superhero');
      expect(realName.value).toBe('John Doe');
      expect(superpowers.value).toBe('Flight, super strength');
      expect(origin.value).toBe(
        'A hero from another world that came to us to rescue everyone'
      );
      expect(catchPhrase.value).toBe('I am a superhero');
    });
  });

  test('should display error messages for invalid form fields', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Form hero={null} changedImages={[]} />
        </Provider>
      );
    });

    const button = screen.getByRole('button', { name: /Create/i });
    fireEvent.click(button);

    const nicknameError = await screen.findByText(
      /Nickname is a required field/i
    );
    expect(nicknameError).toBeInTheDocument();

    const realNameError = await screen.findByText(
      /Real name is a required field/i
    );
    expect(realNameError).toBeInTheDocument();

    const originDescriptionError = await screen.findByText(
      /No origin story provided/i
    );
    expect(originDescriptionError).toBeInTheDocument();

    const superpowersError = await screen.findByText(
      /No superpowers list provided/i
    );
    expect(superpowersError).toBeInTheDocument();

    const catchPhraseError = await screen.findByText(
      /No catch phrase provided/i
    );
    expect(catchPhraseError).toBeInTheDocument();
  });
});
