export const ImageCard = ({
  image,
  index,
  setActiveImage,
}: {
  image: string;
  index: number;
  setActiveImage: (image: string) => void;
}) => {
  return (
    <>
      <div
        className="hero-image__wrapper"
        onClick={() => setActiveImage(image)}
        key={index}
      >
        <img src={image} className="hero-image__image" />
      </div>
    </>
  );
};

export default ImageCard;
