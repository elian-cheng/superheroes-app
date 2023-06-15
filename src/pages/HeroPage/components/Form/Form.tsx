import React, { FC, useCallback, useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
// import defaultImg from '../../../../assets/images/poster.jpg';
import { createHero, IHero, updateHero } from 'store/heroSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from 'hooks/redux';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { BASE_URL } from 'API/URL';
import ImageUpload from '../ImageUpload/ImageUpload';
import { useNavigate } from 'react-router-dom';

export type IFormData = Omit<IHero, '_id'>;

// export interface IFormData {
//   nickname: string;
//   real_name: string;
//   origin_description: string;
//   superpowers: string;
//   catch_phrase: string;
//   images: string[];
// }

interface IFormProps {
  hero: IHero | null;
  changedImages?: string[];
}

const Form: FC<IFormProps> = ({ hero, changedImages }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    mode: 'onBlur',
    resolver: yupResolver(schema) as Resolver<IFormData>,
    shouldUseNativeValidation: false,
  });

  const customValueHandler = useCallback(
    (id: keyof IFormData, value: string[]) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  useEffect(() => {
    if (hero) {
      reset(hero); // Reset the form and populate values using the hero object
      if (changedImages) {
        customValueHandler('images', changedImages);
      }
    } else {
      reset(); // Reset the form if hero is null
    }
  }, [hero, reset, changedImages, customValueHandler]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: IFormData) => {
    if (hero) {
      try {
        const images = changedImages?.length ? changedImages : [];
        const requestData = {
          nickname: data.nickname,
          real_name: data.real_name,
          origin_description: data.origin_description,
          superpowers: data.superpowers,
          catch_phrase: data.catch_phrase,
          images: [...images, ...data.images].slice(0, 4),
        };
        await dispatch(updateHero({ id: hero._id!, heroData: requestData }));
        location.reload();
        reset();
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const requestData = {
          nickname: data.nickname,
          real_name: data.real_name,
          origin_description: data.origin_description,
          superpowers: data.superpowers,
          catch_phrase: data.catch_phrase,
          images: data.images.slice(0, 4),
        };
        await dispatch(createHero(requestData));
        reset();
      } catch (err) {
        console.error(err);
      }
    }
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
        <p className="label-text">Choose hero images (1-4):</p>
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
          {hero ? 'Update' : 'Create'}
        </Button>
      </form>
    </>
  );
};

export default Form;
