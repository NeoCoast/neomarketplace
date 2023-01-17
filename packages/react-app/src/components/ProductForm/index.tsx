import React, { useMemo, useState } from 'react';

import backgroundImage from 'assets/ProductFormBackImage.png';

import './styles.scss';

type ProductFormType = {
  product?: {
    name?: string,
    description?: string,
    price?: number,
    image?: File,
  }
  isEdit?: false,
  handleSuccess: () => void,
} | {
  product: {
    name: string,
    description: string,
    price: number,
    image?: File,
  }
  isEdit: true
  handleSuccess: () => void,
}

type B64Image = {
  name?: string,
  image?: string,
}

const ProductForm = ({ product = {}, isEdit = false, handleSuccess } : ProductFormType) => {
  const {
    name = '',
    description = '',
    price = 0,
    image = {},
  } = product;

  const [productName, setProductName] = useState<string>(name);
  const [productDescription, setProductDescription] = useState<string>(description);
  const [productPrice, setProductPrice] = useState<number>(price);
  const [productImage, setProductImage] = useState<B64Image>(image);
  const [zoomImage, setZoomImage] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      // image: productImage,
    };

    // Todo: Add trpc Create or Edit call!
    console.log(`This is a${!isEdit ? ' new product' : 'n updated product'}:`, currentProduct);
    handleSuccess();
  };

  const convertBase64 = (file: File) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event?.target?.files[0];
      const b64File = await convertBase64(file);
      setProductImage({ name: file.name, image: b64File as string });
    }
  };

  const disabledForm = useMemo(
    () => !productName || !productDescription || !productPrice,
    [productName, productDescription, productPrice],
  );

  const buttonLabel = isEdit ? 'Save' : 'Publish New Item';

  return (
    <div className="product-form">
      <img className="product-form__image" src={backgroundImage} alt="Background" />
      <form onSubmit={handleSubmit}>
        <div className="product-form__input-value-container">
          <p>Item name</p>
          <input
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          />
        </div>
        <div className="product-form__input-value-container">
          <p>Item description</p>
          {/* eslint-disable-next-line react/self-closing-comp */}
          <textarea
            onChange={(e) => setProductDescription(e.target.value)}
            value={productDescription}
          >
          </textarea>
        </div>
        <div className="product-form__input-value-container">
          <p>Price</p>
          <input
            onChange={(e) => setProductPrice(parseInt(e.target.value.slice(1), 10) || 0)}
            value={`$${productPrice}`}
          />
        </div>
        <div className="product-form__input-value-container">
          <p>Image</p>
          {productImage?.image && (
          <img
            className={`product-form__preview-image ${zoomImage ? 'product-form__preview-image-zoom' : ''}`}
            src={productImage.image}
            alt={productName || 'New Image'}
            onMouseEnter={() => setZoomImage(true)}
            onMouseLeave={() => setZoomImage(false)}
          />
          )}
          <input
            className="product-form__input-image"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <button className={`${disabledForm ? 'button__disabled' : ''}`} disabled={disabledForm}>{buttonLabel}</button>
      </form>
    </div>
  );
};

export default ProductForm;
