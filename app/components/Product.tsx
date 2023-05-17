import Image from "next/image";

export default function Product({ name, image, price }) {
  return (
    <div>
      <Image src={image} alt={name} width={384} height={384} />
      <h1>Name</h1>
      {price}
    </div>
  );
}
