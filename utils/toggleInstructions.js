export default function toggleInstructions(setGameStates) {
  setGameStates((prevValues) => {
    return {
      ...prevValues,
      instructions: !prevValues.instructions,
    };
  });
}
