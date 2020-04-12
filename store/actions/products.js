import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch('https://shopping-cart-app-fc5f7.firebaseio.com/products.json');

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();
    const loadedProducts = [];

    for (const key in responseData) {
      loadedProducts.push(
        new Product(
          key,
          'u1',
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].description,
          responseData[key].price,
        ),
      );
    }

    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(`https://shopping-cart-app-fc5f7.firebaseio.com/products/${productId}.json`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  dispatch({
    type: DELETE_PRODUCT, pid: productId,
  });
};

export const createProduct = (title, description, imageUrl, price) => async (dispatch) => {
  const response = await fetch('https://shopping-cart-app-fc5f7.firebaseio.com/products.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      imageUrl,
      price,
    }),
  });

  const responseData = await response.json();

  dispatch({
    type: CREATE_PRODUCT,
    productData: {
      id: responseData.name,
      title,
      description,
      imageUrl,
      price,
    },
  });
};

export const updateProduct = (id, title, description, imageUrl) => async (dispatch) => {
  const response = await fetch(`https://shopping-cart-app-fc5f7.firebaseio.com/products/${id}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      imageUrl,
    }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  dispatch({
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  });
};
