const formatPrice = (amount: number) => {
  // return currency in IDR
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount / 100);
};

export default formatPrice;
