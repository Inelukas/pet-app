import { GlobalStyle } from "@/GlobalStyles";
import { useState } from "react";
import { pets } from "@/lib/Data";
import { useRouter } from "next/router";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [petCollection, setPetCollection] = useState(pets);
  const router = useRouter();

  function handleCreatePet(petData) {
    const { characteristic1, characteristic2, ...restPetData } = petData;
    setPetCollection((prevData) => [
      {
        ...restPetData,
        id: uid(),
        characteristics: [characteristic1, characteristic2].filter(Boolean),
      },
      ...prevData,
    ]);
    router.push("/");
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        petCollection={petCollection}
        onCreatePet={handleCreatePet}
      />
    </>
  );
}
