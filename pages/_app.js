import { GlobalStyle } from "@/GlobalStyles";
import { useState } from "react";
import { pets } from "@/lib/Data";
import { useRouter } from "next/router";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [petCollection, setPetCollection] = useState(pets);
  const router = useRouter();

  function handleCreatePet(petData) {
    setPetCollection((prevData) => [
      {
        id: uid(),
        name: petData.name,
        type: petData.type,
        picture: petData.picture,
        characteristics: [
          petData.characteristic1,
          petData.characteristic2,
        ].filter(Boolean),
        status: {
          hunger: 80,
          happiness: 80,
          energy: 80,
          intelligence: 80,
        },
      },
      ...prevData,
    ]);
    console.log(petData);
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
