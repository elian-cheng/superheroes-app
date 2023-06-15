import { FC, useCallback, useEffect, useState } from 'react';
// @ts-ignore
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';

export interface ICloudinaryResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: Array<string>;
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  moderation: Array<string>;
  access_control: Array<string>;
  context: object;
  metadata: object;
  event: string;
  info: {
    public_id: string;
    secure_url: string;
  };
}

const cloudName = 'dpnagwmqa';
const uploadPreset = 'nioii5mw';
const uploadFolder = 'superheroes';

interface IImageUploadProps {
  onChange: (value: string[]) => void;
}

export const ImageUpload: FC<IImageUploadProps> = ({ onChange }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [hasUploadedImages, setHasUploadedImages] = useState(false);

  // const imageUploadHandler = useCallback(
  //   (result: ICloudinaryResponse) => {
  //     const secureUrl = result.info.secure_url;
  //     const updatedImages = [...uploadedImages, secureUrl];
  //     setUploadedImages(updatedImages);
  //     onChange(uploadedImages);
  //     console.log(updatedImages);
  //   },
  //   [onChange, uploadedImages]
  // );

  const imageUploadHandler = useCallback(
    (result: ICloudinaryResponse) => {
      setHasUploadedImages(false);
      const secureUrl = result.info.secure_url;
      setUploadedImages((prevImages) => [...prevImages, secureUrl]);
    },
    [setUploadedImages]
  );

  useEffect(() => {
    if (uploadedImages.length > 0 && !hasUploadedImages) {
      onChange(uploadedImages);
      setHasUploadedImages(true);
    }
  }, [onChange, uploadedImages, hasUploadedImages]);

  return (
    <>
      <WidgetLoader />
      <Widget
        sources={['local', 'camera', 'url', 'image_search']} // set the sources available for uploading -> by default
        // all sources are available. More information on their use can be found at
        // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
        // sourceKeys={{dropboxAppKey: '', instagramClientId: ''}} // add source keys
        // and ID's as an object. More information on their use can be found at
        // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
        resourceType={'image'} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
        cloudName={cloudName} // your cloudinary account cloud name.
        // onUpload={handleImageChange}
        // Located on https://cloudinary.com/console/
        uploadPreset={uploadPreset} // check that an upload preset exists and check mode is signed or unsigned
        buttonText={'Upload'} // default 'Upload Files'
        maxFiles={3}
        style={{
          color: 'white',
          border: 'none',
          width: '120px',
          backgroundColor: 'green',
          borderRadius: '4px',
          height: '25px',
        }} // inline styling only or style id='cloudinary_upload_button'
        folder={uploadFolder} // set cloudinary folder name to send file
        cropping={false} // set ability to crop images -> default = true
        // https://support.cloudinary.com/hc/en-us/articles/203062071-How-to-crop-images-via-the-Upload-Widget-#:~:text=Click%20on%20the%20%22Edit%22%20link,OK%22%20and%20Save%20the%20changes.
        // more information here on cropping. Coordinates are returned or upload preset needs changing
        multiple={true} // set to false as default. Allows multiple file uploading
        // will only allow 1 file to be uploaded if cropping set to true
        autoClose={false} // will close the widget after success. Default true
        onSuccess={imageUploadHandler}
        // add success callback -> returns result
        // onFailure={toast.error('Image upload failed', {
        //   toastId: 'cloudinary-upload-toast-error',
        // })}
        // add failure callback -> returns 'response.error' + 'response.result'
        logging={false} // logs will be provided for success and failure messages,
        // set to false for production -> default = true
        // customPublicId={'sample'} // set a specific custom public_id.
        // To use the file name as the public_id use 'use_filename={true}' parameter
        eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'} // add eager transformations -> default = null
        use_filename={false} // tell Cloudinary to use the original name of the uploaded
        // file as its public ID -> default = true,

        widgetStyles={{
          palette: {
            window: '#737373',
            windowBorder: '#FFFFFF',
            tabIcon: '#FF9600',
            menuIcons: '#D7D7D8',
            textDark: '#DEDEDE',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#B3B3B3',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#909090',
          },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
              active: true,
            },
          },
        }}
        // ability to customize the style of the widget uploader
        // destroy={true} // will destroy the widget on completion
      />
    </>
  );
};

export default ImageUpload;
