import React, { FC, useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
// import defaultImg from '../../../../assets/images/poster.jpg';
// import { createHero, IHero } from 'store/heroSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { useAppDispatch } from 'hooks/redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from 'API/URL';
import ImageUpload from '../ImageUpload/ImageUpload';

// export interface IFormData extends Omit<IHero, '_id' | 'images'> {
//   images: string;
// }

export interface IFormData {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: string[];
}

const Form: FC = () => {
  // const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    nickname: yup
      .string()
      .min(4, 'Nickname is too short - should be 4 chars minimum.')
      .required('Name is a required field'),
    real_name: yup
      .string()
      .min(6, 'Real name is too short - should be 6 chars minimum.')
      .required('Name is a required field'),
    origin_description: yup
      .string()
      .min(20, 'Origin description is too short - should be 20 chars minimum.')
      .required('No origin story provided.'),
    superpowers: yup
      .string()
      .min(10, 'Superpowers list is too short - should be 10 chars minimum.')
      .required('No origin story provided.'),
    catch_phrase: yup
      .string()
      .min(5, 'Catch phrase is too short - should be 5 chars minimum.')
      .required('No origin story provided.'),
    images: yup
      .array()
      .min(1, 'Please provide at least one hero image.')
      .of(
        yup
          .string()
          .url('Please provide a valid URL for the hero image.')
          .required('Please provide a hero image URL.')
      ),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    register,
  } = useForm<IFormData>({
    defaultValues: {
      nickname: '',
      real_name: '',
      origin_description: '',
      superpowers: '',
      catch_phrase: '',
      images: [] as string[],
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema) as Resolver<IFormData>,
    shouldUseNativeValidation: false,
  });

  // const images = watch('images');

  const customValueHandler = (id: keyof IFormData, value: string[]) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: IFormData) => {
    try {
      const requestData = {
        nickname: data.nickname,
        real_name: data.real_name,
        origin_description: data.origin_description,
        superpowers: data.superpowers,
        catch_phrase: data.catch_phrase,
        images: data.images.slice(0, 3),
      };

      await axios.post(`${BASE_URL}heroes/`, requestData);

      toast.success('A new Hero has just been enlisted!');
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create a new Hero');
    }

    // try {
    //   await dispatch(createHero(data));
    //   // toast.success('A new Hero has just been enlisted!');
    //   // reset();
    //   // Reset the form after successful submission
    // } catch (err) {
    //   console.error(err);
    //   // toast.error('Failed to create a new Hero');
    // }

    // try {
    //   dispatch(createHero(data));
    // } catch (err) {
    //   console.error(err);
    // }
    // navigate('/orders', { replace: true });
  };

  return (
    <>
      <form
        noValidate
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form"
      >
        <Input
          label="Nickname:"
          name="nickname"
          input={{
            id: 'nickname',
            type: 'text',
          }}
          register={register}
          error={errors.nickname}
        />
        <Input
          label="Real name:"
          name="real_name"
          input={{
            id: 'real_name',
            type: 'text',
          }}
          register={register}
          error={errors.real_name}
        />
        <Input
          label="Origin description:"
          name="origin_description"
          input={{
            id: 'origin_description',
            type: 'text',
          }}
          register={register}
          error={errors.origin_description}
        />
        <Input
          label="Superpowers:"
          name="superpowers"
          input={{
            id: 'superpowers',
            type: 'text',
          }}
          register={register}
          error={errors.superpowers}
        />
        <Input
          label="Catch Phrase:"
          name="catch_phrase"
          input={{
            id: 'catch_phrase',
            type: 'text',
          }}
          register={register}
          error={errors.catch_phrase}
        />
        <p className="label-text">Choose hero images:</p>
        <ImageUpload
          onChange={(value) => customValueHandler('images', value)}
        />
        {errors.images && (
          <p className="error-message">{errors.images.message}</p>
        )}
        <Button
          type="submit"
          className="form__button"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;
