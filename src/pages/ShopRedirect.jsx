import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ShopRedirect() {
  const { shopId } = useParams();

  useEffect(() => {
    window.location.replace(`https://user.locsho.in/shop/${shopId}`);
  }, [shopId]);

  return null;
}
