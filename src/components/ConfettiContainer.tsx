import Confetti from "react-confetti";

type Props = {
  isGameWon: boolean;
};

export default function ConfettiContainer(props: Props) {
  return (
    <>
      {props.isGameWon && (
        <Confetti
          recycle={false}
          numberOfPieces={1000}
          colors={["#D7263D", "#FFE9A8", "#F4C95D", "#3E7C3A", "#FFF5E1"]}
        />
      )}
    </>
  );
}
