export const ImageCard = ({
  image,
  onDelete,
}: {
  image: string;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <>
      <div className="hero-image__wrapper" key={image}>
        <button
          className="hero-image__close-btn"
          data-testid="hero-image-close-btn"
          onClick={onDelete}
        >
          &times;
        </button>
        <img src={image} className="hero-image__image" />
      </div>
    </>
  );
};

export default ImageCard;
