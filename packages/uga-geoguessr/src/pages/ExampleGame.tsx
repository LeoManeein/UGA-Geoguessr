import StreetView from "../components/StreetView/StreetView";

function ExampleGame() {
  const image =
    "https://cdn.discordapp.com/attachments/1054239396024549486/1164765489390682112/timothy-oldfield-luufnHoChRU-unsplash.jpg?ex=65446764&is=6531f264&hm=8c226b2d915319c6bf408d77d6813dfde8b5d0c0feadec863bf68e01ec314a1f&";
  return (
    <>
      <p className="text-green-500">Random 360 image i got off google.</p>
      <img src={image} width={300}></img>
      <StreetView image={image}></StreetView>
    </>
  );
}

export default ExampleGame;
