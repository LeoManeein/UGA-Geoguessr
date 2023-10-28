export default function Footer() {
  return (
    <div className=" border-offwhite-100 border-t-2 border-l-0 border-r-0 border-b-0 mt-6 border-solid text-offwhite-50 text-center flex flex-col justify-center">
      <div className="  text-offwhite-50 text-center  flex justify-center">
        <div className="flex-row flex pt-5 pb-5 relative">
          <div className="flex flex-col">
            <small>UGA Geoguessr</small>
            <small>Evan, Calvin, Nand, Leo</small>
          </div>
        </div>
      </div>
      <small className="text-xs ">
        UGA Geoguessr is in no way related to the University of Georgia, and is
        a student made project for a web development class
      </small>
    </div>
  );
}
