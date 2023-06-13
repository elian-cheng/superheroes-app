import React, { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import defaultImg from '../../../../assets/images/poster.jpg';
import Radio from '../Radio/Radio';
import Select from '../Select/Select';
import Switcher from '../Switcher/Switcher';
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';

export interface IFormProps {
  setFormState: (state: IFormData) => void;
}
export interface IFormData {
  name: string;
  date: string;
  delivery: string;
  call: string;
  notifications: string;
  image: string | null;
  consent: string;
}

const Form: FC<IFormProps> = ({ setFormState }) => {
  const [modalIsShown, setModalIsShown] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    register,
  } = useForm<IFormData>({
    defaultValues: {
      name: '',
      date: '',
      delivery: 'default',
      call: '',
      notifications: '',
      image: '',
      consent: '',
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  function handleModal() {
    setModalIsShown(false);
  }

  const onSubmit = async (data: IFormData) => {
    const { name, date, delivery, call } = data;
    const notifications = data.notifications ? 'Yes' : 'No';
    const consent = data.consent ? 'Yes' : 'No';
    const image = data?.image
      ? URL.createObjectURL(data.image[0].slice() as unknown as Blob)
      : defaultImg;
    setFormState({ name, date, delivery, notifications, image, consent, call });
    setModalIsShown(true);
  };

  return (
    <>
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form"
      >
        <Input
          label="Name:"
          name="name"
          input={{
            id: 'name',
            type: 'text',
          }}
          validationRules={{
            required: 'This field is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Name must contain only English letters',
            },
            minLength: {
              value: 5,
              message: 'Name must be from 5 to 20 symbols',
            },
            maxLength: {
              value: 20,
              message: 'Name must be from 5 to 20 symbols',
            },
          }}
          register={register}
          error={errors.name}
        />
        <Input
          label="Delivery date:"
          name="date"
          input={{
            id: 'date',
            type: 'date',
          }}
          validationRules={{
            required: 'This field is required',
            validate: (value: string) => Date.parse(value) > Date.now(),
          }}
          register={register}
          error={errors.date}
        />
        {errors.date && errors.date.type === 'validate' && (
          <p className="error-message">Please, select a date in the future</p>
        )}
        <Select
          validationRules={{
            validate: (value: string) => value !== 'default',
          }}
          register={register}
          error={errors.delivery}
        />
        <p className="form-info">Send the payment proof (photo):</p>
        <Input
          label=""
          name="image"
          input={{
            id: 'image',
            type: 'file',
            accept: 'image/png, image/jpeg, image/gif',
          }}
          validationRules={{
            required: 'This field is required',
          }}
          register={register}
          error={errors.image}
        />
        <Radio
          register={register}
          error={errors.call}
          validationRules={{
            required: 'Please, select an option',
          }}
        />
        <Switcher control={control} name="notifications" />
        <Input
          label="Agree to terms & conditions"
          name="consent"
          input={{
            id: 'consent',
            type: 'checkbox',
          }}
          validationRules={{
            required: 'Please, give your consent to proceed',
          }}
          register={register}
          error={errors.consent}
        />
        <Button type="submit" className="form__button">
          Submit
        </Button>
      </form>
      {modalIsShown && <OrderConfirmation handleModal={handleModal} />}
    </>
  );
};

export default Form;
