const gameTypes = [
  {
    id: "231232",
    title: "Entire Campus",
    description: "Guess your way around the entire campus",
    url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
    possibleCoordinates: [
      { lat: 33.95653704878533, lng: -83.37458293939771, radius: 0.005 },
      { lat: 33.953489107258584, lng: -83.375195362228, radius: 0.005 },
      { lat: 33.95163700612744, lng: -83.37157186085528, radius: 0.005 },
      { lat: 33.950250549738186, lng: -83.37672641915961, radius: 0.005 },
      { lat: 33.9496790267888, lng: -83.37880610491217, radius: 0.005 },
      { lat: 33.94672609710188, lng: -83.3768795250081, radius: 0.005 },
      { lat: 33.94846188181118, lng: -83.37315395310254, radius: 0.005 },
      { lat: 33.94391066371809, lng: -83.37261808323643, radius: 0.005 },
      //
      { lat: 33.943582543233106, lng: -83.37903576350308, radius: 0.005 },
      { lat: 33.941846659030695, lng: -83.3754250208728, radius: 0.005 },
      { lat: 33.93925335141101, lng: -83.36924975780163, radius: 0.005 },
      { lat: 33.950250549738186, lng: -83.37672641915961, radius: 0.005 },
      { lat: 33.93619420538512, lng: -83.36951769270671, radius: 0.005 },
      { lat: 33.932298663146135, lng: -83.37103599079649, radius: 0.005 },
      { lat: 33.930723528341595, lng: -83.36572883485819, radius: 0.005 },
      { lat: 33.94314434015747, lng: -83.37865364729576, radius: 0.005 },
    ],
  },
  {
    id: "114124",
    title: "North Campus",
    description: "Explore the north campus!",
    url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171665469791539270/historic-4775425_1920-1800x1000.jpg?ex=655d8180&is=654b0c80&hm=45f8129baf5f522a5ac0fe64f27cf8540ad6e849039c03c6b5814ac1cfd6c662&",
    possibleCoordinates: [
      { lat: 33.95287980662595, lng: -83.35745524110612, radius: 0.005 }, //
      { lat: 33.953239747677785, lng: -83.37399022354325, radius: 0.005 }, //
      { lat: 33.951779986909465, lng: -83.37433764081277, radius: 0.005 }, //
      { lat: 33.95175350217092, lng: -83.37296708928022, radius: 0.005 }, //
    ],
  },

  {
    id: "424143",
    title: "South Campus",
    description: "Explore South Campus with your friends",
    url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171667786343395348/woocommerce-15.jpg?ex=655d83a8&is=654b0ea8&hm=25031174744dd94b29abc8f2faff18c5d6b827899ad12db9cb6dc08bc91ed0ca&",
    possibleCoordinates: [
      { lat: 33.937391046353824, lng: -83.3692271305832, radius: 0.005 }, //
      { lat: 33.94089331098974, lng: -83.37070770419253, radius: 0.005 }, //
      { lat: 33.94290486630825, lng: -83.3719093337336, radius: 0.005 }, //
      { lat: 33.94356350683504, lng: -83.3756215107087, radius: 0.005 }, //
      { lat: 33.94342109850432, lng: -83.37856121155025, radius: 0.005 }, //
      { lat: 33.94482504467468, lng: -83.37438022993118, radius: 0.005 }, //
      { lat: 33.94088394389009, lng: -83.37890297244151, radius: 0.005 }, //
    ],
  },

  // {
  //   id: "4222",
  //   title: "Parks",
  //   description: "literally just parks",
  //   url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171668609366495292/undefined.webp?ex=655d846d&is=654b0f6d&hm=d709f5120bee3a94f859c05c77853dd5dfc332eac93a3103b7f848cdf2c61c41&",
  //   possibleCoordinates: [
  //     { lat: 33.93316202287451, lng: -83.37191852002927, radius: 0.002 }, //
  //     { lat: 33.949875960724626, lng: -83.36972966040591, radius: 0.002 }, //
  //     { lat: 33.946681310227746, lng: -83.36648884919526, radius: 0.002 }, //
  //     { lat: 33.93222368243133, lng: -83.3733535002214, radius: 0.002 }, //
  //     { lat: 33.92926271082406, lng: -83.37317667425556, radius: 0.002 }, //
  //     // { lat: 33.925154525661135, lng: -83.37545933701486, radius: 0.002 }, //
  //     // { lat: 33.92776724467071, lng: -83.38513606494591, radius: 0.002 }, //
  //     // { lat: 33.92663349217348, lng: -83.38830285757105, radius: 0.002 }, //
  //     // { lat: 33.9009270724051, lng: -83.38368577505128, radius: 0.002 }, //
  //     // { lat: 33.90148235126431, lng: -83.38083264338876, radius: 0.002 }, //

  //     // { lat: 33.93102319795355, lng: -83.37369435837667, radius: 0.005 }, //
  //     // { lat: 33.92912197515169, lng: -83.37191852002927, radius: 0.005 }, //
  //     // { lat: 33.92691175029099, lng: -83.38543780576636, radius: 0.005 }, //
  //     // { lat: 33.92691175029878, lng: -83.3744390647804, radius: 0.005 }, //
  //     // { lat: 33.94526646215142, lng: -83.36523750680715, radius: 0.005 }, //
  //     // { lat: 33.94891552136928, lng: -83.36879948020291, radius: 0.005 }, //
  //   ],
  // },
  // {
  //   id: "15",
  //   title: "South Campus4",
  //   description:
  //     "Explore South Campus with your friendsExplore South th your friends",
  //   url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&",
  //   possibleCoordinates: [
  //     { lat: 33.951752641469085, lng: -83.37435458710178, radius: 0.005 }, // center of UGA
  //     { lat: 33.93307374280034, lng: -83.37205409908691, radius: 0.005 }, // IM deck
  //   ],
  // },
  // {
  //   id: "64",
  //   title: "Entire Campus5",
  //   description: "Guess your way around the entire campus",
  //   url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
  //   possibleCoordinates: [
  //     { lat: 33.951752641469085, lng: -83.37435458710178, radius: 0.005 }, // center of UGA
  //     { lat: 33.93307374280034, lng: -83.37205409908691, radius: 0.005 }, // IM deck
  //   ],
  // },
  // {
  //   id: "41247",
  //   title: "South Campus6",
  //   description: "Explore South Campus with your friends",
  //   url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&",
  //   possibleCoordinates: [
  //     { lat: 33.951752641469085, lng: -83.37435458710178, radius: 0.005 }, // center of UGA
  //     { lat: 33.93307374280034, lng: -83.37205409908691, radius: 0.005 }, // IM deck
  //   ],
  // },
  // {
  //   id: "85555",
  //   title: "Entire Campus7",
  //   description: "Guess your way around the entire campus",
  //   url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
  //   possibleCoordinates: [
  //     { lat: 33.951752641469085, lng: -83.37435458710178, radius: 0.005 }, // center of UGA
  //     { lat: 33.93307374280034, lng: -83.37205409908691, radius: 0.005 }, // IM deck
  //   ],
  // },
];
module.exports = { gameTypes };
